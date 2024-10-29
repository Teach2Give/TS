// Function to generate tokens (access and refresh)
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

import { User } from "../types/userTypes";

const generateTokens = (userId: number) => {
  const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
  const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;

  if (!accessTokenSecret || !refreshTokenSecret) {
    throw new Error(
      "Missing ACCESS_TOKEN_SECRET or REFRESH_TOKEN_SECRET in environment variables"
    );
  }

  const accessToken = jwt.sign({ userId }, accessTokenSecret, {
    expiresIn: "15m", // Access token valid for 15 minutes
  });

  const refreshToken = jwt.sign({ userId }, refreshTokenSecret, {
    expiresIn: "7d", // Refresh token valid for 7 days
  });

  return { accessToken, refreshToken };
};

export {generateTokens}