import { collection, deleteDoc, doc, onSnapshot, query, where } from "firebase/firestore"
import { useEffect, useState } from "react"
import {BsFillTrashFill, BsFillPlusCircleFill} from "react-icons/bs"
import { useNavigate } from "react-router-dom"
import { useUserAuth } from "../../utils/context/AuthContext"
import { db } from "../../utils/firebase"

export const RoomOptions = ({room, showValue}) => {
    const navigate = useNavigate()
    const {user} = useUserAuth()

    const [roomCollId, setCollId] = useState()
    const [appUsers, setAppUsers] = useState([])

    const deleteRoom = async () => {
        await deleteDoc(doc(db, 'rooms', roomCollId))
        navigate('/')
    }

    const openModal = () => { showValue(true) }
        
    

    useEffect(() => {
        if(room) {
            const roomQuery =  query(collection(db, "rooms"), where("roomId", "==", room.roomId));
            onSnapshot(roomQuery, snapshot => {
            snapshot.docs.map(doc => {
                setCollId(doc.id)
                return roomCollId
                })
            })


            const usersQuery = query(collection(db, 'users'))
            let usersArray = []
            onSnapshot(usersQuery, snapshot => {
                snapshot.docs.map(doc => (
                    usersArray.push(doc.data())
                ))
                setAppUsers(usersArray)
            })
           
        }
    }, [roomCollId, room, appUsers])

    return(
        <div>
            {user.uid === room.roomCreator && <BsFillTrashFill onClick={deleteRoom} />}
            <BsFillPlusCircleFill onClick={openModal} />
        </div>
    )
}