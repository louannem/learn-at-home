import { useRef, useState } from "react"
import signup from "../utils/styles/Signup.module.css"
import { useAuth } from "../utils/context/AuthContext"

export const Signup = () => {
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const { signupHook } = useAuth()

    const [error, setError] = useState('')


    async function handleSubmit(e) {
        e.preventDefault()

        if(passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError('Passwords do not match')
        }

        //Try & catch since it's an async event
        try {
            setError('')
            await  signupHook(emailRef.current.value, passwordRef.current.value)
        }
        catch {
            setError('Failed to create an account')
        }
        
    }

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