import { useState } from "react"
import { useNavigate } from "react-router-dom"
import newRoom from "../../utils/styles/components/Form.module.css"
import logo from "../../assets/logo.svg"
import { doc, setDoc} from "firebase/firestore"
import { db } from "../../utils/firebase"
import { useUserAuth } from "../../utils/context/AuthContext"

export const RoomForm = () => {
    const [room, setRoom] = useState()
    const [description, setDescription] = useState('')
    const [error, setError] = useState()

    const [checked, setChecked] = useState(false)

    const roomId = Math.floor(Math.random() * 1000)
    const {user} = useUserAuth()

    const navigate = useNavigate()

    const handleCheckBox = () => {
        setChecked(!checked)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if(room === undefined) {
            setError("You need to give a name to your room  !")
        } else {
            await setDoc(doc(db, 'rooms', roomId.toString()), {
                roomName: room,
                roomDesc: description,
                roomId: roomId,
                roomCreator: user.uid,
                users: [user.uid],
                private: checked
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

                <label>
                    <input
                        type='checkbox' 
                        value='Make this room private'
                        checked={checked}
                        onChange={handleCheckBox}
                    />
                    Make this room private
                </label>
                    

                <input className={newRoom.input} type='text'  maxLength="200" id="room-name" onChange={(e) => setDescription(e.target.value)} placeholder="Room description"></input>
                <button type="submit">Create room</button>
            </form>
        </>
    )
} 