const mongoose = require('mongoose');

const songSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  artist: {
    type: String,
    required: true,
    trim: true,
  },
  album: {
    type: String,
    trim: true,
  },
  genre: {
    type: String,
    trim: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  coverImage: {
    type: String,
    required: true,
  },
  audioUrl: {
    type: String,
    required: true,
  },
  plays: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true,
  collection: 'songs'
});

module.exports = mongoose.model('Song', songSchema);
