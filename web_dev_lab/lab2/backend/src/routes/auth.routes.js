import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import ApiResponse from "../utils/apiResponse.js";
import ApiError from "../utils/apiError.js";
import database from "../db/db.js";
import {
  hashPasswordMiddleware,
  verifyUserMiddleware,
} from "../middleware/auth.middleware.js";

const authRouter = express.Router();
const cookieOptions = {
  httpOnly: true,
  secure: true,
};

function doesUserExists(username, email) {
  const checkUser = database.prepare(
    "SELECT * FROM users WHERE username LIKE ? OR EMAIL LIKE  ?"
  );
  const userExists = checkUser.get(username, email);
  return !!userExists;
}

authRouter.post("/register", hashPasswordMiddleware, (req, res) => {
  const { username, fullname, email, password } = req.body;

  if (doesUserExists(username, email)) {
    const error = new ApiError(400, "User already exists");
    res.json(error);
    throw error;
  }

  try {
    const insert = database.prepare(
      "INSERT INTO users (username, fullname, email, password) VALUES (?, ?, ? ,?)"
    );

    const result = insert.run(username, fullname, email, password);

    const token = jwt.sign({ id: result.lastInsertRowid }, process.env.SIGN, {
      expiresIn: "2m",
    });

    return res
      .cookie("token", token, cookieOptions)
      .json(
        new ApiResponse(
          201,
          { token, id: result.lastInsertRowid },
          "User registered successfully"
        )
      );
  } catch (err) {
    const error = new ApiError(401, err);
    res.json(error);
    throw error;
  }
});

authRouter.post("/login", (req, res) => {
  const { username, password } = req.body;

  try {
    const getUser = database.prepare(
      "SELECT * FROM users WHERE username  LIKE ?"
    );
    const user = getUser.get(username);

    if (!user) {
      res.status(404).json(new ApiError(404, "User not found"));
      throw new ApiError(404, "User not found");
    }

    const isUserValid = bcrypt.compareSync(password, user.password);

    if (!isUserValid) {
      const error = new ApiError(400, "Credentials mismatch");
      res.json(error);
      throw error;
    }

    // successful authentication
    const token = jwt.sign({ id: user.id }, process.env.SIGN, {
      expiresIn: "2m",
    });

    return res
      .cookie("token", token, cookieOptions)
      .json(
        new ApiResponse(
          200,
          { token, id: user.id },
          "User logged in successfully"
        )
      );
  } catch (err) {
    console.log({ err });

    const error = new ApiError(500, "login filed");
    res.json(error);
    throw error;
  }
});

authRouter.post("/checkUser", (req, res) => {
  const { email } = req.body;

  const query = database.prepare(`SELECT ID FROM USERS WHERE EMAIL LIKE ?`);
  const user = query.get(email);

  if (user) return res.json(new ApiResponse(200, { userId: user.id }));
  else res.json(new ApiError(404, "User not found"));
  throw new ApiError(404, "User not found");
});

authRouter.put("/changePassword", hashPasswordMiddleware, (req, res) => {
  const { email, password } = req.body;

  try {
    const query = database.prepare(
      `UPDATE USERS SET PASSWORD = ? WHERE EMAIL LIKE ?`
    );
    const queryRes = query.run(password, email);

    if (queryRes) {
      return res.json(
        new ApiResponse(200, {}, "Password updated successfully")
      );
    }
  } catch (err) {
    const error = new ApiError(500);
    res.json(error);
    throw error;
  }
});

authRouter.post("/logout", verifyUserMiddleware, (req, res) => {
  const id = req.cookies.userId;
  return res.clearCookie().json(new ApiResponse(200, "Logged out succefully"));
});
export default authRouter;
