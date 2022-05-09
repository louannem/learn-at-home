import { Link, useNavigate } from "react-router-dom"
import { useUserAuth } from "../utils/context/AuthContext"
import navbar from "../utils/styles/Navbar.module.css"
import logo from "../assets/logo.svg"
import menu from "../assets/menu.svg"
import { BsXLg } from 'react-icons/bs'
import { useState } from "react"

export const NavigationBar = () => {
    const navigate = useNavigate()
    const { logOut } = useUserAuth()
    const { user } = useUserAuth()

    const [isOpen, setIsOpen] = useState(false)

    const handleLogout = (e) => {
        e.preventDefault()
        logOut()
        setIsOpen(false)
        navigate("/login")
    }

    const toggleMenu = () => { setIsOpen(!isOpen)}

    return(
        <>

            <nav className={navbar.navbar}>
                <Link to="/"><img src={logo} alt="Learn@Home logo" className={navbar.logo} /></Link>

                
                <ul className={navbar.navbarLinks}>
                    {user &&   
                    <Link to="/update-profile">
                        <img src={user.photoURL} alt="User profile" className={navbar.userPhoto} />
                        <span>{user.displayName}</span>
                    </Link> }
                      
                    {!isOpen ? <img src={menu}  alt="Navigation menu" onClick={toggleMenu} /> 
                    : <div className={navbar.closeMenu}><BsXLg onClick={toggleMenu} /></div> }
                </ul>           
            </nav>


            {isOpen &&
                <div className={navbar.navbarMenu}>
                    <ul>
                       {user ? 
                       <>
                        <Link to="/new-room"><li>New room</li></Link>
                        <Link to="/login"><li onClick={handleLogout}>Logout</li></Link>
                       </> 

                       :

                       <>
                        <Link to="/signup"><li>Sign up</li></Link>
                        <Link to="/login"><li>Login</li></Link>
                       </>
                        }
                    </ul>
                </div>
               }
            </>
        
    )
}