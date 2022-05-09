import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import newRoom from "../../utils/styles/Form.module.css"
import logo from "../../assets/logo.svg"
import { addDoc, collection} from "firebase/firestore"
import { db } from "../../utils/firebase"
import { useUserAuth } from "../../utils/context/AuthContext"

export const RoomForm = () => {
    const [room, setRoom] = useState()
    const roomId = Math.floor(Math.random() * 1000)
    const {user} = useUserAuth()

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()

        await addDoc(collection(db, 'rooms'), {
            roomName: room,
            roomId: roomId,
            users: [user.uid]
        })

        navigate(`/chatroom/${roomId}`)
    }

    

    return(
        <>
            <form className={newRoom.formWrapper} onSubmit={handleSubmit}>
                <img src={logo} alt="learn at home" />
                <label htmlFor="room-name"></label>
                <input className={newRoom.input} type='text' id="room-name" onChange={(e) => setRoom(e.target.value)} placeholder="Room name"></input>

                <button type="submit">Create room</button>
            </form>
        </>
    )
} 