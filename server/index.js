import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import userRouter from "./routes/userRoutes.js";
import cors from "cors";

const app = express();
app.use(cors());
dotenv.config();

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// using the routes
app.use("/user", userRouter);

// Connect to DB
const connect = () => {
  mongoose
    .connect(
      "mongodb+srv://abhaypanchal:abhaypanchal@cluster0.utigiwb.mongodb.net/?retryWrites=true&w=majority",
      {
        dbName: "RandomQuote",
      }
    )
    .then(() => console.log("Database is connected"))
    .catch((err) => console.log(err));
};

app.listen(8000, () => {
  connect();
  console.log("server is running at http://localhost:8000");
});
