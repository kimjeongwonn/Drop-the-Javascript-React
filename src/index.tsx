import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { store } from './Reducers';
import App from './App/App';
import AudioProvider from './Contexts/AudioContext';
import './Styles/global.scss';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <AudioProvider>
        <App />
      </AudioProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
