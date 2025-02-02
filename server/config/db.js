const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Use default MongoDB URI if environment variable is not set
    const mongoURI = "mongodb+srv://phanikumar:phani369@cluster0.eoduv.mongodb.net/SpotifyDatabase?retryWrites=true&w=majority";

    const conn = await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
    
    // Log database and collections
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log('Available collections:', collections.map(c => c.name));
    
  } catch (error) {
    console.error('MongoDB Connection Error:', error);
    process.exit(1);
  }
};

module.exports = connectDB;
