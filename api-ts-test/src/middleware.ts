// What is Middleware in Express?
// In Express.js, middleware is a function that has access to the request object (req), the response object (res), and the next function in the application’s request-response cycle. Middleware functions can execute code, modify the req or res objects, and end the request-response cycle or pass control to the next middleware by calling the next() function.

// Middleware Usage:
// Middleware can be used for tasks such as:

// Logging requests.
// Parsing incoming data (e.g., JSON or URL-encoded data).
// Authenticating or authorizing requests.
// Handling errors.
// Middleware can be applied to:

// All routes: using app.use().
// Specific routes: by passing the middleware as a second argument to app.get(), app.post(), etc.
// How Middleware Works in Express:
// Middleware functions are executed sequentially in the order they are defined.
// If the current middleware function does not call next(), the request will be left hanging and will not proceed to the next step.


app.use((req, res, next) => {
    console.log('Middleware 1');
    next();  // Passes control to the next middleware
  });
  
  app.use((req, res, next) => {
    console.log('Middleware 2');
    next();  // Passes control to the next middleware
  });
  
  // Route handler
  app.get('/', (req, res) => {
    res.send('Hello World!');
  });

  
//   Adding JWT Authentication Middleware
// JWT (JSON Web Token) is often used to secure routes by verifying if the request contains a valid token. You can create a JWT authentication middleware in Express to ensure that only authorized users can access certain routes.

// Steps to Create a JWT Authentication Middleware:
// Install jsonwebtoken: You'll need the jsonwebtoken package to verify tokens.
// import { Request, Response, NextFunction } from 'express';
// npm install jsonwebtoken
//npm install express jsonwebtoken @types/express @types/jsonwebtoken

import express, { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

const app = express();

// Secret key for JWT signing and verification (should be stored securely in environment variables)
const JWT_SECRET = 'your-secret-key';

// Define a custom Request type to include the `user` property (which is added after JWT validation)
interface AuthenticatedRequest extends Request {
  user?: string | JwtPayload; // Attach user information after JWT validation
}

// JWT authentication middleware
const authenticateJWT = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    // JWT is typically sent in the form: 'Bearer token'
    const token = authHeader.split(' ')[1];

    // Verify the JWT token
    jwt.verify(token, JWT_SECRET, (err, user) => {
      if (err) {
        return res.status(403).json({ message: 'Forbidden' });
      }

      // If valid, attach user info to request and proceed
      req.user = user;
      next();
    });
  } else {
    // If token is not present
    return res.status(401).json({ message: 'Unauthorized' });
  }
};

// Example protected route using the JWT middleware
app.get('/api/protected', authenticateJWT, (req: AuthenticatedRequest, res: Response) => {
  res.json({ message: 'This is a protected route', user: req.user });
});

// Example unprotected route
app.get('/api/public', (req: Request, res: Response) => {
  res.json({ message: 'This is a public route' });
});

// Start server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});


// Key Changes in TypeScript:
// Type Definitions:

// Request, Response, and NextFunction are imported from express to correctly type the middleware parameters.
// Created a custom interface AuthenticatedRequest extending Request to include a user property, which will be added to the request after verifying the JWT.
// JWT Verification:

// The jwt.verify() method uses a callback where the user (if valid) is attached to req.user.
// Middleware Function:

// The middleware is typed to use AuthenticatedRequest, ensuring TypeScript knows that the user property is added during JWT validation.
// Explanation:
// JWT Authentication Middleware (authenticateJWT):

// It extracts the token from the Authorization header (formatted as Bearer token).
// It verifies the token using the jsonwebtoken library and the secret key (JWT_SECRET).
// If the token is valid, the decoded user information is attached to req.user and the request is passed to the next middleware or route handler.
// If the token is invalid or missing, it returns a 401 or 403 status code.
// Applying Middleware to Routes:

// The authenticateJWT middleware is applied to the /api/protected route to ensure only authenticated users can access it.
// The /api/public route does not use the middleware, so it is accessible without a token.
// How JWT Authentication Works:
// The client sends an HTTP request with a JWT token in the Authorization header.

// Authorization: Bearer <jwt-token>
// The authenticateJWT middleware checks for the token and verifies it using the secret key.

// If the token is valid, the request proceeds to the protected route.
// If the token is missing or invalid, the middleware responds with a 401 (Unauthorized) or 403 (Forbidden) status code.
// Registering Middleware for All Requests:
// To apply middleware to all routes in your application, you can use app.use():


// Create the Authentication Middleware: The middleware will check if the token is present in the Authorization header, verify it, and either allow the request to proceed or return an error if the token is invalid.

// Add Middleware to Protect Routes: Use the middleware on routes you want to protect.

// Define a custom Request type to include `findUserIndex` 
interface UserIndexRequest extends Request {
  findUserIndex?: number;  // Optional, as it will be added in the middleware
}

// Example userData array for illustration purposes
const userData = [
  { id: 1, name: 'John Doe' },
  { id: 2, name: 'Jane Doe' }
];

// Middleware to resolve user by index
const resolveUserByIndex = (req: UserIndexRequest, res: Response, next: NextFunction) => {
  const { params: { id } } = req;
  const parsedId = parseInt(id);

  if (isNaN(parsedId)) {
    return res.status(400).json({ message: 'Invalid user ID' });
  }

  const findUserIndex = userData.findIndex((user) => user.id === parsedId);

  if (findUserIndex === -1) {
    return res.status(404).json({ message: 'User not found' });
  }

  // Attach the found user index to the req object
  req.findUserIndex = findUserIndex;

  // Move to the next middleware or route handler
  next();
};

// Example usage in a route handler
import express from 'express';
const app = express();

// Use the middleware in an endpoint
app.get('/api/users/:id', resolveUserByIndex, (req: UserIndexRequest, res: Response) => {
  const user = userData[req.findUserIndex!]; // '!' asserts that findUserIndex is defined
  res.json({ user });
});

// Start server
app.listen(3000, () => {
  console.log('Server running on port 3000');
});
