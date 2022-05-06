import { Link } from "react-router-dom"
import dashboard from "../utils/styles/Dashboard.module.css"

export const Dashboard = ({user}) => {

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