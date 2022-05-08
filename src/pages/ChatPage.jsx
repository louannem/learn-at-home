import { useState } from "react"
import { useParams } from "react-router-dom"
import { ChatFeed } from "../components/ChatFeed"
import chat from "../utils/styles/Chat.module.css"

export const ChatPage = () => {
    const param = useParams()
    const [currentChat, setCurrentChat] = useState(param.currentRoom)
    
    return(
        <main className={chat.mainWrapper}>
           <h1>Chat page - {currentChat}</h1>
            <ChatFeed currentChat={currentChat} /> 
        </main>
        
    )
}