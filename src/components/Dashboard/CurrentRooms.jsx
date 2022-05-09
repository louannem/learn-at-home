import { Link } from "react-router-dom"
import room from "../../utils/styles/Room.module.css"

export const CurrentRooms = ({group}) => {
    return(
        <Link to={`/chatroom/${group.roomId}`} className={room.link} > 
            <article  className={room.wrapper}>
            <span>#{group.roomName}</span>
            </article>
        </Link>
    )
}