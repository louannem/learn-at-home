import { collection, onSnapshot, query, where } from "firebase/firestore"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { ChatFeed } from "../components/Chat/ChatFeed"
import { db } from "../utils/firebase"
import chat from "../utils/styles/Chat.module.css"

export const ChatPage = () => {
    const param = useParams()
    const [currentChat, setCurrentChat] = useState(param.currentRoom)
    const [chatName, setChatName] = useState('')
    const [users, setUsers] = useState([])

    useEffect(() => {
        const q =  query(collection(db, "rooms"), where("roomId", "==", Number(currentChat)));
        onSnapshot(q, querySnapshot => {
           querySnapshot.docs.map(doc => (
               setChatName(doc.data().roomName),
               setUsers(doc.data().users)
            ))
        })
    }, [])
    
    return(
        <main className={chat.mainWrapper}>
           <h1>Chat page - {chatName}</h1>
           {users && <p>{users.length} user{users.length > 1 ? 's' : '' } in this room</p> }
            <ChatFeed currentChat={currentChat} /> 
        </main>
        
    )
}