// mongodb+srv://<db_username>:<db_password>@cluster0.xjqnh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

const express = require("express");
const cors = require('cors');
const connectDB = require("./connentDB")
const User = require("./mdoel")



const app = express();

app.use(cors());
app.use(express.json()); 

connectDB();


app.post("/add-user", async (req, res) => {
  try {
    const { color, category, price } = req.body; // Extract data from the request body

    const newUser = new User({ color, category, price }); // Create a new user document

    await newUser.save(); // Save to MongoDB

    res.status(201).json({ message: "User saved successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error saving user" });
  }
});





//showing data
app.get("/users", async (req, res) => {
  try {
    const users = await User.find(); // Fetch all users from MongoDB
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Error fetching users" });
  }
});




app.put("/users/:id", async (req, res) => {
  try {
    const { color, category, price } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { color, category, price },
      { new: true }
    );

    if (!updatedUser) return res.status(404).json({ error: "User not found" });

    res.status(200).json({ message: "User updated successfully", user: updatedUser });
  } catch (error) {
    res.status(500).json({ error: "Error updating user", details: error.message });
  }
});



//deletein
app.delete("/users/:id", async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting user" });
  }
});


// Get all users
app.get("/users", async (req, res) => {
  const users = await User.find();
  res.json(users);
});

// Get a single user by ID
app.get("/users/:id", async (req, res) => {
  const user = await User.findById(req.params.id);
  res.json(user);
});







app.listen(5000, () => console.log("Server running on port 5000"));
