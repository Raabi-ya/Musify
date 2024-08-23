import React from 'react';
import './Login.css';
const Login = () => {
  const handleLogin = () => {
    window.location = `https://accounts.spotify.com/authorize?client_id=a7f13e51112d410692ad6395cec8099e&response_type=token&redirect_uri=http://localhost:3000/callb&scope=user-read-playback-state user-modify-playback-state`;
  };
  
  return (
    <div className="login-container">
      <img src="https://i1.sndcdn.com/avatars-000244590598-ph0i9i-t240x240.jpg" alt="Musify-Logo" className="musify-logo" />
      <button onClick={handleLogin}>Login with Spotify</button>
      <img src="https://cdn.dribbble.com/users/441326/screenshots/3165191/spotify-gif---oliver-keane.gif" alt="Loading" className="login-gif" />
    </div>
  );
};

export default Login;
