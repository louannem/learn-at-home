import { UpdateProfileForm } from "../components/UpdateProfileForm"
import profile from "../utils/styles/Wrapper.module.css"

export const UpdateProfile = () => {
    return(
        <main>
            <section className={profile.wrapper}>
                <h1>Update your profile</h1>
                <UpdateProfileForm />
            </section>
        </main>
        
    )
}