import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDb from "./config/db.js";
import authRoutes from "./Routes/authRoutes.js";
import categoryRoutes from "./Routes/categoryRoutes.js";
import productRoutes from "./Routes/productRoutes.js";
import cors from "cors";

// env config
dotenv.config();

// database config
connectDb();

// Rest Object
const app = express();

// middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productRoutes);

// Rest api
app.get("/", (req, res) => {
  res.send("<h1>helo world From Jerry</h1>");
});

// PORT
const PORT = process.env.PORT || 8080;

// Run Listen
app.listen(PORT, () => {
  console.log(`${process.env.DEV_MODE} iS Running ON ${PORT}`);
});
