import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BusApp } from './BusApp.tsx'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <BusApp />
    </BrowserRouter>
  </StrictMode>,
)
