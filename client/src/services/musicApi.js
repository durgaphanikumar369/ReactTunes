import axios from 'axios';

// Jamendo API - Free music API
const JAMENDO_API_KEY = '2d8aede8'; // Get your API key from https://developer.jamendo.com/
const JAMENDO_BASE_URL = 'https://api.jamendo.com/v3.0';

// Free Music Archive API
//const FMA_BASE_URL = 'https://freemusicarchive.org/api';

// Alternative free music sources
const FREE_MUSIC_SOURCES = [
  {
    _id: '1',
    title: "Acoustic Breeze",
    artist: "Benjamin Tissot",
    album: "Bensound Compilation",
    coverImage: "https://www.bensound.com/bensound-img/acousticbreeze.jpg",
    backupImage: "https://via.placeholder.com/300?text=Acoustic+Breeze",
    audioUrl: "https://www.bensound.com/bensound-music/bensound-acousticbreeze.mp3",
    duration: 260,
    genre: "Acoustic"
  },
  {
    _id: '2',
    title: "Summer",
    artist: "Benjamin Tissot",
    album: "Bensound Compilation",
    coverImage: "https://www.bensound.com/bensound-img/summer.jpg",
    backupImage: "https://via.placeholder.com/300?text=Summer",
    audioUrl: "https://www.bensound.com/bensound-music/bensound-summer.mp3",
    duration: 217,
    genre: "Pop"
  },
  {
    _id: '3',
    title: "Creative Minds",
    artist: "Benjamin Tissot",
    album: "Bensound Collection",
    coverImage: "https://www.bensound.com/bensound-img/creativeminds.jpg",
    backupImage: "https://via.placeholder.com/300?text=Creative+Minds",
    audioUrl: "https://www.bensound.com/bensound-music/bensound-creativeminds.mp3",
    duration: 140,
    genre: "Corporate"
  },
  {
    _id: '4',
    title: "Jazz Piano",
    artist: "Benjamin Tissot",
    album: "Bensound Jazz",
    coverImage: "https://www.bensound.com/bensound-img/jazzyfrenchy.jpg",
    backupImage: "https://via.placeholder.com/300?text=Jazz+Piano",
    audioUrl: "https://www.bensound.com/bensound-music/bensound-jazzyfrenchy.mp3",
    duration: 167,
    genre: "Jazz"
  },
  {
    _id: '5',
    title: "Ukulele",
    artist: "Benjamin Tissot",
    album: "Bensound Acoustic",
    coverImage: "https://www.bensound.com/bensound-img/ukulele.jpg",
    backupImage: "https://via.placeholder.com/300?text=Ukulele",
    audioUrl: "https://www.bensound.com/bensound-music/bensound-ukulele.mp3",
    duration: 146,
    genre: "Acoustic"
  },
  {
    _id: '6',
    title: "Happy Rock",
    artist: "Benjamin Tissot",
    album: "Bensound Rock",
    coverImage: "https://www.bensound.com/bensound-img/happyrock.jpg",
    backupImage: "https://via.placeholder.com/300?text=Happy+Rock",
    audioUrl: "https://www.bensound.com/bensound-music/bensound-happyrock.mp3",
    duration: 105,
    genre: "Rock"
  },
  {
    _id: '7',
    title: "Memories",
    artist: "Benjamin Tissot",
    album: "Bensound Cinematic",
    coverImage: "https://www.bensound.com/bensound-img/memories.jpg",
    backupImage: "https://via.placeholder.com/300?text=Memories",
    audioUrl: "https://www.bensound.com/bensound-music/bensound-memories.mp3",
    duration: 232,
    genre: "Cinematic"
  },
  {
    _id: '8',
    title: "Once Again",
    artist: "Benjamin Tissot",
    album: "Bensound Pop",
    coverImage: "https://www.bensound.com/bensound-img/onceagain.jpg",
    backupImage: "https://via.placeholder.com/300?text=Once+Again",
    audioUrl: "https://www.bensound.com/bensound-music/bensound-onceagain.mp3",
    duration: 204,
    genre: "Pop"
  },
  {
    _id: '9',
    title: "Sweet",
    artist: "Benjamin Tissot",
    album: "Bensound Pop",
    coverImage: "https://www.bensound.com/bensound-img/sweet.jpg",
    backupImage: "https://via.placeholder.com/300?text=Sweet",
    audioUrl: "https://www.bensound.com/bensound-music/bensound-sweet.mp3",
    duration: 285,
    genre: "Pop"
  },
  {
    _id: '10',
    title: "Sunny",
    artist: "Benjamin Tissot",
    album: "Bensound Jazz",
    coverImage: "https://www.bensound.com/bensound-img/sunny.jpg",
    backupImage: "https://via.placeholder.com/300?text=Sunny",
    audioUrl: "https://www.bensound.com/bensound-music/bensound-sunny.mp3",
    duration: 141,
    genre: "Jazz"
  },
  {
    _id: '11',
    title: "Energy",
    artist: "Benjamin Tissot",
    album: "Bensound Electronic",
    coverImage: "https://www.bensound.com/bensound-img/energy.jpg",
    backupImage: "https://via.placeholder.com/300?text=Energy",
    audioUrl: "https://www.bensound.com/bensound-music/bensound-energy.mp3",
    duration: 179,
    genre: "Electronic"
  },
  {
    _id: '12',
    title: "Epic",
    artist: "Benjamin Tissot",
    album: "Bensound Cinematic",
    coverImage: "https://www.bensound.com/bensound-img/epic.jpg",
    backupImage: "https://via.placeholder.com/300?text=Epic",
    audioUrl: "https://www.bensound.com/bensound-music/bensound-epic.mp3",
    duration: 297,
    genre: "Cinematic"
  }
];

// Get music from Jamendo API
export const getMusicFromJamendo = async () => {
  try {
    const response = await axios.get(`${JAMENDO_BASE_URL}/tracks/`, {
      params: {
        client_id: JAMENDO_API_KEY,
        format: 'json',
        limit: 20,
        include: 'musicinfo'
      }
    });

    return response.data.results.map(track => ({
      _id: track.id,
      title: track.name,
      artist: track.artist_name,
      album: track.album_name,
      coverImage: track.image || track.album_image || 'https://via.placeholder.com/300',
      audioUrl: track.audio,
      duration: track.duration,
      genre: track.genre
    }));
  } catch (error) {
    console.error('Error fetching from Jamendo:', error);
    return [];
  }
};

// Get free music sources
export const getFreeMusicSources = () => {
  return Promise.resolve(FREE_MUSIC_SOURCES);
}; 