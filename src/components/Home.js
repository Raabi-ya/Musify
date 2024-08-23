import React, { useState, useEffect } from 'react';
import './Home.css';

import song1 from '../music/song1.mp3';
import song2 from '../music/song2.mp3';
import song3 from '../music/song3.mp3';

import { getNextProxy } from '../proxyManager'; 

const spotifyLogoPath = '/spotifylogo.png';

const initialPlaylists = [
  {
    id: 1,
    name: 'Top 2023 Wrapped',
    image: 'https://storage.googleapis.com/pr-newsroom-wp/1/2023/11/LOCKUP-LAVENDER.jpg',
    songs: [
      { name: '  1. Espresso - Sabrina Carpenter', url: song1, albumPic:'https://images.genius.com/f8d1d714034d97ace5e4884bb320a60e.1000x1000x1.png' },
      { name: '  2. Cruel Summer - Taylor Swift', url: song2, albumPic:'https://upload.wikimedia.org/wikipedia/en/thumb/c/cd/Taylor_Swift_-_Lover.png/220px-Taylor_Swift_-_Lover.png' },
      { name: '  3. Stay - The Kid LAROI, Justin Bieber', url: song3, albumPic: 'https://cdns-images.dzcdn.net/images/cover/dd6fe7fa9267185c4b835bd4f155d1d2/1900x1900-000000-80-0-0.jpg' }
    ]
  },
  {
    id: 2,
    name: 'Summer Hits',
    image: 'https://storage.googleapis.com/pr-newsroom-wp/1/2022/08/FTR_SongsOfSummer-Header_V2.jpg', 
    songs: [
      { name: '  1. Cruel Summer - Taylor Swift', url: song2, albumPic:'https://upload.wikimedia.org/wikipedia/en/thumb/c/cd/Taylor_Swift_-_Lover.png/220px-Taylor_Swift_-_Lover.png' },
      { name: '  2. Stay - The Kid LAROI, Justin Bieber', url: song3, albumPic: 'https://cdns-images.dzcdn.net/images/cover/dd6fe7fa9267185c4b835bd4f155d1d2/1900x1900-000000-80-0-0.jpg' },
      { name: '  3. Espresso - Sabrina Carpenter', url: song1, albumPic:'https://images.genius.com/f8d1d714034d97ace5e4884bb320a60e.1000x1000x1.png'}
    ]
  },
  {
    id: 3,
    name: 'Trending Songs',
    image: 'https://storage.googleapis.com/pr-newsroom-wp/1/2023/02/23SSO_STREAM_ON-Logo_NoQR_3K-300x153.jpg', 
    songs: [
      { name: '  1. Stay - The Kid LAROI, Justin Bieber', url: song3, albumPic: 'https://cdns-images.dzcdn.net/images/cover/dd6fe7fa9267185c4b835bd4f155d1d2/1900x1900-000000-80-0-0.jpg' },
      { name: '  2. Espresso - Sabrina Carpenter', url: song1, albumPic:'https://images.genius.com/f8d1d714034d97ace5e4884bb320a60e.1000x1000x1.png' },
      { name: '  3. Cruel Summer - Taylor Swift', url: song2, albumPic:'https://upload.wikimedia.org/wikipedia/en/thumb/c/cd/Taylor_Swift_-_Lover.png/220px-Taylor_Swift_-_Lover.png' }
    ]
  }
];

const Home = () => {
  const [playlists, setPlaylists] = useState(initialPlaylists);
  const [activePlaylist, setActivePlaylist] = useState(null);
  const [currentSong, setCurrentSong] = useState(null);
  const [currentSongName, setCurrentSongName] = useState(null);
  const [currentSongPic, setCurrentSongPic] = useState(null);
  const [currentProxyIP, setCurrentProxyIP] = useState(null);
  const [currentProxyLocation, setCurrentProxyLocation] = useState(null);
  
  useEffect(() => {
    if (currentSong) {
      const audioPlayer = document.getElementById('audioPlayer');
      audioPlayer.load(); 
      audioPlayer.play();
    }
  }, [currentSong]);

  const handleClick = (id) => {
    setActivePlaylist(id);
    setCurrentSong(null); 
    setCurrentSongName(null);
    setCurrentSongPic(null);
  };

  const handleHomeClick = () => {
    setActivePlaylist(null);
    setCurrentSong(null); 
    setCurrentSongName(null);
    setCurrentSongPic(null);
  };

  const handlePlaySong = (song) => {
    const proxy = getNextProxy();

    setCurrentSong(song.url); 
    setCurrentSongName(song.name); 
    setCurrentSongPic(song.albumPic); 
    setCurrentProxyIP(proxy.ip);
    setCurrentProxyLocation(proxy.location);

  };

  return (
    <div className="home">
      <div className="sidebar">
      <div className="spotify-logo-container">
          <img src={spotifyLogoPath} alt="Spotify Logo" className="spotify-logo" />
        </div>
        <ul>
          <li onClick={handleHomeClick}> 🏠︎ Home</li>
          <li> ⌕ Search</li>
          <li> ☰ Your Library</li>
        </ul>
        {currentSong && (
          <div className="now-playing-sidebar">
            <h4>Now Playing</h4>
            <img src={currentSongPic} alt="Album" className="album-pic-sidebar" />
            <p>{currentSongName}</p>
            {currentProxyIP && (
              <div className="proxy-info">
                <p>Proxy IP: {currentProxyIP}</p>
                <p>Location: {currentProxyLocation}</p>
              </div>
            )}
          </div>
        )}
      </div>
      <div className="content">
        {activePlaylist === null ? (
          playlists.map(playlist => (
            <div
              key={playlist.id}
              className="playlist"
              onClick={() => handleClick(playlist.id)}
            >
              <img src={playlist.image} alt={playlist.name} />
              <h3>{playlist.name}</h3>
            </div>
          ))
        ) : (
          playlists
            .filter(playlist => playlist.id === activePlaylist)
            .map(playlist => (
              <div
                key={playlist.id}
                className="playlist active"
              >
                <img src={playlist.image} alt={playlist.name} />
                <h3>{playlist.name}</h3>
                <ul>
                  {playlist.songs.map((song, index) => (
                    <li key={index} onClick={() => handlePlaySong(song)}
                    className={currentSong === song.url ? 'active' : ''}
                    >
                      <img src={song.albumPic} alt="Album" className="album-pic" /> 
                      <span className="song-name">{song.name}</span>
                       
                    </li>
                  ))}
                </ul>
                {currentSong && (
                  <audio id="audioPlayer" controls autoPlay>
                    <source src={currentSong} type="audio/mpeg" />
                    Your browser does not support the audio element.
                  </audio>
                )}
              </div>
            ))
        )}
      </div>
    </div>
  );
};

export default Home;
