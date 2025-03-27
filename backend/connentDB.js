const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://crud:crud1234@cluster0.xjqnh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
      
    );
    console.log(" MongoDB Connected yo yo  we are success!");
  } catch (error) {
    console.log(" Connection Error:", error);
  }
};

// Call the function


module.exports = connectDB;
