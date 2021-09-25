import React from 'react';
import ReactDOM from 'react-dom';
import App from './App/App';
import AudioProvider from './Contexts/AudioContext';
import MusicProvider from './Contexts/MusicContext';
import PageProvider from './Contexts/PageContext';
import './Styles/global.scss';

ReactDOM.render(
  <React.StrictMode>
    <MusicProvider>
      <AudioProvider>
        <PageProvider>
          <App />
        </PageProvider>
      </AudioProvider>
    </MusicProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
