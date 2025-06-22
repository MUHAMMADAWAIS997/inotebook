const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fetchuser = require("../middleware/fetchUser");
const JWT_KEY = "Ju&%NUveGf$";
//Router 1: Create a user using POST method at "/api/auth/createUser" - No auth required
router.post(
  "/createUser",
  [
    body("name", "Enter Valid Name").isLength({ min: 3 }),
    body("email", "Enter Valid Email").isEmail(),
    body("password", "Password Is too Short").isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    try {
      if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array() });
      }
      const { name, email, password } = req.body;
      const salt = await bcrypt.genSalt(10);
      const enPass = await bcrypt.hash(password, salt);

      const checkExistingUser = await User.findOne({ email });
      if (checkExistingUser) {
        res.status(400).json({ message: "User Already Exist" });
      }
      const user = await User.create({
        name: name,
        email: email,
        password: enPass,
      });
      const data = {
        user: {
          id: user.id,
        },
      };
      const token = jwt.sign(data, JWT_KEY);
      res.status(201).json({ token });
    } catch (err) {
      res.status(500).json({ message: "Internal Server Error", err });
    }
  }
);
//Router 2: Validate user i.e. login endpoint using POST method at /api/auth/login
router.post(
  "/login",
  [
    body("email", "Enter Valid Email").isEmail(),
    body("password", "Password cannnot be blank").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() });
    }
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ error: "Wrong Credentials" });
      }
      const comparePassword = await bcrypt.compare(password, user.password);
      if (!comparePassword) {
        return res.status(400).json({ error: "Wrong Credentials" });
      }
      const data = {
        user: {
          id: user.id,
        },
      };
      const token = jwt.sign(data, JWT_KEY);
      res.status(201).json({ token });
    } catch (err) {
      res.status(500).json({ message: "Internal Server Error", err });
    }
  }
);
//Router 3: Get user data using POST method (after user logged in) auth required
router.post("/getUser",fetchuser,async (req, res) => {
  try {
    userId=req.user.id
    const user = await User.findById(userId).select('-password')
    res.send(user)
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error", err });
  }
});
//update user password using email as a key by PUT method
router.put("/updateUser", async (req, res) => {
  const { name, email, password } = req.body;
  const salt = await bcrypt.genSalt(10);
  const enPass = await bcrypt.hash(password, salt);
  const updatedUser = await User.findOneAndUpdate(
    { email }, // Filter by email
    { name, password:enPass }, // Fields to update
    { new: true, runValidators: true } // Return updated doc & validate
  );
  if (updatedUser) {
    return res.status(201).json({ message: "Password updated Successfully" });
  }
  res.status(400).json({ error: "User with this email not found." });
});

module.exports = router;
