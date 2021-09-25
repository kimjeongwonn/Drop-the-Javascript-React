import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App/App';
import AudioProvider from './Contexts/AudioContext';
import { store } from './Reducers';
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
