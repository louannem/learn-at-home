import { Signup } from "../components/Forms/Signup"
import login from "../utils/styles/Wrapper.module.css"

export const SignupPage = () => {
    return(
        <main>
            <section className={login.wrapper}>
                <h1>Sign up</h1>
                <Signup />
            </section>
        </main>
    )
}