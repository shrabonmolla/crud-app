const mongoose = require("mongoose");

// Define the schema
const userSchema = new mongoose.Schema({
  color: { type: String, required: true },
  category: { type: String, required: true, },
  price: { type: String, required: true },
});

// Create a model based on the schema
const User = mongoose.model("User", userSchema);

module.exports = User;
