import { Signup } from "../components/Signup"
import { auth } from "../utils/firebase"
import login from "../utils/styles/Login.module.css"

export const Login = () => {
    console.log(auth)
    return(
        <main>
            <section className={login.wrapper}>
                <h1>Login</h1>
                
            </section>
        </main>
    )
}