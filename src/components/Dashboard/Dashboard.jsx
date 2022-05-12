import { useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import dashboard from "../../utils/styles/Dashboard.module.css"

export const Dashboard = ({user}) => {
    const navigate = useNavigate()

    useEffect(() => {
        if(user === null) { navigate('/login')}
    }, [user, navigate])

    return(
        <>
            <section className={dashboard.section}>
                <h1>Welcome <i>{user.displayName} !</i></h1>
                <img src={user.photoURL} alt="User profile" className={dashboard.userProfile} />
            </section>
        </>
    )
}