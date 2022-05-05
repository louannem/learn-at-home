import { Signup } from "../components/Signup"
import login from "../utils/styles/Login.module.css"

export const SignupPage = () => {
    return(
        <main>
            <section className={login.wrapper}>
                <h1>Login</h1>
                <Signup />
            </section>
        </main>
    )
}