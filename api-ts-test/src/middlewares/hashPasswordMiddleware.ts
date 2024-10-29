import { Request, Response, NextFunction } from "express";
import bcrypt from "bcryptjs";

const hashPasswordMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { password, confirmPassword } = req.body;

  if (!password || !confirmPassword) {
    res.status(400).json({ message: 'Password and confirm password are required' });
  } else if (password !== confirmPassword) {
    res.status(400).json({ message: 'Passwords do not match' });

  } else {
    try {
      // Hash the password and confirm password
      const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds
      req.body.password = hashedPassword; // Replace plaintext password with hashed one
      req.body.confirmPassword = hashedPassword; // Replace confirm password with hashed one
      next(); // Call next middleware or route handler
    } catch (error) {
      res.status(500).json({ message: 'Error hashing password' });
    }
  }
};
export {hashPasswordMiddleware}


