import React from 'react';
import ReactDOM from 'react-dom';
import App from './App/App';
import MusicProvider from './Contexts/MusicContext';

ReactDOM.render(
  <React.StrictMode>
    <MusicProvider>
      <App />
    </MusicProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
