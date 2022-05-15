import { query, collection, onSnapshot, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../utils/firebase";
import { CurrentRooms } from "./CurrentRooms";
import { Link } from "react-router-dom";

import dashboard from "../../utils/styles/Dashboard.module.css"

export const RoomsCollection = ({user}) => {
    const [rooms, setRooms] = useState([])
    
    useEffect(() => {
        const q =  query(collection(db, "rooms"),  where('users', 'array-contains', user.uid));
        onSnapshot(q, querySnapshot => {
            setRooms(querySnapshot.docs.map(doc => (
                doc.data()
            )))
        } )
    }, [rooms])

    return(
        <section className={dashboard.roomsWrapper}>
            <h2>Rooms</h2> 
            {rooms.length > 0 && <span className={dashboard.newRoom}>You are part of {rooms.length} room{rooms.length > 1 ? 's' : ''}. Try and <Link to="/new-room">create a new one</Link> !</span>}
            <div className={dashboard.roomCollection}>
            { rooms.length > 0 ? rooms.map(elem => (
                <CurrentRooms group={elem}  key={`room-${elem.roomId}`} />
            )) :
            <span>You are not part of any room ! <Link to="/new-room">Try to create one</Link>.</span>
            }
            </div>
        </section>
    )
}