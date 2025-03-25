import jwt from "jsonwebtoken";
import { AT_SECRET_KEY, RT_SECRET_KEY } from "../config.js";

const generateToken = (document, type) => {
  // If access token, take the first argument,
  // Else if refresh token, take the second argument
  const getSecretKey = type === "AT" ? AT_SECRET_KEY : RT_SECRET_KEY;
  const getExpiration = type === "AT" ? 300 : 3600 * 24 * 7;
  const token = jwt.sign(document, getSecretKey, {
    expiresIn: getExpiration,
  });
  return token;
};

const verifyToken = (token, type) => {
  const getSecretKey = type === "AT" ? AT_SECRET_KEY : RT_SECRET_KEY;
  const verifyToken = jwt.verify(token, getSecretKey);
  return verifyToken;
};

export { generateToken, verifyToken };
