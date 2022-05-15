import { NotificationCard } from "./NotificationCard"

export const NotificationsList = ({invites}) => {

    

    return(
        <section>
            {invites.map((invite, index) => (
                <NotificationCard key={`notification-${index}`} notif={invite}  />
            ))}
        </section>
    )
}