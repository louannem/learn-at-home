import { collection, onSnapshot, query } from "firebase/firestore"
import { useEffect, useState } from "react"
import { NotificationsList } from "../components/Notifications/NotificationsList"
import { useUserAuth } from "../utils/context/AuthContext"
import { db } from "../utils/firebase"
import page from "../utils/styles/Wrapper.module.css"

export const NotificationsPage = () => {
    const { user } = useUserAuth()
    const [invitesArray, setInvitesArray] = useState([])


    useEffect(() => {
        let invitesArry = []
        const qUser = query(collection(db, 'users', user.uid,'invites'))
        onSnapshot(qUser, snapshot => {
            snapshot.docs.map(doc => (
                invitesArry.push(doc.data())
            ))
            setInvitesArray(invitesArry)
        })


    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return(
        <main>
            <header className={page.wrapper}>
                <h1>Notifications ({invitesArray.length})</h1>
            </header>
            <section className={page.defaultWrapper}>
                <NotificationsList invites={invitesArray}  />
            </section>
            
        </main>
    )
}