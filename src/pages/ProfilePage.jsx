import {  doc, getDoc } from "firebase/firestore"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { ProfileHeader } from "../components/Profile/ProfileHeader"
import { db } from "../utils/firebase"

import page from "../utils/styles/Wrapper.module.css"

export const ProfilePage = () => {
    const param = useParams()
    const userId = param.id

    const [loading, setLoading] = useState(true)

    const [userData, setUserData] = useState()



    useEffect(() => {
        const getUserData = async() => {
            const docRef =  doc(db, 'users', userId);
    
            try {
                const docSnap = await getDoc(docRef)
                if(docSnap.exists()) {
                    setUserData(docSnap.data())
                }
                setLoading(false)
            } catch(err) {
                console.log(err)
                setLoading(false)
            }
        }
        getUserData()        
        
    }, [userId])

    if(loading) { return(<p>Loading...</p>)}

    return(
        <main className={page.defaultWrapper}>
            <section>
                <ProfileHeader user={userData} />
            </section>
        </main>
    )
}