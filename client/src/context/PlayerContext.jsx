import React, { createContext, useState, useRef, useEffect } from 'react';

export const PlayerContext = createContext();

export const PlayerProvider = ({ children }) => {
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef(new Audio());

  const playAudio = async () => {
    try {
      if (!audioRef.current.src) {
        throw new Error('No audio source provided');
      }
      
      // Pre-load the audio
      await audioRef.current.load();
      await audioRef.current.play();
      setIsPlaying(true);
    } catch (error) {
      console.error("Playback failed:", error);
      setIsPlaying(false);
    }
  };

  const playSong = async (song) => {
    if (currentSong?._id === song._id) {
      togglePlay();
      return;
    }

    audioRef.current.pause();
    setIsPlaying(false);
    setCurrentSong(song);
    
    // Use the direct audioUrl from the song object
    audioRef.current.src = song.audioUrl;
    
    await playAudio();
  };

  const togglePlay = async () => {
    if (!currentSong) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      await playAudio();
    }
  };

  useEffect(() => {
    const audio = audioRef.current;

    const handleTimeUpdate = () => {
      const progress = (audio.currentTime / audio.duration) * 100;
      setProgress(progress || 0);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setProgress(0);
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('ended', handleEnded);
    };
  }, []);

  const value = {
    currentSong,
    isPlaying,
    progress,
    playSong,
    togglePlay,
    audioRef,
    setProgress
  };

  return (
    <PlayerContext.Provider value={value}>
      {children}
    </PlayerContext.Provider>
  );
};