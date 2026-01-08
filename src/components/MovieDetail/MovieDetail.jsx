import { useEffect, useState, useContext } from "react"
import { useParams } from "react-router-dom"
import styles from "./MovieDetail.module.css"
import { WishlistContext } from "../../context/WishlistProvider"

function MovieDetail() {
    const { id } = useParams()

    const API_KEY = import.meta.env.VITE_API_KEY
    const BASE_URL = "https://api.themoviedb.org/3"

    const [movie, setMovie] = useState(null)
    const [actors, setActors] = useState([])

    const { wishlist, addToWishlist, removeFromWishlist } = useContext(WishlistContext)

    useEffect(() => {
        fetchMovie()
        fetchActorsFromMovieId()
    }, [id])

    const fetchMovie = async () => {
        const response = await fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=fr-FR`)
        const data = await response.json()
        setMovie(data)
    }

    const fetchActorsFromMovieId = async () => {
        const response = await fetch(`${BASE_URL}/movie/${id}/credits?api_key=${API_KEY}&language=fr-FR`)
        const data = await response.json()
        if (data.cast) {
            setActors(data.cast.slice(0, 10))
        }
        else {
            setActors([])
        }
    }

    if (movie === null) {
        return <div>Loading...</div>
    }

    const isInWishlist = wishlist.some((item) => item.id === movie.id)

    return (
        <div className={styles.container}>
            <h1>{movie.title}</h1>

            {movie.poster_path && (
                <img src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`} alt={movie.title} />
            )}

            <p>Résumé du film: {movie.overview}</p>
            <p>Le film est sortie le: {movie.release_date}</p>
            <p>Note moyenne du film: {movie.vote_average}⭐</p>

            {isInWishlist ?
                (
                    <button onClick={() => removeFromWishlist(movie)}> Retirer de la wishlist </button>
                ) : (
                    <button onClick={() => addToWishlist(movie)}> Ajouter à la wishlist </button>
                )}

            <h2>Acteurs principaux</h2>
            <p className={styles.actors}>
                {actors.map((actor) => (
                    <p key={actor.id}>
                        L'{actor.gender === 1 ? "actrice" : actor.gender === 2 ? "acteur" : ""} {actor.name} joue le personnage de {actor.character}
                    </p>
                ))}
            </p>
        </div>
    )
}

export default MovieDetail