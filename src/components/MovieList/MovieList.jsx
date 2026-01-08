import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import styles from "./MovieList.module.css"

function MovieList() {
    const API_KEY = import.meta.env.VITE_API_KEY
    const BASE_URL = "https://api.themoviedb.org/3"

    const [movies, setMovies] = useState([])
    const [category, setCategory] = useState("popular")
    const [search, setSearch] = useState("")

    useEffect(() => {
        fetchMovies()
    }, [category, search])

    const fetchMovies = async () => {
        let url = `${BASE_URL}/movie/${category}?api_key=${API_KEY}&language=fr-FR`

        if (search && search.trim() !== "") {
            url = `${BASE_URL}/search/movie?api_key=${API_KEY}&language=fr-FR&query=${search}`
        }

        const response = await fetch(url)
        const data = await response.json()
        setMovies(data.results || [])
    }

    const handleSearch = (e) => {
        setSearch(e.target.value)
    }

    return (
        <div className={styles.container}>
            <h1>Liste de films</h1>
            <div className={styles.categories}>
                <button onClick={() => setCategory("now_playing")}>Now Playing</button>
                <button onClick={() => setCategory("popular")}>Popular</button>
                <button onClick={() => setCategory("top_rated")}>Top Rated</button>
                <button onClick={() => setCategory("upcoming")}>Upcoming</button>
            </div>
            <input type="text" placeholder="Rechercher un film" value={search} onChange={handleSearch} className={styles.search}/>
            <div className={styles.list}>
                {movies.map((movie) => (
                    <div key={movie.id} className={styles.card}>
                        <h3>{movie.title}</h3>
                        {movie.poster_path && (
                            <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt={movie.title}/>
                        )}
                        <p>⭐ {movie.vote_average}</p>
                        <Link to={`/movie/${movie.id}`}>
                            <button>Voir les détails</button>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default MovieList