import express from "express";
import { loginUSER, registerUSER } from "../controllers/userController.js";

const userROUTE = express.Router();

// Define a route for user login
userROUTE.post("/login", loginUSER);
// Define a route for user registration
userROUTE.post("/register", registerUSER);

export default userROUTE;