// Import necessary modules
import "dotenv/config"; // For loading environment variables from a .env file
import express from "express"; // For creating a web server
import cors from "cors"; // For enabling Cross-Origin Resource Sharing (CORS)
import { connection_Nodejs } from "./config/db.js"; // For database connection
import productRouter from "./routes/productRoute.js"; // For product-related routes
import userROUTE from "./routes/userRoute.js"; // For user-related routes

import cartRouter from "./routes/cartRoute.js";
import orderRoute from "./routes/orderRoute.js";

// Create an Express application
const app = express();
const port = 3000; // Port on which the server will listen

// Middleware configuration
app.use(express.json()); // Parse JSON request bodies
app.use(cors()); // Enable CORS for allowing requests from different origins

// Database connection
connection_Nodejs(); // Connect to the database using the configuration from db.js

// API endpoints
app.use("/images", express.static("uploads")); // Serve static files from the 'uploads' directory
app.use("/api/product", productRouter); // Mount the product router for product-related endpoints
app.use("/api/user", userROUTE); // Mount the user router for user-related endpoints
app.use("/api/cart", cartRouter);
app.use("/api/orders", orderRoute);

// Default route
app.get("/", (req, res) => {
  res.send("Hello World!"); // Send a simple response to the root endpoint
});

// Start the server
app.listen(port, () => {
  console.log(`Server Running on ${port}`);
});