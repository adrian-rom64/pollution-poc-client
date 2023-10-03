import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'

import 'jquery-mapael'
import 'jquery-mapael/js/maps/world_countries'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
