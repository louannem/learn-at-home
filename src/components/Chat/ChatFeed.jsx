import { useEffect, useState } from "react"
import { db } from "../../utils/firebase"
import {  collection, doc, limit,  onSnapshot, orderBy, query, setDoc, updateDoc, where } from "firebase/firestore"
import { useUserAuth } from "../../utils/context/AuthContext"
import { useNavigate } from "react-router-dom"

//Components & style
import { Message } from "./Message"
import chat from "../../utils/styles/Chat.module.css"
import button from "../../utils/styles/Button.module.css"



export const ChatFeed = ({currentChat}) => {
    const [messages, setMessages] = useState([])
    const [formValue, setValue] = useState('')
    const [roomId, setRoomId] = useState()
    const [usersArray, setUsersArray] = useState([])

    const [inRoom, setInRoom] = useState()

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

        let messageId = Math.floor(Math.random() * 10000)

        //Adds messages to a subcollection in current room datas
        await setDoc(doc(db, 'rooms', roomId, 'messages', messageId.toString()), {
            text: formValue,
            createdAt: new Date(),
            messageId: messageId,
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


    const joinRoom = async(e) => {
        e.preventDefault()

        setUsersArray([...usersArray, user.uid])
        
        //Updates the rooms users' data
        await updateDoc(doc(db, 'rooms', roomId), {
            users: [...usersArray, user.uid ]
        })
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

        if(usersArray.includes(user.uid)) {
            setInRoom(true)
        }
        
        //Gets messages in current rooms
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

            //Updates eeach message sender info in case they are modified
            const messageDetails = query(collection(db, 'rooms', roomId, 'messages'))
            onSnapshot(messageDetails, querySnapshot => {
                querySnapshot.docs.map(message => {
                    if(message.data().uid === user.uid) {                       
                        const docRef = doc(db, 'rooms', roomId, 'messages', message.id)
                        updateDoc(docRef, {
                            sender: user.displayName,
                            photoURL: user.photoURL
                        })
                    }
                })
            })
        }

    }, [roomId, currentChat, usersArray, user.uid, user.displayName, user.photoURL])

    return(
        <>
            {inRoom ? <button onClick={exit} className={button.wrapper}>Exit</button> 
            : <button onClick={joinRoom} className={button.wrapper}>Join</button> 
            }

            
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