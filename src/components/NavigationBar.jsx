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
        closeMenu()
        navigate("/login")
    }

    const toggleMenu = () => { setIsOpen(!isOpen)}

    const closeMenu = () => {
        toggleMenu()
        if(rollUpDown === 1) {
             setRoll(0)
        } else {
            setRoll(1)
        }
       
    }

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
                      
                    <li className={navbar.closeMenu}  onClick={closeMenu}>
                    {!isOpen ? 
                        <img src={menu}  alt="Navigation menu"/>
                    :   <BsXLg  /> }
                    </li>
                    
                </ul>           
            </nav>

           
            
                <nav className={`${navbar.navbarMenu} ${animation.navbar}`} rolldown={rollUpDown} >
                    <ul>
                       {user ? 
                       <>
                        <li onClick={closeMenu}><Link to="/new-room">New room</Link></li>
                        <li onClick={handleLogout}><Link to="/login">Logout</Link></li>
                       </> 

                       :

                       <>
                        <li><Link to="/signup">Sign up</Link></li>
                        <li><Link to="/login">Login</Link></li>
                       </>
                        }
                    </ul>
                </nav>
               
            </>
        
    )
}