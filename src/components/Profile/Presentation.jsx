import profile from "../../utils/styles/pages/Profile.module.css"

export const Presentation = ({presentation}) => {
    return(
        <section className={profile.presentationWrapper}>
            {presentation}
        </section>
    )
}