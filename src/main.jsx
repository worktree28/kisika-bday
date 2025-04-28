import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { initBackgroundEffect } from './backgroundEffect.js';

// Initialize the background effect after the component mounts
document.addEventListener('DOMContentLoaded', () => {
  initBackgroundEffect();
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
