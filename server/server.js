require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const fs = require('fs');
const connectDB = require('./config/db');
const mongoose = require('mongoose');
const Song = require('./models/Song');

// Initialize express app
const app = express();

// Create uploads directories
const createUploadDirs = () => {
  const dirs = ['./uploads', './uploads/songs', './uploads/images'];
  dirs.forEach(dir => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
      console.log(`Directory created: ${dir}`);
    }
  });
};

// Create directories
createUploadDirs();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:5173'], // Allow both React dev servers
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(morgan('dev'));

// Serve static files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Stream audio endpoint
app.get('/api/songs/:id/stream', (req, res) => {
  const songId = req.params.id;
  // Get song path from database based on songId
  const songPath = path.join(__dirname, 'uploads', 'songs', `${songId}.mp3`);
  
  res.sendFile(songPath);
});

// Test route
app.get('/', (req, res) => {
  res.json({ message: 'Server is running!' });
});

// Mount routes
app.use('/api/songs', require('./routes/songRoutes'));

// Add this after your other routes
app.get('/api/test/db', async (req, res) => {
  try {
    const collections = await mongoose.connection.db.listCollections().toArray();
    const songCount = await Song.countDocuments();
    
    res.json({
      status: 'success',
      message: 'Database is connected',
      collections: collections.map(c => c.name),
      songCount,
      dbName: mongoose.connection.db.databaseName
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Database error',
      error: error.message
    });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
