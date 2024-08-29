import mongoose from "mongoose";

// Create a new Mongoose schema for the user model
const userSchema = new mongoose.Schema({
    // Define the properties of the user document
    name: { type: String, required: true }, // Name field, required
    email: { type: String, required: true , uniqe :true }, // Email field, required
    password: { type: String, required: true }, // Password field, required
    cartData: { type: Object, default: {} }, // Cart data field, default to an empty object
}, { minimize: false }); // Prevent Mongoose from automatically removing empty fields

// Get the existing user model or create a new one if it doesn't exist
const userModel = mongoose.models.user || mongoose.model("user", userSchema);

// Export the user model for use in other parts of the application
export default userModel;