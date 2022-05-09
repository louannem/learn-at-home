import { useEffect, useState } from "react"
import { db } from "../../utils/firebase"
import { addDoc, collection, doc, limit,  onSnapshot, orderBy, query, updateDoc, where } from "firebase/firestore"
import { useUserAuth } from "../../utils/context/AuthContext"
import { useNavigate } from "react-router-dom"

//Components & style
import { Message } from "./Message"
import chat from "../../utils/styles/Chat.module.css"



export const ChatFeed = ({currentChat}) => {
    const [messages, setMessages] = useState([])
    const [formValue, setValue] = useState('')
    const [roomId, setRoomId] = useState()
    const [usersArray, setUsersArray] = useState([])

    const {user} = useUserAuth()
    const navigate = useNavigate()

    useEffect(() => {
        if(user === null) { navigate('/login')}
    })

    const sendMessage = async (e) => {
        e.preventDefault()       

        if(!usersArray.includes(user.uid)) {
            //Updates array of users in chatroom only if not already present
            await updateDoc(doc(db, 'rooms', roomId), {
                users: [...usersArray, user.uid ]
            })
        }

        //Adds messages to a subcollection in curretn room datas
        await addDoc(collection(db, 'rooms', roomId, 'messages'), {
            text: formValue,
            createdAt: new Date(),
            uid: user.uid,
            photoURL: user.photoURL,
            sender : user.displayName,
            room: currentChat,
            roomId: roomId
        })
     
        setValue('')
    }

    const exit = async () => {
        let uid = user.uid
        //Creates new array without current user
        const newUsers = usersArray.filter(function(user, index) {
            return uid !== user
        })
        
        //Updates the rooms users' data
        await updateDoc(doc(db, 'rooms', roomId), {
            users: newUsers
        })

        navigate('/')
    }

    useEffect(() => {
        //Gets room Id & its users
        const q2 =  query(collection(db, "rooms"), where("roomId", "==", Number(currentChat)));
        onSnapshot(q2, snapshot => {
            snapshot.docs.map(doc => {
                setRoomId(doc.id)
                setUsersArray(doc.data().users)
                return doc
            })
        })
        
        //Gets messages
        if(roomId) {
            const q =  query(collection(db, 'rooms', roomId, 'messages'), orderBy('createdAt'), limit(50));
            onSnapshot(q, querySnapshot => {
                setMessages(querySnapshot.docs.map(doc => {
                    return{
                    ...doc.data(),
                    id : doc.id
                    }
                }))
            })
        }

    }, [roomId])

    return(
        <>
            <button onClick={exit}>Exit</button>
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