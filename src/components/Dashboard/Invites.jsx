import { collection, deleteDoc, doc, onSnapshot, query, updateDoc } from "firebase/firestore"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useUserAuth } from "../../utils/context/AuthContext"
import { db } from "../../utils/firebase"

import card from "../../utils/styles/InviteCard.module.css"
import button from "../../utils/styles/Button.module.css"

export const InviteCard = () => {
    const [invites, setInvites] = useState([])
    const [inviteId, setInviteId] = useState()

    const [roomId, setRoomId] = useState()
    const [room, setRoom] = useState()
    const [usersArray, setUsersArray] = useState([])

    const {user} = useUserAuth()
    const navigate = useNavigate()

    const joinRoom = async(e) => {
        e.preventDefault()

        //Adds user to room
        await updateDoc(doc(db, 'rooms', roomId), {
            users: usersArray
        })

        //Deletes invite
        await deleteDoc(doc(db, 'users', user.uid, 'invites', inviteId))

        navigate(`chatroom/${room.roomId}`)

    }

    const declineInvite = async(e) => {
        e.preventDefault()
        //Deletes invite
        await deleteDoc(doc(db, 'users', user.uid, 'invites', inviteId))
    } 

    useEffect(() => {
        let invitesArry = []
        const qUser = query(collection(db, 'users', user.uid,'invites'))
        onSnapshot(qUser, snapshot => {
            snapshot.docs.map(doc => (
                invitesArry.push(doc.data()),
                setInviteId(doc.id)
            ))
            setInvites(invitesArry)
        })

        const qRoom = query(collection(db, 'rooms'))
        onSnapshot(qRoom, snapshot => {
            snapshot.docs.map(doc => {
                for(let invite of invitesArry) {
                    if(doc.data().roomId === invite.inviteTo) {
                        setRoom(doc.data())
                        setRoomId(doc.id)

                        setUsersArray([...doc.data().users, user.uid])
                    }
                    return (room, roomId, usersArray)
                }
                
            })
        })
    },[invites, user.uid, usersArray, room, roomId])

    return(
        <section className={card.container}>
            <h2>Invites sent to you</h2>
            {invites.length > 0 ?  invites.map((invite, index) => 
                <article key={index} className={card.cardWrapper}>
                    {invite.senderName} send an invite to a room

                    <div className={card.buttons}>
                        <button onClick={joinRoom} className={button.wrapper}>Accept</button>
                        <button onClick={declineInvite} className={button.link}>Decline</button>
                    </div>
                    
                </article>
            )
        :
        <p>No invite to show for now.</p>
        }
        </section>
    )
}