const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(express.json()); // to parse json body
app.use(cors());

// Connect to MongoDB
const PORT = process.env.PORT || 5000;
const { MongoMemoryServer } = require('mongodb-memory-server');

const connectDB = async () => {
  try {
    let uri = process.env.MONGO_URI;
    
    if (!uri) {
      console.log('No MONGO_URI found, starting in-memory database for testing...');
      const mongoServer = await MongoMemoryServer.create();
      uri = mongoServer.getUri();
    }

    await mongoose.connect(uri);
    console.log('MongoDB Connected!');
  } catch (err) {
    console.log('DB connection error:', err);
  }
};

// Basic route to test server
app.get('/', (req, res) => {
  res.send('Task Manager API is running!');
});

// Import Routes
const authRoutes = require('./routes/auth');
const projectRoutes = require('./routes/projects');
const taskRoutes = require('./routes/tasks');

// Use Routes
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/tasks', taskRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
  connectDB();
});
