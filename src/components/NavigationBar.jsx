import { Link, useNavigate } from "react-router-dom"
import { useUserAuth } from "../utils/context/AuthContext"

import logo from "../assets/logo.svg"
import menu from "../assets/menu.svg"
import { BsXLg } from 'react-icons/bs'
import { useState } from "react"

import navbar from "../utils/styles/Navbar.module.css"
import animation from "../utils/styles/animations.module.css"

export const NavigationBar = () => {
    const navigate = useNavigate()
    const { logOut } = useUserAuth()
    const { user } = useUserAuth()

    const [isOpen, setIsOpen] = useState(false)
    const[rollUpDown, setRoll] = useState(0)

    const handleLogout = (e) => {
        e.preventDefault()
        logOut()
        setIsOpen(false)
        navigate("/login")
    }

    const toggleMenu = () => { setIsOpen(!isOpen)}
    const handleAnimation = () => { setRoll(1)}

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
                      
                    <div className={navbar.closeMenu}>
                    {!isOpen ? <img src={menu}  alt="Navigation menu" onClick={() => {toggleMenu(); setRoll(1)}}/>
                    : <BsXLg onClick={() => {toggleMenu(); setRoll(0)}} /> }
                    </div>
                </ul>           
            </nav>

           
            
                <nav className={`${navbar.navbarMenu} ${animation.navbar}`} rolldown={rollUpDown} >
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
                </nav>
               
            </>
        
    )
}