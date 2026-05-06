const express = require('express');
const router = express.Router();
const Project = require('../models/Project');
const { auth, isAdmin } = require('../middleware/auth');

// GET all projects
router.get('/', auth, async (req, res) => {
  try {
    const projects = await Project.find().populate('members', 'name email');
    res.json(projects);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
});

// POST create project (admin only)
router.post('/', [auth, isAdmin], async (req, res) => {
  try {
    const { name, description, members } = req.body;
    
    if (!name) {
      return res.status(400).json({ message: "Project name is required" });
    }

    const newProject = new Project({
      name,
      description,
      members: members || []
    });

    const project = await newProject.save();
    res.json(project);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
