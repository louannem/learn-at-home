import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Dashboard } from "../components/Dashboard/Dashboard"
import { InviteCard } from "../components/Dashboard/Invites"
import { RoomsCollection } from "../components/Dashboard/RoomsCollection"
import { useUserAuth } from "../utils/context/AuthContext"
import dashboard from "../utils/styles/pages/Dashboard.module.css"

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
            <Dashboard user={user} />
            <section className={dashboard.content}>
                <RoomsCollection user={user} showTextLine={true} />
                <InviteCard />
            </section>
            
            
        </section>           
    )
}