import { useState } from "react"
import { useNavigate } from "react-router-dom"
import newRoom from "../../utils/styles/Form.module.css"
import logo from "../../assets/logo.svg"
import { addDoc, collection} from "firebase/firestore"
import { db } from "../../utils/firebase"
import { useUserAuth } from "../../utils/context/AuthContext"

export const RoomForm = () => {
    const [room, setRoom] = useState()
    const [description, setDescription] = useState('')
    const [error, setError] = useState()

    const roomId = Math.floor(Math.random() * 1000)
    const {user} = useUserAuth()

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()

        if(room === undefined) {
            setError("You need to give a name to your room  !")
        } else {
            await addDoc(collection(db, 'rooms'), {
                roomName: room,
                roomDesc: description,
                roomId: roomId,
                roomCreator: user.uid,
                users: [user.uid]
            })
            navigate(`/chatroom/${roomId}`)
        }

        
    }

    return(
        <>
        {error && <div className={newRoom.error}>{error}</div>}
            <form className={newRoom.formWrapper} onSubmit={handleSubmit}>
                <img src={logo} alt="learn at home" />
                <label htmlFor="room-name"></label>
                <input className={newRoom.input} type='text' id="room-name" onChange={(e) => setRoom(e.target.value)} placeholder="Room name"></input>

                <input className={newRoom.input} type='text'  maxlength="200" id="room-name" onChange={(e) => setDescription(e.target.value)} placeholder="Room description"></input>
                <button type="submit">Create room</button>
            </form>
        </>
    )
} 