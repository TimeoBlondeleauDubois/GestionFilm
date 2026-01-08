import { Link } from "react-router"
import { useContext } from "react"
import styles from "./Navbar.module.css"
import { WishlistContext } from "../../context/WishlistProvider"

function Navbar() {
  const { wishlist } = useContext(WishlistContext)

  return (
    <nav className={styles.nav}>
      <Link to="/" className={styles.link}>Home</Link>

      <Link to="/wishlist" className={styles.link}>
        Wishlist ({wishlist.length})
      </Link>
    </nav>
  )
}

export default Navbar