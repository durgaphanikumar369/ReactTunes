import React, { useContext, useState } from 'react';
import { PlayerContext } from '../../context/PlayerContext';
import defaultCover from '../../assets/images/default-album.png';
import './SongCard.css';

const SongCard = ({ song }) => {
  const { currentSong, isPlaying, playSong } = useContext(PlayerContext);
  const [isHovered, setIsHovered] = useState(false);
  const [imageError, setImageError] = useState(false);

  const isCurrentSong = currentSong?._id === song._id;

  const handlePlay = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await playSong(song);
    } catch (error) {
      console.error('Error playing song:', error);
    }
  };

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div 
      className="song-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="song-image-container">
        <img 
          src={imageError ? defaultCover : song.coverImage}
          alt={song.title}
          className={isHovered ? 'dimmed' : ''}
          onError={handleImageError}
        />
        <button 
          className={`play-button ${isHovered ? 'visible' : ''}`}
          onClick={handlePlay}
        >
          <i className={`fas ${isCurrentSong && isPlaying ? 'fa-pause' : 'fa-play'}`} />
        </button>
      </div>
      <div className="song-info">
        <h3>{song.title}</h3>
        <p>{song.artist}</p>
      </div>
    </div>
  );
};

export default SongCard;