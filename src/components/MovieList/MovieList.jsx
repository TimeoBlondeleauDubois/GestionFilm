import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import styles from "./MovieList.module.css"

function MovieList() {
    const API_KEY = import.meta.env.VITE_API_KEY
    const BASE_URL = "https://api.themoviedb.org/3"

    const [movies, setMovies] = useState([])
    const [category, setCategory] = useState("popular")
    const [search, setSearch] = useState("")
    const [page, setPage] = useState(1)

    useEffect(() => {
        fetchMovies()
    }, [category, search, page])

    const fetchMovies = async () => {
        let url = `${BASE_URL}/movie/${category}?api_key=${API_KEY}&language=fr-FR&page=${page}`

        if (search && search.trim() !== "") {
            url = `${BASE_URL}/search/movie?api_key=${API_KEY}&language=fr-FR&query=${search}&page=${page}`
        }

        const response = await fetch(url)
        const data = await response.json()
        setMovies(data.results || [])
    }

    const handleSearch = (e) => {
        setSearch(e.target.value)
        setPage(1)
    }

    const changeCategory = (newCategory) => {
        setCategory(newCategory)
        setPage(1)
    }

    return (
        <div className={styles.container}>
            <h1>Liste de films</h1>
            <div className={styles.categories}>
                <button onClick={() => changeCategory("now_playing")}>Now Playing</button>
                <button onClick={() => changeCategory("popular")}>Popular</button>
                <button onClick={() => changeCategory("top_rated")}>Top Rated</button>
                <button onClick={() => changeCategory("upcoming")}>Upcoming</button>
            </div>
            <input type="text" placeholder="Rechercher un film" value={search} onChange={handleSearch} className={styles.search}/>
            <div className={styles.list}>
                {movies.map((movie) => (
                    <Link key={movie.id} to={`/movie/${movie.id}`}>
                        <div className={styles.card}>
                            <h3>{movie.title}</h3>
                            {movie.poster_path && (
                                <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt={movie.title}/>
                            )}
                            <p>{movie.vote_average}⭐</p>
                        </div>
                    </Link>
                ))}
            </div>
            <div className={styles.pagination}>
                <button onClick={() => setPage(page - 1)} disabled={page === 1} > Précédent </button>
                <span>Page {page} </span>
                <button onClick={() => setPage(page + 1)}> Suivant </button>
            </div>
        </div>
    )
}

export default MovieList