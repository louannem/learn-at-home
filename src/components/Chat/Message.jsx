import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useUserAuth } from "../../utils/context/AuthContext"
import chat from "../../utils/styles/Chat.module.css"

export const Message = ({message}) => {
    const {user} = useUserAuth()
    const navigate = useNavigate()

    useEffect(() => {
        if(user === null) { navigate('/login')}
    }, [user, navigate])

   
  
    return (
        <div key={message.id} className={`${chat.message} ${message.uid === user.uid ? chat.sent : chat.received}`}>
            <img src={message.photoURL} alt="User profile"   />
            <div>
                <span className={chat.senderName} >{message.sender}</span><br/>
                <div  className={``}>{message.text}</div>
                <span className={chat.date}>{`${message.createdAt.toDate().toLocaleDateString()}`}</span>
            </div>       
        </div>
    )
}