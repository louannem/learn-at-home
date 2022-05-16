import {  collection, doc, getDoc, onSnapshot, query, where } from "firebase/firestore"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { CurrentRooms } from "../components/Dashboard/CurrentRooms"
import { RoomsCollection } from "../components/Dashboard/RoomsCollection"
import { ProfileHeader } from "../components/Profile/ProfileHeader"
import { db } from "../utils/firebase"

import page from "../utils/styles/Wrapper.module.css"

export const ProfilePage = () => {
    const param = useParams()
    const userId = param.id

    const [loading, setLoading] = useState(true)

    const [userData, setUserData] = useState()
    const [rooms, setRooms] = useState([])



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

        const q =  query(collection(db, "rooms"),  where('users', 'array-contains', param.id.toString()));
        onSnapshot(q, querySnapshot => {
            setRooms(querySnapshot.docs.map(doc => (
                doc.data()
            )))
        })
        console.log(rooms)
        
    }, [userId])

    if(loading) { return(<p>Loading...</p>)}

    return(
        <main className={page.defaultWrapper}>
            <section>
                <ProfileHeader user={userData} />
                <RoomsCollection user={param} />
                
            </section>
        </main>
    )
}