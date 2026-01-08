import { createContext, useEffect, useState } from "react"

export const WishlistContext = createContext(undefined)

export function WishlistProvider({ children }) {
    const [wishlist, setWishlist] = useState([])
    const savedWishlist = localStorage.getItem("wishlist")

    useEffect(() => {
        if (savedWishlist !== null) {
            setWishlist(JSON.parse(savedWishlist))
        }
    }, [])

    useEffect(() => {
        localStorage.setItem("wishlist", JSON.stringify(wishlist))
    }, [wishlist])

    const addToWishlist = (movie) => {
        let exists = false

        for (let i = 0; i < wishlist.length; i++) {
            if (wishlist[i].id === movie.id) {
                exists = true
            }
        }

        if (exists === false) {
            const newWishlist = wishlist.concat(movie)
            setWishlist(newWishlist)
        }
    }

    const removeFromWishlist = (movie) => {
        const newWishlist = []

        for (let i = 0; i < wishlist.length; i++) {
            if (wishlist[i].id !== movie.id) {
                newWishlist.push(wishlist[i])
            }
        }

        setWishlist(newWishlist)
    }

    return (
        <WishlistContext.Provider value={{wishlist: wishlist, addToWishlist: addToWishlist, removeFromWishlist: removeFromWishlist}}>
            {children}
        </WishlistContext.Provider>
    )
}