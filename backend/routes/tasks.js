const express = require('express');
const router = express.Router();
const Task = require('../models/Task');
const { auth, isAdmin } = require('../middleware/auth');

// GET all tasks
// If admin, see all tasks. If member, see assigned tasks.
router.get('/', auth, async (req, res) => {
  try {
    let tasks;
    if (req.user.role === 'admin') {
      tasks = await Task.find().populate('assignedTo', 'name email').populate('project', 'name');
    } else {
      tasks = await Task.find({ assignedTo: req.user.id }).populate('assignedTo', 'name email').populate('project', 'name');
    }
    res.json(tasks);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
});

// POST create task (admin only)
router.post('/', [auth, isAdmin], async (req, res) => {
  try {
    const { title, description, assignedTo, project, dueDate } = req.body;
    
    if (!title || !project) {
      return res.status(400).json({ message: "Title and project are required" });
    }

    const newTask = new Task({
      title,
      description,
      assignedTo: assignedTo || null,
      project,
      dueDate
    });

    const task = await newTask.save();
    res.json(task);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
});

// PUT update task status (member or admin)
router.put('/:id', auth, async (req, res) => {
  try {
    const { status } = req.body;
    
    // Find task
    let task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    // Check if user is admin or assigned to the task
    if (req.user.role !== 'admin' && task.assignedTo.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized to update this task" });
    }

    task.status = status;
    await task.save();

    res.json(task);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
