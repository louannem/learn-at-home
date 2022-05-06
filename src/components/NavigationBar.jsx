import { Link, useNavigate } from "react-router-dom"
import { useUserAuth } from "../utils/context/AuthContext"
import navbar from "../utils/styles/Navbar.module.css"

export const NavigationBar = () => {
    const navigate = useNavigate()
    const { logOut } = useUserAuth()
    const { user } = useUserAuth()

    const handleLogout = (e) => {
        e.preventDefault()
        logOut()
        navigate("/login")
    }
    return(
        <nav className={navbar.navbar}>
            <img alt="Learn@Home logo" />

            
               {user && 
               <ul className={navbar.navbarLinks}>
                    <Link to="/update-profile"><img src={user.photoURL} alt="User profile" className={navbar.userPhoto} /></Link>
                    <li onClick={handleLogout}>Logout</li>
               </ul>
               }
            
        </nav>
    )
}