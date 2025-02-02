const Song = require('../models/Song');

// Get all songs
exports.getAllSongs = async (req, res) => {
  try {
    console.log('Fetching songs from database...');
    const songs = await Song.find().sort({ createdAt: -1 });
    console.log(`Found ${songs.length} songs`);
    
    if (songs.length === 0) {
      // If no songs found, let's add a test song
      const testSong = new Song({
        title: "Test Song",
        artist: "Test Artist",
        album: "Test Album",
        genre: "Pop",
        duration: 180,
        coverImage: "uploads/images/default-cover.jpg",
        audioUrl: "uploads/songs/test-song.mp3"
      });
      
      await testSong.save();
      console.log('Added test song to database');
    }

    res.status(200).json({
      success: true,
      count: songs.length,
      data: songs.map(song => ({
        ...song.toObject(),
        coverImage: song.coverImage.replace('uploads/', ''),
        audioUrl: song.audioUrl.replace('uploads/', '')
      }))
    });
  } catch (error) {
    console.error('Error in getAllSongs:', error);
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

// Get single song
exports.getSong = async (req, res) => {
  try {
    const song = await Song.findById(req.params.id);
    if (!song) {
      return res.status(404).json({
        success: false,
        error: 'Song not found'
      });
    }
    res.status(200).json({
      success: true,
      data: song
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

// Add new song
exports.addSong = async (req, res) => {
  try {
    const { title, artist, album, genre, duration } = req.body;

    // Create new song
    const song = new Song({
      title,
      artist,
      album,
      genre,
      duration,
      coverImage: req.files['coverImage'][0].path,
      audioUrl: req.files['audio'][0].path
    });

    await song.save();

    res.status(201).json({
      success: true,
      data: song
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

// Get songs by genre
exports.getSongsByGenre = async (req, res) => {
  try {
    const songs = await Song.find({ genre: req.params.genre });
    res.status(200).json({
      success: true,
      count: songs.length,
      data: songs
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

// Search songs
exports.searchSongs = async (req, res) => {
  try {
    const { query } = req.query;
    const songs = await Song.find({
      $or: [
        { title: { $regex: query, $options: 'i' } },
        { artist: { $regex: query, $options: 'i' } },
        { album: { $regex: query, $options: 'i' } }
      ]
    });
    res.status(200).json({
      success: true,
      count: songs.length,
      data: songs
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

// Increment play count
exports.incrementPlays = async (req, res) => {
  try {
    const song = await Song.findByIdAndUpdate(
      req.params.id,
      { $inc: { plays: 1 } },
      { new: true }
    );
    res.status(200).json({
      success: true,
      data: song
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

// Other existing controller methods...
