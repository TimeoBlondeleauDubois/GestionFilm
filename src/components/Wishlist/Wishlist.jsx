import { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import styles from "./Wishlist.module.css"
import { WishlistContext } from "../../context/WishlistProvider"

function Wishlist() {
    const { wishlist, removeFromWishlist } = useContext(WishlistContext)

    const [filteredMovies, setFilteredMovies] = useState([])
    const [search, setSearch] = useState("")

    useEffect(() => {
        filterMovies()
    }, [search, wishlist])

    const filterMovies = () => {
        if (search && search.trim() !== "") 
        {
            const result = wishlist.filter((movie) =>
                movie.title.toLowerCase().includes(search.toLowerCase())
            )
            setFilteredMovies(result)
        } 
        else 
        {
            setFilteredMovies(wishlist)
        }
    }

    const handleSearch = (e) => {
        setSearch(e.target.value)
    }

    return (
        <div className={styles.container}>
            <h1>Votre Wishlist</h1>
            <input type="text" placeholder="Rechercher un film" value={search} onChange={handleSearch} className={styles.search}/>
            <div className={styles.list}>
                {filteredMovies.length === 0 && (
                    <p>Aucun film dans la wishlist</p>
                )}
                {filteredMovies.map((movie) => (
                    <Link to={`/movie/${movie.id}`}>
                        <div key={movie.id} className={styles.card}>
                            <h2>{movie.title}</h2>
                            {movie.poster_path && (
                                <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt={movie.title}/>
                            )}
                            <p>{movie.vote_average.toFixed(1)}⭐</p>
                            <button onClick={() => removeFromWishlist(movie)}> Supprimer </button>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default Wishlist