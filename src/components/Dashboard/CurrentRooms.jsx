import { Link } from "react-router-dom"
import room from "../../utils/styles/Room.module.css"

export const CurrentRooms = ({group}) => {
    return(
        <Link to={`/chatroom/${group.room}`} className={room.link} > 
            <article  className={room.wrapper}>
            <span>{group.room}</span>
            </article>
        </Link>
    )
}