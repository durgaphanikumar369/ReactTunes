import React, { useState, useEffect } from 'react';
import SongCard from './SongCard';
import Loading from '../Common/Loading';
import { getMusicFromJamendo, getFreeMusicSources } from '../../services/musicApi';
import { preloadImages } from '../../utils/imageLoader';
import './SongList.css';

const SongList = () => {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        setLoading(true);
        // Try to fetch from Jamendo first
        let musicTracks = await getMusicFromJamendo();
        
        // If Jamendo fails, use free music sources
        if (!musicTracks.length) {
          musicTracks = await getFreeMusicSources();
        }

        // Preload images
        await preloadImages(musicTracks);

        setSongs(musicTracks);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching songs:', err);
        setError('Failed to load songs');
        setLoading(false);
      }
    };

    fetchSongs();
  }, []);

  if (loading) return <Loading />;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="songs-container">
      <h2>Popular Songs</h2>
      <div className="song-list">
        {songs.map(song => (
          <SongCard key={song._id} song={song} />
        ))}
      </div>
    </div>
  );
};

export default SongList;