import express from "express";

const app = express();

app.use(express.json());

app.use("/", (req, res) => {
  res.send("Welcome to chatwise - Real time chatapp 🚀");
});

export default app;
