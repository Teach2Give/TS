// types of errors when building backends
// 400 Bad Request
// This indicates that the request was malformed or invalid, such as invalid JSON, missing required fields, or incorrect data types.
const badRequestError = {
    status: 400,
    message: "Bad Request: The request could not be understood by the server.",
  };
  
  // 401 Unauthorized
  // This happens when the request requires user authentication, and the user is not authenticated or provides invalid credentials.
  const unauthorizedError = {
    status: 401,
    message: "Unauthorized: Access is denied due to invalid credentials.",
  };
  
  // 403 Forbidden
  // The server understood the request but refuses to authorize it, typically due to insufficient permissions.
  const forbiddenError = {
    status: 403,
    message: "Forbidden: You do not have permission to access this resource.",
  };
  
  // 404 Not Found
  // This occurs when the requested resource is not found on the server.
  const notFoundError = {
    status: 404,
    message: "Not Found: The requested resource could not be found.",
  };
  
  // 405 Method Not Allowed
  // This error occurs when the requested HTTP method is not allowed for the specific resource.
  const methodNotAllowedError = {
    status: 405,
    message:
      "Method Not Allowed: The requested HTTP method is not supported for this resource.",
  };
  
  //409 Conflict
  // This error occurs when there’s a conflict in the request, typically with data that already exists, such as a duplicate entry.
  const conflictError = {
    status: 409,
    message:
      "Conflict: The request could not be completed due to a conflict with the current state of the resource.",
  };
  
  // 422 Unprocessable Entity
  // This indicates that the server understands the content type of the request entity, but the entity contains semantic errors (e.g., validation failed).
  const unprocessableEntityError = {
    status: 422,
    message:
      "Unprocessable Entity: The server understands the request but was unable to process the instructions.",
  };
  
  // 500 Internal Server Error
  // This is a generic error when something unexpected occurs on the server side.
  const internalServerError = {
    status: 500,
    message: "Internal Server Error: An unexpected error occurred on the server.",
  };
  
  // 502 Bad Gateway
  // This occurs when the server, while acting as a gateway or proxy, receives an invalid response from the upstream server.
  const badGatewayError = {
    status: 502,
    message:
      "Bad Gateway: The server received an invalid response from the upstream server.",
  };
  
  // 503 Service Unavailable
  // This indicates that the server is currently unable to handle the request, often due to temporary overload or maintenance.
  const serviceUnavailableError = {
    status: 503,
    message:
      "Service Unavailable: The server is currently unable to handle the request due to temporary overload or maintenance.",
  };
  
  import express, { NextFunction, Request, Response } from "express";
  const app = express();
  
  /**
   * interface Error {
      name: string;
      message: string;
      stack?: string;
  }
   */
  
  interface CustomError extends Error {
    status?: number; // We make the status optional, so it's not required for every error
  }
  
  // Catch-all middleware to handle "Not Found" errors
  app.use((req: Request, res: Response, next: NextFunction) => {
    const error: CustomError = new Error("Not Found");
    error.status = 404; // Assign the custom status code
    next(error); // Pass the error to the error-handling middleware
  });
  
  // Error-handling middleware
  app.use((err: CustomError, req: Request, res: Response, next: NextFunction) => {
    // Set the status code or default to 500 for server errors
    const status = err.status || 500;
  
    // Send error response with the custom status and message
    res.status(status).json({
      status,
      message: err.message || "Internal Server Error",
    });
  });
  
  
  // // other error examples 
  // 2. Authentication and Authorization Errors
  // Invalid Token:
  
  // "Your session has expired. Please log in again."
  // "Invalid authentication token. Access denied."
  // "You need to log in to access this resource."
  // Token Expired:
  
  // "Your session has expired. Please refresh the page or log in again."
  // Access Denied (Role/Permission):
  
  // "You do not have the required permissions to perform this action."
  // "You are not authorized to view this content."
  // 3. Validation Errors
  // Validation Error:
  
  // "Input validation failed. Check the provided data."
  // "Invalid data format. Please adhere to the specified format."
  // "Required fields are missing or incorrectly formatted."
  // "Invalid email address format."
  // Password Errors:
  
  // "Password must be at least 8 characters long and contain a number and a special character."
  // "Passwords do not match. Please try again."
  // Invalid Data Type:
  
  // "Expected a number but received a string."
  // "Invalid data type. Check your input."
  // 4. Database Errors
  // Database Connection Error:
  
  // "Could not connect to the database. Please try again later."
  // "Database connection lost. Retry in a few moments."
  // Duplicate Entry:
  
  // "An entry with this value already exists."
  // "Duplicate key error: This value is already in use."
  // Record Not Found:
  
  // "The requested record does not exist in the database."
  // "No records match the provided query parameters."
  // 5. File Upload/Download Errors
  // File Not Found:
  
  // "The requested file could not be found on the server."
  // "The file you are looking for does not exist."
  // Invalid File Type:
  
  // "Unsupported file format. Please upload a valid file type."
  // "The file type is not allowed. Allowed formats: .jpg, .png, .pdf."
  // File Size Too Large:
  
  // "The uploaded file exceeds the maximum allowed size."
  // "File too large. Please upload a file smaller than 5MB."
  // 6. Third-party API Errors
  // Failed API Request:
  
  // "Failed to connect to the external API. Please try again later."
  // "Third-party service unavailable. Please check back later."
  // Invalid API Response:
  
  // "The API returned an unexpected response. Please try again."
  // "Error communicating with the external API. Response was invalid."
  // 7. Rate Limiting/Throttling Errors
  // Too Many Requests:
  // "You have exceeded the rate limit. Please wait before retrying."
  // "Too many requests. Please try again later."
  // 8. Input-specific Errors
  // Missing or Invalid Parameters:
  
  // "Missing required parameter: [parameterName]."
  // "Invalid value provided for: [parameterName]."
  // "Parameter [parameterName] must be a valid [expectedType]."
  // User Registration Errors:
  
  // "Email already registered. Please log in."
  // "Username is already taken. Please choose another one."
  // 9. Payment or Transaction Errors
  // Payment Failed:
  
  // "Payment processing failed. Please check your payment details."
  // "Transaction declined by the payment gateway."
  // Insufficient Funds:
  
  // "Insufficient funds to complete the transaction."
  // Card Declined:
  
  // "The provided card was declined. Please try another payment method."
  // 10. Session and Timeout Errors
  // Session Expired:
  
  // "Your session has expired. Please log in again to continue."
  // "Session timed out due to inactivity."
  // Login Timeout:
  
  // "Login attempt timed out. Please try again."
  // 11. Resource-specific Errors
  // Resource Conflict:
  
  // "The requested operation conflicts with the current state of the resource."
  // Resource Locked:
  
  // "The requested resource is currently locked by another process."
  
  //example of an implementation of a custom error 
  // Custom error handler middlewar
  function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
    const statusCode = err.status || 500;
    const message = err.message || "Internal Server Error";
  
    res.status(statusCode).json({
      status: statusCode,
      message: message,
    });
  }
  
  // Example usage in a route:
  app.get("/example", (req, res, next) => {
    try {
      // Your business logic here
      throw new Error("Something went wrong"); // Manually throwing an error for demo
    } catch (error) {
      next(error); // Pass error to the custom error handler
    }
  });
  
  // Apply the error handler middleware
  app.use(errorHandler);
  
  export {errorHandler}

  //after all routes 
  //put the custom error like this  
   //custom middleware are all placed after all routes  
//Placing this middleware  before your actual routes are will make routes  undefined, so it catches all requests, making your defined routes unreachable. 
//make sure it is place at the bottom of all routes
// Catch all undefined routes by adding a middleware at the end of your route definitions.
// Pass an error to the next middleware (your custom error handler) if the route is not found.
app.use((req: Request, res: Response, next: NextFunction) => {
    const error = new Error("Not Found") as any;
    error.status = 404;
    next(error); // Pass the error to the next middleware (error handler)
  });
  //custom error handler
  app.use(errorHandler)