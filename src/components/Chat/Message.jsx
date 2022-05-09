import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useUserAuth } from "../../utils/context/AuthContext"
import chat from "../../utils/styles/Chat.module.css"
import { deleteDoc, doc } from "firebase/firestore"
import { db } from "../../utils/firebase"
import { BsXLg } from "react-icons/bs"

export const Message = ({message}) => {
    const {user} = useUserAuth()
    const navigate = useNavigate()

    const deleteMessage = async () => {
        await deleteDoc(doc(db, 'rooms', message.roomId, 'messages', message.id))
    }

    useEffect(() => {
        if(user === null) { navigate('/login')}
    }, [user, navigate])

   
  
    return (
        <div key={message.id} className={`${chat.message} ${message.uid === user.uid ? chat.sent : chat.received}`}>
            {user.uid === message.uid && <BsXLg onClick={deleteMessage} alt='Delete message' className={message.deleteIcon} />}
            <img src={message.photoURL} alt="User profile"   />
            <div>
                <span className={chat.senderName} >{message.sender}</span><br/>
                <div  className={``}>{message.text}</div>
                <span className={chat.date}>{`${message.createdAt.toDate().toLocaleDateString()}`}</span>
            </div>       
        </div>
    )
}