const multer = require('multer');
const path = require('path');

// Configure storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.fieldname === "audio") {
      cb(null, 'uploads/songs/');
    } else if (file.fieldname === "coverImage") {
      cb(null, 'uploads/images/');
    }
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

// File filter
const fileFilter = (req, file, cb) => {
  if (file.fieldname === "audio") {
    if (file.mimetype === "audio/mpeg" || file.mimetype === "audio/mp3") {
      cb(null, true);
    } else {
      cb(new Error("Invalid audio file type"), false);
    }
  } else if (file.fieldname === "coverImage") {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Invalid image file type"), false);
    }
  }
};

// Create multer upload instance with increased file size limits
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 30 * 1024 * 1024, // 30MB limit for audio files
    files: 2 // Allow 2 files (audio and cover image)
  }
});

module.exports = upload;
