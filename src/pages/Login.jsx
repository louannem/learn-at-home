import { LoginForm } from "../components/LoginForm"
import login from "../utils/styles/Login.module.css"

export const Login = () => {
    return(
        <main>
            <section className={login.wrapper}>
                <h1>Login</h1>
                <LoginForm />
            </section>
        </main>
    )
}