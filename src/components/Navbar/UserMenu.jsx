import { Link, useNavigate } from "react-router-dom"
import { useUserAuth } from "../../utils/context/AuthContext"
import userMenu from "../../utils/styles/UserMenu.module.css"

export const UserMenu = () => {
    const navigate = useNavigate()
    const { logOut } = useUserAuth()

    const handleLogout = (e) => {
        e.preventDefault()
        logOut()
        navigate("/login")
    }

    return(
        <div className={userMenu.wrapper}>
            <ul>
                <li><Link to='/update-profile'>Update profile</Link></li>
                <li onClick={handleLogout}><Link to="/login">Logout</Link></li>
            </ul>
        </div>
    )
}