import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../configs/env.config.js";

export const generateToken = (payload) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "2d" });
};

export const verifyToken = (token) => {
  return jwt.verify(token, JWT_SECRET);
};
