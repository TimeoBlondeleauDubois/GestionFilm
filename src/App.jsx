import './App.css'
import MovieList from './components/MovieList/MovieList'
import { BrowserRouter, Routes, Route, Link } from 'react-router'
import MovieDetail from './components/MovieDetail/MovieDetail'
import Wishlist from './components/Wishlist/Wishlist'

function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/wishlist">Wishlist</Link>
      </nav>
      <Routes>
        <Route path="/" element={<MovieList />} />
        <Route path="/movie/:id" element={<MovieDetail />} />
        <Route path="/wishlist" element={<Wishlist />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App