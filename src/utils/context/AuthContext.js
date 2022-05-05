import React, { useContext, useState } from "react"

const AuthContext = React.createContext()

//Hook to access context
export function useAuth() {
    return useContext(AuthContext)
}

//Context provider
export const AuthProvider = ({children}) => {
    //No user by default
    const [currentUser, setCurrentUser ] = useState()
    
    //Context data/info
    const value = {
        currentUser
    }
    return(
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
} 