import React, { useContext } from 'react';
import { PlayerContext } from '../../context/PlayerContext';
//import './Controls.css';

const Controls = () => {
  const { isPlaying, togglePlay } = useContext(PlayerContext);

  return (
    <div className="controls">
      <button className="prev">
        <i className="fas fa-backward"></i>
      </button>
      <button className="play" onClick={togglePlay}>
        <i className={`fas ${isPlaying ? 'fa-pause' : 'fa-play'}`}></i>
      </button>
      <button className="next">
        <i className="fas fa-forward"></i>
      </button>
    </div>
  );
};

export default Controls;