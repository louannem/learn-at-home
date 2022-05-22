import { collection, onSnapshot, query } from "firebase/firestore"
import { useEffect, useState } from "react"
import { db } from "../utils/firebase"
import page from "../utils/styles/Wrapper.module.css"
import roomsPage from "../utils/styles/pages/RoomsPage.module.css"
import { Link } from "react-router-dom"

export const Rooms = () => {
    const [roomsList, setRoomsList] = useState([])

    useEffect(() => {
        const q =  query(collection(db, "rooms"));
        onSnapshot(q, querySnapshot => {
            setRoomsList(querySnapshot.docs.map(doc => (  
                doc.data()
            )))
        })
    }, [])

    return(
        <main className={page.defaultWrapper}>
            <section>
                <h1>Available rooms</h1>

                <section className={roomsPage.roomsGrid}>
                    {roomsList.length > 0 ? roomsList.map((room, index) => (
                        <Link to={`/chatroom/${room.roomId}`}  key={index}>
                            <article>
                                <span>#{room.roomName}</span>
                                <p>{room.users.length} users</p>
                            </article>
                        </Link>
                    ))
                :
                <p>No room are available for now. <Link to="new-room">Create your own</Link> !</p>
                }
                </section>
            </section>
        </main>
    )
}