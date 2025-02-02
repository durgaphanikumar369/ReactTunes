import React, { useContext, useRef, useEffect } from 'react';
import { PlayerContext } from '../../context/PlayerContext';
import './Player.css';

const Player = () => {
  const { 
    currentSong, 
    isPlaying, 
    progress, 
    togglePlay,
    audioRef,
    setProgress 
  } = useContext(PlayerContext);
  
  const progressBarRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;

    const handleError = (e) => {
      console.error('Audio playback error:', e);
      // Handle error appropriately
    };

    audio.addEventListener('error', handleError);
    
    return () => {
      audio.removeEventListener('error', handleError);
    };
  }, [audioRef]);

  if (!currentSong) return null;

  const handleProgressClick = (e) => {
    const progressBar = progressBarRef.current;
    const rect = progressBar.getBoundingClientRect();
    const clickPosition = e.clientX - rect.left;
    const progressBarWidth = rect.width;
    const percentage = (clickPosition / progressBarWidth) * 100;
    
    // Update audio time
    const newTime = (percentage / 100) * audioRef.current.duration;
    audioRef.current.currentTime = newTime;
    setProgress(percentage);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="player">
      <div className="song-info">
        <img src={currentSong.coverPath} alt={currentSong.title} />
        <div>
          <h4>{currentSong.title}</h4>
          <p>{currentSong.artist}</p>
        </div>
        <button className="like-button">
          <i className="far fa-heart"></i>
        </button>
      </div>
      
      <div className="player-controls">
        <div className="control-buttons">
          <button className="shuffle">
            <i className="fas fa-random"></i>
          </button>
          <button className="previous">
            <i className="fas fa-step-backward"></i>
          </button>
          <button className="play" onClick={togglePlay}>
            <i className={`fas ${isPlaying ? 'fa-pause' : 'fa-play'}`}></i>
          </button>
          <button className="next">
            <i className="fas fa-step-forward"></i>
          </button>
          <button className="repeat">
            <i className="fas fa-redo"></i>
          </button>
        </div>
        
        <div className="progress-container">
          <span className="time current">
            {formatTime(audioRef.current.currentTime)}
          </span>
          <div 
            className="progress-bar" 
            ref={progressBarRef}
            onClick={handleProgressClick}
          >
            <div 
              className="progress" 
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="time total">
            {formatTime(audioRef.current.duration || 0)}
          </span>
        </div>
      </div>

      <div className="volume-controls">
        <button className="volume">
          <i className="fas fa-volume-up"></i>
        </button>
        <div className="volume-bar">
          <div className="volume-level" style={{ width: '70%' }}></div>
        </div>
      </div>
    </div>
  );
};

export default Player;