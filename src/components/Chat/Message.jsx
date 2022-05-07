import { useUserAuth } from "../../utils/context/AuthContext"
import chat from "../../utils/styles/Chat.module.css"

export const Message = ({message}) => {
    const {user} = useUserAuth()
    console.log(message.createdAt.toDate())
    return (
        <div key={message.id} className={`${chat.message} ${message.uid === user.uid ? chat.sent : chat.received}`}>
            <img src={message.photoURL} alt="User profile" />
            <div>
                <span className={chat.senderName}>{message.sender}</span><br/>
                <div key={`message-${message.id} `} className={``}>{message.text}</div>
                <span className={chat.date}>{`${message.createdAt.toDate().toLocaleDateString()}`}</span>
            </div>       
        </div>
    )
}