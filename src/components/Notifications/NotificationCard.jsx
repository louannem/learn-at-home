import card from "../../utils/styles/InviteCard.module.css"
import button from "../../utils/styles/Button.module.css"

import { deleteDoc, doc } from "firebase/firestore"
import { db } from "../../utils/firebase"
import { useUserAuth } from "../../utils/context/AuthContext"

export const NotificationCard = ({notif, notifId}) => {
    const {user} = useUserAuth()

    const declineInvite = async(e) => {
        e.preventDefault()
        //Deletes invite
        await deleteDoc(doc(db, 'users', user.uid, 'invites', notifId))
    } 

    return(
        <article className={card.cardWrapper}>
            {notif.senderName} send an invite to a room

            <div className={card.buttons}>
                <button  className={button.wrapper}>Accept</button>
                <button onClick={declineInvite}  className={button.link}>Decline</button>
            </div>
                    
        </article>
    )
} 