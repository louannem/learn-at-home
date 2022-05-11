import { addDoc, collection } from "firebase/firestore"
import { useUserAuth } from "../../utils/context/AuthContext"
import { db } from "../../utils/firebase"

import modal from "../../utils/styles/Modal.module.css"
import button from "../../utils/styles/Button.module.css"
import { useState } from "react"

export const UserCard = ({sendTo, room}) => {
    let {user} = useUserAuth()

    const [buttonText, setButtonText] = useState('Invite')
    const [disableButton, setDisabled] = useState(false)

    const sendInvite = async(e) => {
         e.preventDefault()

        await addDoc(collection(db, 'users', sendTo.userId, 'invites'), {
            senderName: user.displayName,
            from: user.uid,
            inviteTo: room.roomId,
            action: false
        })

        setButtonText('Sent !')
        setDisabled(true)

    }

    return (
        <article className={modal.userCard}>
            <img src={sendTo.photoURL || 'https://image.shutterstock.com/image-vector/blank-avatar-photo-place-holder-600w-1114445501.jpg'} alt='User profile' />
            {sendTo.displayName}
            <button onClick={sendInvite} className={button.wrapper} disabled={disableButton}>{buttonText}</button>
        </article>
    )
}