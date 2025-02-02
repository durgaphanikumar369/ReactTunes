import React from 'react';
import './Sidebar.css';

const Sidebar = () => {
  const menuItems = [
    { icon: 'fa-home', label: 'Home', active: true },
    { icon: 'fa-search', label: 'Search' },
    { icon: 'fa-book', label: 'Your Library' },
    { icon: 'fa-plus-square', label: 'Create Playlist' },
    { icon: 'fa-heart', label: 'Liked Songs' }
  ];

  return (
    <div className="sidebar">
      <div className="logo">
        <img src="/logo.png" alt="Spotify Clone" />
      </div>
      <nav>
        <ul>
          {menuItems.map((item, index) => (
            <li key={index} className={item.active ? 'active' : ''}>
              <i className={`fas ${item.icon}`}></i>
              {item.label}
            </li>
          ))}
        </ul>
      </nav>
      <div className="sidebar-footer">
        <div className="install-app">
          <i className="fas fa-arrow-circle-down"></i>
          Install App
        </div>
      </div>
    </div>
  );
};

export default Sidebar;