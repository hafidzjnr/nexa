// src/main.jsx
// Entry point for the React application. Renders the App component into
// the root DOM element. Also imports global styles.

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './styles/globals.css'
import './styles/animations.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)