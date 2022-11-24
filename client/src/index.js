import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import swDev from './swDev';

const root = ReactDOM.createRoot(document.getElementById('root'));
Notification.requestPermission().then(function(result) {
  if (result === 'granted') {
    console.log('Permission granted');
  }
});

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
swDev();