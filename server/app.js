import express from "express";
import authRouter from "./routes/auth.route.js";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to chatwise - Real time chatapp 🚀");
});

app.use("/api/auth", authRouter);

export default app;
