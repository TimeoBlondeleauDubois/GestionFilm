import { Link, useLocation } from "react-router-dom"
import { useContext, useEffect, useRef, useState } from "react"
import styles from "./Navbar.module.css"
import { WishlistContext } from "../../context/WishlistProvider"

function Navbar() {
  const { wishlist } = useContext(WishlistContext)

  const location = useLocation()

  const navRef = useRef(null)

  const [indicatorStyle, setIndicatorStyle] = useState({})
  const [indicatorPath, setIndicatorPath] = useState(null)
  const [isVisible, setIsVisible] = useState(false)

  const validPaths = ["/", "/wishlist"]

  useEffect(() => {
    updateIndicatorFromRoute()
  }, [location.pathname])

  const updateIndicatorFromRoute = () => {
    if (!validPaths.includes(location.pathname)) {
      setIsVisible(false)
      setIndicatorPath(null)
      return
    }

    moveIndicator(location.pathname)
    setIndicatorPath(location.pathname)
    setIsVisible(true)
  }

  const moveIndicator = (path) => {
    const nav = navRef.current
    if (nav === null) {
      return
    } 

    const link = nav.querySelector(`[data-path="${path}"]`)
    if (link === null) {
      return
    } 

    const rect = link.getBoundingClientRect()
    const navRect = nav.getBoundingClientRect()

    setIndicatorStyle({
      width: rect.width + "px",
      left: rect.left - navRect.left + "px"
    })
  }

  const handleMouseLeave = () => {
    if (validPaths.includes(location.pathname)) {
      updateIndicatorFromRoute()
    } 
    else {
      setIsVisible(false)
      setIndicatorPath(null)
    }
  }

  return (
    <nav className={styles.nav}>
      <div className={styles.navInner} ref={navRef} onMouseLeave={handleMouseLeave}>
        <div className={`${styles.indicator} ${isVisible ? styles.popIn : styles.popOut}`} style={indicatorStyle}></div>
        <Link to="/" data-path="/" className={`${styles.link} ${indicatorPath === "/" ? styles.active : ""}`} onMouseEnter={() => 
        {
          moveIndicator("/")
          setIndicatorPath("/")
          setIsVisible(true)
        }}> Home </Link>
        <Link to="/wishlist" data-path="/wishlist" className={`${styles.link} ${indicatorPath === "/wishlist" ? styles.active : ""}`} onMouseEnter={() => {
          moveIndicator("/wishlist")
          setIndicatorPath("/wishlist")
          setIsVisible(true)
        }}> Wishlist ({wishlist.length}) </Link>
      </div>
    </nav>
  )
}

export default Navbar