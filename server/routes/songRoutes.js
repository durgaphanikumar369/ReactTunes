const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');

// Import controller functions
const {
  getAllSongs,
  getSong,
  addSong,
  getSongsByGenre,
  searchSongs,
  incrementPlays
} = require('../controllers/songController');

// Define routes with proper controller functions
router.post('/', 
  upload.fields([
    { name: 'audio', maxCount: 1 },
    { name: 'coverImage', maxCount: 1 }
  ]),
  addSong
);

// Make sure these controller functions exist
router.get('/', getAllSongs);                    // Get all songs
router.get('/search', searchSongs);              // Search songs
router.get('/genre/:genre', getSongsByGenre);    // Get songs by genre
router.get('/:id', getSong);                     // Get single song
router.put('/:id/play', incrementPlays);         // Increment play count

module.exports = router;
