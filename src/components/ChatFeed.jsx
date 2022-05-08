import { useEffect, useState } from "react"
import { db } from "../utils/firebase"
import { addDoc, collection, limit,  onSnapshot, orderBy, query, where } from "firebase/firestore"
import { useUserAuth } from "../utils/context/AuthContext"
import { useNavigate } from "react-router-dom"

//Components & style
import { Message } from "./Chat/Message"
import chat from "../utils/styles/Chat.module.css"



export const ChatFeed = ({currentChat}) => {
    const [messages, setMessages] = useState([])
    const [formValue, setValue] = useState('')

    const {user} = useUserAuth()
    const navigate = useNavigate()

    useEffect(() => {
        if(user === null) { navigate('/login')}
    })

    const sendMessage = async (e) => {
        e.preventDefault()       

        //Creates new doc in firebase
        await addDoc(collection(db, 'messages'), {
            text: formValue,
            createdAt: new Date(),
            uid: user.uid,
            photoURL: user.photoURL,
            sender : user.displayName,
            room: currentChat
        })
     
        setValue('')
    }


    useEffect(() => {
        const q =  query(collection(db, "messages"), orderBy('createdAt'), limit(50), where("room", "==", currentChat));
        onSnapshot(q, querySnapshot => {
            setMessages(querySnapshot.docs.map(doc => {
                return{
                ...doc.data(),
                id : doc.id
                }
            }))
        } )
    }, [])

    return(
        <>
            <section className={chat.wrapper}>
                {messages.map((mess, index) => (
                    <Message message={mess} key={`${mess.id}-message-${index}`} />
                ))}
                {messages.length === 0 && <p className={chat.noMessage}>No message to display. Start by sending a message !</p>}
            </section>
            <form onSubmit={sendMessage} className={chat.form}>
                <input value={formValue} onChange={(e) => setValue(e.target.value)}className={chat.input} />
                <button type='submit'className={chat.button}>✨</button>
            </form>
        </>
        
    )
}