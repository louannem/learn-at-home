import { useNavigate } from "react-router-dom"

export const ProtectedRoute = ({children}) => {
    let auth = true
    const navigate = useNavigate()

    if(!auth) { navigate("/login")}
    
    return children
}