import { RoomForm } from "../components/NewRoom/RoomForm"
import newRoom from "../utils/styles/Wrapper.module.css"

export const NewRoom = () => {
    return(
        <main>
            <section  className={newRoom.wrapper}>
                <h1>Create a new chatroom</h1>
                <RoomForm />
            </section>
        </main>
    )
}