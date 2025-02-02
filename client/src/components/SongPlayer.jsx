import React, { useState, useRef } from 'react';

const SongPlayer = ({ song }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef(null);

    const togglePlay = () => {
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    return (
        <div className="flex items-center space-x-4">
            <button 
                onClick={togglePlay}
                className="bg-green-500 p-2 rounded-full"
            >
                {isPlaying ? '⏸️' : '▶️'}
            </button>
            <audio
                ref={audioRef}
                src={`http://localhost:3000/${song.audioUrl}`}
                onEnded={() => setIsPlaying(false)}
            />
            <div>
                <p className="font-bold">{song.title}</p>
                <p className="text-sm text-gray-400">{song.artist}</p>
            </div>
        </div>
    );
};

export default SongPlayer; 