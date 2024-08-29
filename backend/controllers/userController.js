import jwt from "jsonwebtoken"; // Import library for creating JSON Web Tokens
import bcrypt from "bcrypt"; // Import library for secure password hashing
import userModel from "../models/usermodels.js"; // Import user model from models directory
import validator from "validator"; // Import library for data validation

// Login user function (asynchronous for handling promises)
const loginUSER = async (req, res) => {
  // Extract email and password from request body
  const { email, password } = req.body;

  try {
    // Find user with matching email in the database
    const user = await userModel.findOne({ email });

    // Check if user exists
    if (!user) {
      // User not found, return error message
      return res.json({ success: false, message: "User doesn't exist!" });
    }

    // Compare entered password with hashed password in database
    const isMatch = await bcrypt.compare(password, user.password);

    // Check if passwords match
    if (!isMatch) {
      // Invalid credentials, return error message
      return res.json({ success: false, message: "Invalid credentials" });
    }

    // Generate JWT token using user ID
    const token = createToken(user._id);

    // Login successful, return success message and token
    res.json({ success: true, token });

  } catch (error) {
    // Handle any errors during login process
    console.log(error);
    res.json({ success: false, message: `Error in login` });
  }
};

// Function to create JWT token (reusable)
const createToken = (id) => {
  // Sign the token with user ID and secret key from environment variable
  return jwt.sign({ id }, process.env.jwt_secret);
}

// Register user function (asynchronous for handling promises)
const registerUSER = async (req, res) => {
  // Extract name, email, and password from request body
  const { name, email, password } = req.body;

  try {
    // Check if user with the email already exists
    const exists = await userModel.findOne({ email });
    if (exists) {
      // User already exists, return error message
      return res.json({ success: false, message: "User Already Exists!" });
    }

    // Validate email format
    if (!validator.isEmail(email)) {
      // Invalid email format, return error message
      return res.json({ success: false, message: "Enter Your Valid Email!" });
    }

    // Check password length (optional, adjust as needed)
    if (password.length < 8) {
      // Password too short, return error message
      return res.json({ success: false, message: "Password must have more than 8 characters" });
    }

    // Generate salt for password hashing
    const salt = await bcrypt.genSalt(10);

    // Hash the password using the generated salt
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user object with hashed password
    const newUser = new userModel({
      name: name,
      email: email,
      password: hashedPassword,
    });

    // Save the new user to the database
    const user = await newUser.save();

    // Generate JWT token using the saved user ID
    const token = createToken(user._id);

    // Registration successful, return success message and token
    res.json({ success: true, token });

  } catch (error) {
    // Handle any errors during registration process
    console.log(error);
    res.json({ success: false, message: `Error in sign up` });
  }
};

export { loginUSER, registerUSER };