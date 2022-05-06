import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Dashboard } from "../components/Dashboard"
import { useUserAuth } from "../utils/context/AuthContext"
import dashboard from "../utils/styles/Dashboard.module.css"

export const Home = ( ) => {
    let { user } = useUserAuth()
    const navigate = useNavigate()    
   

    useEffect(() => {
        if(user === null) {  navigate("/login")}
    }, [user, navigate])
    
    return(
        <section className={dashboard.wrapper}>
            <h1>Welcome {user.displayName || user.email} !</h1>
            {user && <Dashboard user={user} />}
        </section>
        
    )
}