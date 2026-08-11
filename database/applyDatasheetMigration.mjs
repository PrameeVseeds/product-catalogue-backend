import "dotenv/config";
import mysql from "mysql2/promise";

const connection = await mysql.createConnection({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

try {
  const [columns] = await connection.execute(
    `SELECT COUNT(*) AS columnCount
     FROM information_schema.columns
     WHERE table_schema = DATABASE()
       AND table_name = 'products'
       AND column_name = 'datasheet_file_url'`,
  );

  if (Number(columns[0].columnCount) === 0) {
    await connection.execute(
      `ALTER TABLE products
       ADD COLUMN datasheet_file_url VARCHAR(500) NULL
       AFTER datasheet_description`,
    );
  }

  console.log("Product datasheet migration applied successfully.");
} finally {
  await connection.end();
}
