import { collection, doc, onSnapshot, query, updateDoc, where } from "firebase/firestore"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { ChatFeed } from "../components/Chat/ChatFeed"
import { RoomOptions } from "../components/Chat/RoomOptions"
import { Modal } from "../components/Modal/Modal"
import { db } from "../utils/firebase"

import { BsXLg } from 'react-icons/bs'

import chat from "../utils/styles/Chat.module.css"
import modal from "../utils/styles/Modal.module.css"
import editRoom from "../utils/styles/Form.module.css"

import { UserCard } from "../components/Modal/UserCard"
import { useUserAuth } from "../utils/context/AuthContext"

export const ChatPage = () => {
    let {user} = useUserAuth()

    const param = useParams()
    const [currentChat, setCurrentChat] = useState(param.currentRoom)
    const [appUsers, setAppUsers] = useState([])

    //Rooms infos
    const [currentRoom, setCurrentRoom] = useState()
    const [roomName, setRoomName] = useState()
    const [roomDesc, setRoomDesc] = useState()
    const [roomId, setRoomId] = useState()

    //Users infos
    const [users, setUsers] = useState([])
    const [userNames, setUserNames] = useState([])

    //Modal
    const [show, setShow] = useState(false)
    const [showUserList, setShowList] = useState(false)
    const [showEditForm, setShowEdit] = useState(false)
    const changeShow = () => { setShow(!show) ; }
    const changeshowList = () => {setShowList(!showUserList)}
    const changeShowEditForm = () => {setShowEdit(!showEditForm)}
    
    
    const updateConst = (room) => {
        setCurrentRoom(room)
        setUsers(room.users)
    }

    const updateRoom = (e) => {
        e.preventDefault()

        if(roomName !== currentRoom.roomName && roomName !== undefined) {
            updateDoc(doc(db, 'rooms', roomId), {
                roomName: roomName
            })
        }

        if(roomDesc !== currentRoom.roomDesc && roomDesc !== undefined) {
            updateDoc(doc(db, 'rooms', roomId), {
                roomDesc: roomDesc
            })
        } 

        changeShowEditForm(setShowEdit(false))
    }

    useEffect(() => {
        //Gets room's name, description and users' id
        const q =  query(collection(db, "rooms"), where("roomId", "==", Number(currentChat)));
        onSnapshot(q, querySnapshot => {
           querySnapshot.docs.map(doc => (            
               updateConst(doc.data()),
               setRoomId(doc.id)             
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

           <RoomOptions room={currentRoom} showValue={setShow} showEditForm={setShowEdit} />

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

            {showEditForm &&
            <Modal>
                <div className={modal.container}>
                    <header>
                        <h1>Edit room</h1>
                        <BsXLg onClick={changeShowEditForm} />
                    </header>
                    <section>
                    <form className={editRoom.formWrapper} onSubmit={updateRoom}>
                        <label htmlFor="room-name"></label>
                        <input className={editRoom.input} type='text' id="room-name" onChange={(e) => setRoomName(e.target.value)} placeholder="Room name"></input>

                        <input className={editRoom.input} type='text'  maxLength="200" id="room-name" onChange={(e) => setRoomDesc(e.target.value)} placeholder="Room description"></input>
                        <button type="submit">Edit room</button>
                    </form>
                    </section>
                </div>

            </Modal>
            }
        </main>
        
    )
}