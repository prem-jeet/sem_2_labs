import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import ApiResponse from "../utils/apiResponse.js";
import ApiError from "../utils/apiError.js";
import database from "../db/db.js";
import { hashPasswordMiddleware } from "../middleware/auth.middleware.js";

const authRouter = express.Router();

function doesUserExists(username, password) {
  const checkUser = database.prepare(
    "SELECT * FROM users WHERE username LIKE ?"
  );
  const userExists = checkUser.get(username);
  return !!userExists;
}

authRouter.post("/register", hashPasswordMiddleware, (req, res) => {
  const { username, fullname, email, password } = req.body;

  if (doesUserExists(username, password)) {
    throw new ApiError(400, "User already exists");
  }

  try {
    const insert = database.prepare(
      "INSERT INTO users (username, fullname, email, password) VALUES (?, ?, ? ,?)"
    );
    const result = insert.run(username, fullname, email, password);

    const token = jwt.sign({ id: result.lastInsertRowid }, process.env.SIGN, {
      expiresIn: "2m",
    });

    return res.json(
      new ApiResponse(201, { token }, "User registered successfully")
    );
  } catch (error) {
    throw new ApiError(401);
  }
});

authRouter.post("/login", (req, res) => {
  const { username, password } = req.body;

  try {
    const getUser = database.prepare("SELECT * FROM users WHERE username  LIKE ?");
    const user = getUser.get(username);

    if (!user) {
      res.status(404).json({ message: "user not found" });
      return;
    }

    const isUserValid = bcrypt.compareSync(password, user.password);

    if (!isUserValid) {
      res.status(400).json({ message: "Incorrect password" });
      return;
    }

    // successful authentication
    const token = jwt.sign({ id: user.id }, process.env.SIGN, {
      expiresIn: "2m",
    });

    res.json({ token });
    return;
  } catch (error) {
    console.log("🚀 ~ router.post ~ error:", error);
    res.sendStatus(500);
    return;
  }
});

export default authRouter;
