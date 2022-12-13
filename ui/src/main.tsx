import React from 'react'
import ReactDOM from 'react-dom/client'
import { AppStore } from './AppStore'
import './index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AppStore />
  </React.StrictMode>,
)
