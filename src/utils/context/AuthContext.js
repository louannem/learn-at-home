import React, { useContext, useEffect, useState } from "react"
import { auth } from "../firebase"

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
        currentUser,
        signup
    }

    /**
     * Funtion to create a user with an email + password
     * returns a promise
     */
    function signup(email, password) {
        return auth.createUserWithEmailAndPassword(email, password)
    }



    useEffect(() => {
        //Change current user on authentification 
        //In useEffect so it only runs once
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
        })

        return unsubscribe
    },[])

    return(
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
} 