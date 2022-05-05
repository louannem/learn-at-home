import { useRef } from "react"
import signup from "../utils/styles/Signup.module.css"

export const Signup = () => {
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()

    return(
        <>
            <form className={signup.formWrapper} >
                <label htmlFor="login-email"></label>
                <input className={signup.input} type='text' id="login-email" ref={emailRef} placeholder="Email"></input>

                <label htmlFor="login-password"></label>
                <input className={signup.input} type='text' id="login-password" ref={passwordRef} placeholder="Password"></input>

                <label htmlFor="login-password-confirm"></label>
                <input className={signup.input} type='text' id="login-password-confirm" ref={passwordConfirmRef} placeholder="Password confirmation"></input>
                <button>Login</button>
            </form>

            <div className={signup.loginLinks}>
                Alreay have an account ? Log in
            </div>
        </>
    )
}