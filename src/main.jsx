import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { WishlistProvider } from './context/WishlistProvider'

createRoot(document.getElementById('root')).render(
  <WishlistProvider>
    <App />
  </WishlistProvider>,
)