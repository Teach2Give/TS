import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { readFileSync } from "fs";
import path from "path";

dotenv.config();

// Inference
const app: Express = express();
const port = process.env.PORT || 3000; // Default to port 3000 if not specified

// Get the current directory
const _dirname = path.resolve();

// Synchronously read the file
const eventData = readFileSync(
  path.join(_dirname, "src", "db", "eventsData.json"),
  "utf-8"
);

// middlewares
app.use(express.json());

// Health check
app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

// Handles data from event data
app.get("/api/events", (req: Request, res: Response) => {
  res.send(eventData);
});

// Faker database for demonstration
const userData = [
  { userID: 1, userName: "alamin", displayName: "alamin254" },
  { userID: 2, userName: "Emmanuel", displayName: "emm254" },
  { userID: 3, userName: "Kevin", displayName: "kev254" },
  { userID: 4, userName: "John", displayName: "john254" },
];

//routing params
//api/users/:id - http://localhost:3000/api/users/1
app.get("/api/users", (req: Request, res: Response) => {
  res.send(userData);
});

// Routing parameters to get a particular user by id
app.get("/api/users/:id", (req: Request, res: Response) => {
  //access the param name using re.params.id
  const userID: string = req.params?.id ?? "";
  //we need to parse the string to int
  const parseedID: number = parseInt(userID, 10);

  //we will use .find() - returns based on the argument passed
  //find calls predicate once for each element of the array, in ascending order, until it finds one where predicate returns true
  const foundUser = userData.find((userObj) => userObj.userID === parseedID);
  if (!foundUser) {
    res.status(404).json({
      message: "Data not available",
    });
  } else {
    //return the data found
    res.status(201).json({
      message: "User Found",
      data: foundUser,
    });
  }
});

// post req
app.post("/api/users", (req: Request, res: Response) => {
  //console.log(req.body) this will print for you the data you pass in the body(clinet/postman)

  //lets destructure the body object
  const { body } = req;
  // Determine the new user ID
  const newUserID =
    userData.length > 0 ? userData[userData.length - 1].userID + 1 : "";

  const newUser = { id: newUserID, ...body };
  userData.push(newUser);

  res.status(201).send(newUser);
});

// PATCH request to update user by ID
app.patch("/api/users/:id", (req: Request, res: Response) => {
  // Destructure the body and params
  const { body } = req;
  const { id } = req.params;

  // Parse the ID from the URL parameters
  const parsedId = parseInt(id);
  // Find the index of the user in the userData array
  const findUserIndex = userData.findIndex((user) => user.userID === parsedId);

  if (isNaN(parsedId)) {
    res.sendStatus(400);
  }
  // If user is not found, return a 404 status
  else if (findUserIndex === -1) {
    res.sendStatus(404);
  } else {
    // Update the user data
    userData[findUserIndex] = { ...userData[findUserIndex], ...body };
    console.log("User updated");

    // Return a 200 status
    res.sendStatus(200);
  }
});


// PUT request to update user by ID
app.put("/api/users/:id", (req: Request, res: Response) => {
  // Destructure the body and params
  const { body } = req;
  const { id } = req.params;

  // Parse the ID from the URL parameters
  const parsedId = parseInt(id);
  
  // Find the index of the user in the userData array
  const findUserIndex = userData.findIndex((user) => user.userID === parsedId);

  if (isNaN(parsedId)) {
    res.sendStatus(400);
  } else if (findUserIndex === -1) {
    res.sendStatus(404);
  } else {
    // Update the user data while preserving the ID
    userData[findUserIndex] = { id: parsedId, ...body };
    console.log("User updated");

    // Return a 200 status
    res.sendStatus(200);
  }
});

// DELETE request to remove user by ID
app.delete('/api/users/:id', (req: Request, res: Response) => {
  // Destructure params
  const { id } = req.params;

  // Parse the ID from the URL parameters
  const parsedId = parseInt(id);
  // Find the index of the user in the userData array
  const findUserIndex = userData.findIndex((user) => user.userID === parsedId);

  if (isNaN(parsedId)) {
    res.sendStatus(400);
  } else if (findUserIndex === -1) {
    res.sendStatus(404);
  } else {
    // Remove the user from the array
    userData.splice(findUserIndex, 1);
    // Return a 200 status
    res.sendStatus(200);
  }
});


// Start the server
app.listen(port, () => {
  console.log(
    `[server]: Server TypeScript is running at http://localhost:${port} 😂😂😂😂`
  );
});

/*
Error: Cannot set headers after they are sent to the client
    at ServerResponse.setHeader (node:_http_outgoing:659:11)
    at ServerResponse.header (C:\dev\QA-QE\4.Node\5.express\1.queryParams\node_modules\.pnpm\express@4.21.0\node_modules\express\lib\response.js:794:10)
    at ServerResponse.send (C:\dev\QA-QE\4.Node\5.express\1.queryParams\node_modules\.pnpm\express@4.21.0\node_modules\express\lib\response.js:174:12)
    at ServerResponse.json (C:\dev\QA-QE\4.Node\5.express\1.queryParams\node_modules\.pnpm\express@4.21.0\node_modules\express\lib\response.js:278:15)
    at ServerResponse.send (C:\dev\QA-QE\4.Node\5.express\1.queryParams\node_modules\.pnpm\express@4.21.0\node_modules\express\lib\response.js:162:21)
    at C:\dev\QA-QE\4.Node\5.express\1.queryParams\src\server.ts:55:7
    at Layer.handle [as handle_request] (C:\dev\QA-QE\4.Node\5.express\1.queryParams\node_modules\.pnpm\express@4.21.0\node_modules\express\lib\router\layer.js:95:5)       
    at next (C:\dev\QA-QE\4.Node\5.express\1.queryParams\node_modules\.pnpm\express@4.21.0\node_modules\express\lib\router\route.js:149:13)
    at Route.dispatch (C:\dev\QA-QE\4.Node\5.express\1.queryParams\node_modules\.pnpm\express@4.21.0\node_modules\express\lib\router\route.js:119:3)
    at Layer.handle [as handle_request] (C:\dev\QA-QE\4.Node\5.express\1.queryParams\node_modules\.pnpm\express@4.21.0\node_modules\express\lib\router\layer.js:95:5)  


     if (filter && value) {
    const filteredData = userData.filter((userObject) => {
      return (userObject[filter as keyof typeof userObject]?.toString() || "").toLowerCase().includes(value.toLowerCase())
    })
    res.send(filteredData)
  }

  res.send(userData);
    its saying I run two request endpoits at the same both the if statement and after if
    //we need to add an else 
    // try - catch 
    */

//if you forget express.json
//     It looks like your code is intended to add a new user to the userData array and return that new user as a response. If you're seeing that only the id is being pushed and not the data you posted, there could be a couple of potential issues to investigate:

// Client-Side Issue: Ensure that the client (like Postman or your frontend) is actually sending the body of the request correctly. If you're sending JSON, make sure you're setting the Content-Type header to application/json and that the body is properly formatted.

// Body Parsing Middleware: Ensure that you're using body parsing middleware in your Express app. For JSON payloads, you should include:
