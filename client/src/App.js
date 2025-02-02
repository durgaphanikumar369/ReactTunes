import React from 'react';
import { PlayerProvider } from './context/PlayerContext';
import Sidebar from './components/Layout/Sidebar';
import Player from './components/Player/Player';
import SongList from './components/Songs/SongList';
import './App.css';

function App() {
  return (
    <PlayerProvider>
      <div className="app">
        <Sidebar />
        <main className="main-content">
          <div className="content-header">
            <div className="header-gradient"></div>
            <h1>Welcome to Spotify Clone</h1>
          </div>
          <SongList />
        </main>
        <Player />
      </div>
    </PlayerProvider>
  );
}

export default App;