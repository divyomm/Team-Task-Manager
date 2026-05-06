const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// POST /api/auth/signup
router.post('/signup', async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // simple check
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Please enter all fields" });
    }

    // check if user exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // create user
    user = new User({
      name,
      email,
      password: hashedPassword,
      role: role || 'member'
    });

    await user.save();

    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // create payload
    const payload = {
      user: {
        id: user.id,
        role: user.role,
        name: user.name
      }
    };

    // sign token
    jwt.sign(
      payload,
      process.env.JWT_SECRET || 'supersecretkey123',
      { expiresIn: '1d' },
      (err, token) => {
        if (err) throw err;
        res.json({ token, user: payload.user });
      }
    );
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
});

// GET /api/auth/users
// Route to get all users for assigning tasks
const { auth } = require('../middleware/auth');
router.get('/users', auth, async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
