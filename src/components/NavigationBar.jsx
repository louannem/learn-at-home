import { Link, useNavigate } from "react-router-dom"
import { useUserAuth } from "../utils/context/AuthContext"
import navbar from "../utils/styles/Navbar.module.css"
import logo from "../assets/logo.svg"

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
            <Link to="/"><img src={logo} alt="Learn@Home logo" className={navbar.logo} /></Link>

            
               {user && 
               <ul className={navbar.navbarLinks}>
                    <Link to="/update-profile"><img src={user.photoURL} alt="User profile" className={navbar.userPhoto} /></Link>
                    <Link to="/"><li>New room</li></Link>
                    <Link to="/login"><li onClick={handleLogout}>Logout</li></Link>
               </ul>
               }
            
        </nav>
    )
}