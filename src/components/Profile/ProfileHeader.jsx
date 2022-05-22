import profile from "../../utils/styles/pages/Profile.module.css"

export const ProfileHeader = ({user}) => {
    return(
        <header className={profile.wrapper}>
            <img src={user.photoURL} alt="User profile" />
                <h1>{user.displayName || user.email}</h1>
        </header>
    )
}