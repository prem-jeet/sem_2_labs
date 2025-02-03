import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import ApiResponse from "../utils/apiResponse.js";
import ApiError from "../utils/apiError.js";

export const hashPasswordMiddleware = async (req, res, next) => {
  const { password } = req.body;
  const salt = await bcrypt.genSalt();
  const hash = await bcrypt.hash(password, salt);

  req.body.password = hash;
  next();
};

export const verifyUserMiddleware = async (req, res, next) => {
  console.log(req.cookies);

  try {
    const token = req.headers["authorization"];
    if (!token) {
      throw new ApiError(401, "Unautherized access");
    }

    jwt.verify(token, process.env.SIGN, (error, decoded) => {
      if (error) {
        const err = new ApiError(401, "Invalid Token");
        res.json(err);
        throw error;
      }

      req.userId = decoded.id;
      next();
    });
  } catch (error) {
    console.log(error);
  }
};
