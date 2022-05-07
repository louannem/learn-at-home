import { ChatFeed } from "../components/ChatFeed"
import chat from "../utils/styles/Chat.module.css"

export const ChatPage = () => {
    return(
        <main className={chat.mainWrapper}>
           <h1>Chat page</h1>
            <ChatFeed /> 
        </main>
        
    )
}