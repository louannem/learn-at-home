import { collection, onSnapshot, query, where } from "firebase/firestore"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { ChatFeed } from "../components/Chat/ChatFeed"
import { RoomOptions } from "../components/Chat/RoomOptions"
import { Modal } from "../components/Modal"
import { db } from "../utils/firebase"

import { BsXLg } from 'react-icons/bs'

import chat from "../utils/styles/Chat.module.css"
import modal from "../utils/styles/Modal.module.css"
import { UserCard } from "../components/Modal/UserCard"
import { useUserAuth } from "../utils/context/AuthContext"

export const ChatPage = () => {
    let {user} = useUserAuth()

    const param = useParams()
    const [currentChat, setCurrentChat] = useState(param.currentRoom)
    const [appUsers, setAppUsers] = useState([])

    //Rooms infos
    const [currentRoom, setCurrentRoom] = useState()

    //Users infos
    const [users, setUsers] = useState([])
    const [userNames, setUserNames] = useState([])

    //Modal
    const [show, setShow] = useState(false)
    const [showUserList, setShowList] = useState(false)
    const changeShow = () => { setShow(!show) ; }
    const changeshowList = () => {setShowList(!showUserList)}
    
    const updateConst = (room) => {
        setCurrentRoom(room)
        setUsers(room.users)
    }

    useEffect(() => {
        //Gets room's name, description and users' id
        const q =  query(collection(db, "rooms"), where("roomId", "==", Number(currentChat)));
        onSnapshot(q, querySnapshot => {
           querySnapshot.docs.map(doc => (            
               updateConst(doc.data())               
            ))
        })

        //Gets users in chatroom
        //Includes user of current room in an array
        //And the others in another array if they are not the currently logged user
        const qUser = query(collection(db, 'users'))
        let userArray = []
        let appUserArray = []
        onSnapshot(qUser, userSnapshop => {
            userSnapshop.docs.map((doc) => { 
                if(users.includes(doc.data().userId)) {
                    userArray.push(doc.data())
                } else if(!users.includes(doc.data().userId) && user.uid !== doc.data().userId) {
                    appUserArray.push(doc.data())
                }
                setAppUsers(appUserArray)
                setUserNames(userArray)
                return userNames
            })  
        })
    }, [userNames])
    
    return(
        currentRoom && 
        <main className={chat.mainWrapper}>
           <h1>{currentRoom.roomName}</h1>
           {currentRoom.roomDesc ?<p>{currentRoom.roomDesc} </p> : ''}
 
           {users && <span onClick={changeshowList} className={chat.currentUser}>{users.length} user{users.length > 1 ? 's' : '' } in this room</span> }

           <RoomOptions room={currentRoom} showValue={setShow} />

            <ChatFeed currentChat={currentChat}  /> 

            {show && 
            <Modal showValue={false}>
                <div className={modal.container}>
                    <header>
                        <h1>Invite a user</h1>
                        <BsXLg onClick={changeShow} />
                    </header>
                    <section>
                    {appUsers && appUsers.map(user => 
                        <UserCard sendTo={user} key={user.userId} room={currentRoom} inviteButton={true} />
                    )}
                    </section>
                </div>
            </Modal>
            }

            
            {showUserList &&
                <Modal>
                <div className={modal.container}>
                    <header>
                        <h1>Users</h1>
                        <BsXLg onClick={changeshowList} />
                    </header>
                    <section>
                    {currentRoom.users.length > 0 ? userNames.map((user, index) => 
                       
                        <UserCard inviteButton={false} sendTo={user} key={`user-${index}`} />
                    ) :
                    <p>No user in this room !</p>
                    }
                    </section>
                </div>
            </Modal>
            }
        </main>
        
    )
}