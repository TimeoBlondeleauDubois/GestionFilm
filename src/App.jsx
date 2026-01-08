import './App.css'
import MovieList from './components/MovieList/MovieList'
import MovieDetail from './components/MovieDetail/MovieDetail'
import Wishlist from './components/Wishlist/Wishlist'
import Navbar from './components/Navbar/Navbar'
import { BrowserRouter, Routes, Route } from 'react-router'

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<MovieList />} />
        <Route path="/movie/:id" element={<MovieDetail />} />
        <Route path="/wishlist" element={<Wishlist />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App