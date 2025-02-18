import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRoutes from '../src/routes/authRoutes.js'
import mongoose from "mongoose";
import config from "./config.js";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

app.use("/api/auth", authRoutes);

mongoose.connect(config.mongoURI).then(() => console.log("MongoDb connected."))
    .catch(err => console.error("Error connecting to MongoDB:", err));

app.listen(config.port, () => console.log(`Server listenning on port : ${config.port}`));
