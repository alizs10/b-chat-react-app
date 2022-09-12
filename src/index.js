import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import BChat from './BChat';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BChat />
    </Provider>
  </React.StrictMode>
);

