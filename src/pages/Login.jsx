import { LoginForm } from "../components/Forms/LoginForm"
import login from "../utils/styles/Wrapper.module.css"

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