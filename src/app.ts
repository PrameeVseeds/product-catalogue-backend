import express from "express";
import apiRoutes from "./routes/appRoutes.js";

const app = express();

app.use(express.json({ limit: "10kb" }));

app.get("/", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "Product Catalogue API is running",
  });
});

app.use("/api", apiRoutes);

export default app;