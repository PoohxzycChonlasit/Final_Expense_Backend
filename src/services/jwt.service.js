import { env } from "../config/env.js";
import jwt from "jsonwebtoken";

export const jwtService = {};

jwtService.sign = (payload) =>
  jwt.sign(payload, env.JWT_SECRET, {
    expiresIn: env.jwt_EXPIRES_IN,
  });

jwtService.verify = (token) => jwt.verify(token, env.JWT_SECRET);
