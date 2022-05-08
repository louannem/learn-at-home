import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Dashboard } from "../components/Dashboard/Dashboard"
import { RoomsCollection } from "../components/Dashboard/RoomsCollection"
import { useUserAuth } from "../utils/context/AuthContext"
import dashboard from "../utils/styles/Dashboard.module.css"

export const Home = () => {
    let { user } = useUserAuth()
    const navigate = useNavigate()

    useEffect(() => {
        if(user === null) {
            navigate("/login")
        }
    }, [user, navigate])
        
    return(
        user && 
        <section className={dashboard.wrapper}>
            <h1>Welcome <i>{user.displayName || user.email}</i> !</h1>
            <Dashboard user={user} />
            <RoomsCollection user={user} />
        </section>           
    )
}