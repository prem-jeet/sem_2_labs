import express from "express";
import database from "./db/db.js";
import dbRouter from "./routes/db.routes.js";
import authRouter from "./routes/auth.routes.js";


const app = express();
const PORT = 55000;

app.use(express.json());

app.use("/api/db", dbRouter);
app.use("/auth", authRouter);
app.get("/", (req, res) => {
  res.json({ msg: "helo world" });
});

app.listen(PORT, () => console.log("servrer listening on port ", PORT));
