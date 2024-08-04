import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cookieParser from "cookie-parser";
import cors from "cors";
import connectDB from "./db/index.js";
import authRoutes from "../src/routes/auth.routes.js";
import messageRoutes from "../src/routes/message.routes.js";
import userRoutes from "../src/routes/user.routes.js";
import collegeRoutes from "../src/routes/college.routes.js";
import { app, httpServer } from "./socket/socket.js";
import path from "path";

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://uniconn-chat-app-repo.vercel.app",
    ],
    credentials: true,
  })
);

app.use(express.json({}));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const port = process.env.PORT || 3000;

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/messages", messageRoutes);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/colleges", collegeRoutes);

// -----------------------Deployment-----------------------------------

const __dirname = path.resolve();
// if (process.env.NODE_ENV === "production") {
//   app.use(express.static(path.join(__dirname, "..", "client", "dist")));

//   app.get("*", (req, res) => {
//     res.sendFile(path.resolve(__dirname, "..", "client", "dist", "index.html"));
//   });
// } else {
//   app.get("/", (req, res) => {
//     res.send("Api is running");
//   });
// }

app.use(express.static(path.join(__dirname, "client", "dist")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client", "dist", "index.html"));
});

connectDB();

httpServer.listen(port, () => {
  console.log("server is starting...");
});
