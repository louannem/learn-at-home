import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import newRoom from "../../utils/styles/Form.module.css"
import logo from "../../assets/logo.svg"
import { addDoc, collection} from "firebase/firestore"
import { db } from "../../utils/firebase"

export const RoomForm = () => {
    const [room, setRoom] = useState()
    const roomId = Math.floor(Math.random() * 1000)

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()

        await addDoc(collection(db, 'rooms'), {
            roomName: room,
            roomId: roomId
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

            <div className={newRoom.formlink}>
                No account ? <Link to="/signup" className={newRoom.secondaryLink}>Sign up</Link>
            </div>

        </>
    )
} 