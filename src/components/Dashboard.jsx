import { useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import dashboard from "../utils/styles/Dashboard.module.css"

export const Dashboard = ({user}) => {
    const navigate = useNavigate()

    useEffect(() => {
        if(user === null) { navigate('/login')}
    }, [user, navigate])

    return(
        <>
            <section className={dashboard.section}>
                <img src={user.photoURL} alt="User profile" className={dashboard.userProfile} />
                <strong>Email : </strong> {user.email}<br/>
                <strong>Username : </strong> {user.displayName || "N/A"}<br/>
            </section>
            <Link to="/update-profile" className={dashboard.ctaButton}>Update profile</Link>
        </>
    )
}