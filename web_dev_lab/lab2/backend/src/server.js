import express from "express";
import database from "./db/db.js";
import insuranceRouter from "./routes/insurance.routes.js";
import authRouter from "./routes/auth.routes.js";
import userRouter from "./routes/user.routes.js";
import { verifyUserMiddleware } from "./middleware/auth.middleware.js";

const app = express();
const PORT = 55000;

app.use(express.json());

app.use("/api/insurances", insuranceRouter);
app.use("/api/auth", authRouter);
app.use("/api/user", verifyUserMiddleware, userRouter);
app.listen(PORT, () => console.log("servrer listening on port ", PORT));
