import React from 'react';
import ReactDOM from 'react-dom';
import App from './App/App';
import AudioProvider from './Contexts/AudioContext';
import MusicProvider from './Contexts/MusicContext';

ReactDOM.render(
  <React.StrictMode>
    <MusicProvider>
      <AudioProvider>
        <App />
      </AudioProvider>
    </MusicProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
