import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Callb = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const hash = window.location.hash;
    const token = new URLSearchParams(hash.substring(1)).get('access_token');

    if (token) {
      window.localStorage.setItem('spotifyAuthToken', token);
      navigate('/home'); // Navigate to HomePage 
    }
  }, [navigate]);

  return <div>Loading...</div>;
};

export default Callb;
