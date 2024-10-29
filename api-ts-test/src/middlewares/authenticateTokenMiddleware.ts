import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const accessToken = process.env.ACCESS_TOKEN_SECRET;
// if you try to acess it directly

// No overload matches this call.
//   The last overload gave the following error.
//     Argument of type 'string | undefined' is not assignable to parameter of type 'Secret | PublicKeyInput | JsonWebKeyInput | GetPublicKeyOrSecret'.
//       Type 'undefined' is not assignable to type 'Secret | PublicKeyInput | JsonWebKeyInput | GetPublicKeyOrSecret'.ts(2769)
// index.d.ts(257, 17): The last overload is declared here.
// jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {

// The error you're encountering occurs because TypeScript is unable to guarantee that process.env.ACCESS_TOKEN_SECRET is a defined string. It could potentially be undefined, which does not satisfy the type requirements for the jwt.verify function.Z

// Solution
// To resolve this issue, you need to ensure that process.env.ACCESS_TOKEN_SECRET is defined before passing it to the jwt.verify method. Here's how you can do that:

// Check if the Environment Variable is Defined: You can either throw an error if it's not set or provide a fallback.

// Type Assertion: You can use TypeScript's type assertion to assert that the environment variable is a string.

// Middleware to verify access tokens (for protected routes)
// Middleware to verify access tokens (for protected routes)

// Define the custom request interface
interface CustomRequest extends Request {
    user?: any; // You can replace 'any' with a more specific type for your user object
  }
  const authenticateToken = (req: CustomRequest, res: Response, next: NextFunction) => {
    const token = req.headers["authorization"]?.split(" ")[1];
    const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
  
    // Unauthorized
    if (!token) {
       res.sendStatus(401);
    } else if (!accessTokenSecret) {
      console.error("ACCESS_TOKEN_SECRET is not defined in environment variables.");
       res.sendStatus(500); // Internal Server Error
    } else {
      jwt.verify(token, accessTokenSecret, (err, user) => {
        if (err)  res.sendStatus(403); // Forbidden
        req.user = user; // Attach user info to the request
        next(); // Proceed to the next middleware or route handler
      });
    }
  };
  
  export { authenticateToken };