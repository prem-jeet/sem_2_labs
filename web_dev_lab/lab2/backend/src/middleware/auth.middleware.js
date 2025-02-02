import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import ApiResponse from "../utils/apiResponse.js";


export const hashPasswordMiddleware = async (req, res, next) => {


    const { password } = req.body;
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(password, salt);

    req.body.password = hash;
    next();
  };

  export const verifyUserMiddleware = async (req, res, next) => {
    const token = req.headers["authorization"];
    if (!token) {
      return res.json(new ApiResponse(401, (message = "No token provided")));
    }

    jwt.verify(token, process.env.SIGN, (error, decoded) => {
      if (error)
        return res.json(new ApiResponse(401, (message = "Invalid token")));

      req.userId = decoded.id;
      next();
    });
};
