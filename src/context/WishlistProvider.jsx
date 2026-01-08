import { createContext, useState } from "react"

export const WishlistContext = createContext(undefined)

export function WishlistProvider({ children }) {
    const [wishlist, setWishlist] = useState([])

    return (
        <WishlistContext.Provider value={{ wishlist }}>
            {children}
        </WishlistContext.Provider>
    )
}