import { useEffect, useState } from "react"
import { db } from "../utils/firebase"
import { addDoc, collection, limit,  onSnapshot, orderBy, query } from "firebase/firestore"
import { useUserAuth } from "../utils/context/AuthContext"
import { Message } from "./Chat/Message"
import chat from "../utils/styles/Chat.module.css"
import form from "../utils/styles/Form.module.css"

export const ChatFeed = () => {
    const [messages, setMessages] = useState([])
    const [formValue, setValue] = useState('')

    const {user} = useUserAuth()

    const sendMessage = async (e) => {
        e.preventDefault()       

        //Creates new doc in firebase
        await addDoc(collection(db, 'messages'), {
            text: formValue,
            createdAt: new Date(),
            uid: user.uid,
            photoURL: user.photoURL,
            sender : user.displayName
        })
     
        setValue('')
    }


    useEffect(() => {
        const q =  query(collection(db, "messages"), orderBy('createdAt'), limit(50));
        onSnapshot(q, querySnapshot => {
            setMessages(querySnapshot.docs.map(doc => {
                doc.data()
                return doc.data()
            }))
        } )
    }, [])

    return(
        <section className={chat.wrapper}>
            { messages ? messages.map(mess => (
                <Message message={mess} key={mess.id} />
            )) : <p>No message to display.</p>}
           
            <form onSubmit={sendMessage} className={chat.form}>
                <input value={formValue} onChange={(e) => setValue(e.target.value)}className={chat.input} />
                <button type='submit'className={chat.button}>✨</button>
            </form>
        </section>
    )
}