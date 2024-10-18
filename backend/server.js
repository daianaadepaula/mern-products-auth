import express from "express";
import dotenv from "dotenv";
import cors from 'cors'
import cookieParser from "cookie-parser"
import path from "path";

import swaggerUi from 'swagger-ui-express';
import swaggerDocs from '../swaggerOptions.js';

import { connectDB } from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import authRoutes from "./routes/authRoutes.js"

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const __dirname = path.resolve();

app.use(cors({ origin: "http://localhost:5173", credentials: true }))
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(express.json());
app.use(cookieParser()) // allows us to parse incoming cookies

app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes)

if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "/frontend/dist")));

	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
	});
}

app.listen(PORT, () => {
	connectDB();
	console.log(`Server started at http://localhost:${PORT}`);
});
