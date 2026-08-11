import cors from "cors";
import express from "express";
import path from "path";
import apiRoutes from "./routes/appRoutes.js";

const app = express();
const allowedFrontendOrigin = process.env.FRONTEND_URL;

app.use(
  cors({
    origin: allowedFrontendOrigin || false,
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json({ limit: "10kb" }));

app.get("/", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "Product Catalogue API is running",
  });
});

app.use("/uploads", express.static(path.resolve("uploads")));
app.use("/api", apiRoutes);

export default app;