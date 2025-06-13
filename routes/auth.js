const express = require("express");
const fs = require("fs");
const path = require("path");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { token } = require("morgan");
const authenticateToken = require("../middleware/authMiddleware");
require("dotenv").config();

const filePath = path.join(__dirname, "../authDetails.json");

// SIGNUP
router.post("/signup", async (req, res) => {
    const { username, email, password } = req.body;
    let users = [];

    if (fs.existsSync(filePath)) {
        const fileData = fs.readFileSync(filePath, "utf-8");
        users = JSON.parse(fileData || "[]");
    }

    const userExists = users.find(user => user.email === email);
    if (userExists) {
        return res.status(409).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    users.push({ username, email, password: hashedPassword });
    fs.writeFileSync(filePath, JSON.stringify(users, null, 2));

    
    return res.status(201).json({ message: "User created successfully", token });
});

// LOGIN
router.post("/login", (req, res) => {
    const { email, password,username } = req.body;

    if (!fs.existsSync(filePath)) {
        return res.status(404).json({ message: "No users found. Please signup first." });
    }

    const fileData = fs.readFileSync(filePath, "utf-8");
    const users = JSON.parse(fileData || "[]");

    const user = users.find(u => u.email === email);
    if (!user) {
        return res.status(401).json({ message: "Invalid email or password" });
    }

    const isMatch = bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign({ email:user.email, username:user.username }, process.env.JWT_SECRET, { expiresIn: "1h" });
    const decode=jwt.decode(token)
    console.log(decode)
    return res.status(200).json({ message: "Login successful",token});
});

// DELETE USER
router.post("/delete/:username", (req, res) => {
    const { username } = req.params;

    if (!fs.existsSync(filePath)) {
        return res.status(404).json({ message: "No users found. Please signup first." });
    }

    const fileData = fs.readFileSync(filePath, "utf-8");
    const users = JSON.parse(fileData || "[]");

    const newUsers = users.filter(u => u.username !== username);

    if (users.length === newUsers.length) {
        return res.status(404).json({ message: "User not found" });
    }

    fs.writeFileSync(filePath, JSON.stringify(newUsers, null, 2));
    
    return res.status(200).json({ message: `User ${username} deleted successfully` });
});

// GET ALL USERS
router.post("/getallusers", (req, res) => {
    if (!fs.existsSync(filePath)) {
        return res.status(404).json({ message: "No users found. Please signup first." });
    }

    const fileData = fs.readFileSync(filePath, "utf-8");
    const users = JSON.parse(fileData || "[]");

    return res.status(200).json({ message: "All users", users });
});

// UPDATE USER
router.post("/update/:username", async (req, res) => {
    const { username } = req.params;
    const { newUsername, newEmail, newPassword } = req.body;

    if (!fs.existsSync(filePath)) {
        return res.status(404).json({ message: "No users found. Please signup first." });
    }

    const fileData = fs.readFileSync(filePath, "utf-8");
    const users = JSON.parse(fileData || "[]");

    const user = users.find(u => u.username === username);

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    user.username = newUsername;
    user.email = newEmail;
    user.password = await bcrypt.hash(newPassword, 10); // Secure password update

    fs.writeFileSync(filePath, JSON.stringify(users, null, 2));
    return res.status(200).json({ message: `User ${username} updated successfully` });
});

router.post("/dashboard",authenticateToken,(req,res)=>{
res.json({
    message:"Welcome to dashboard",
    user:req.user
})    
})

module.exports = router;
