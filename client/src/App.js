import React, { useState, useEffect } from 'react';
import socketIOClient from 'socket.io-client';

const ENDPOINT = 'http://127.0.0.1:5000';  // Update with your Flask server endpoint

const App = () => {
  const [predictionText, setPredictionText] = useState('');

  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);
  
    socket.on('connect', () => {
      console.log('Connected to server');
    });
  
    socket.on('sentence', data => {
      console.log(data.sentence);
      setPredictionText(data.sentence.toString());
    });
  
    socket.on('disconnect', () => {
      console.log('Disconnected from server');
    });
  
    return () => {
      socket.disconnect();
    };
  }, []);  

  return (
    <div>
      <img src="http://127.0.0.1:5000/video_feed" alt="Prediction" />
      <pre>{predictionText}</pre>
    </div>
  );
};

export default App;
