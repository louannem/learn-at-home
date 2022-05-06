import { useState } from "react"
import signupstyle from "../utils/styles/Signup.module.css"
import { useUserAuth } from "../utils/context/AuthContext"
import { useNavigate } from "react-router-dom";

export const Signup = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const { signUp } = useUserAuth();

    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()


    async function handleSubmit(e) {
        e.preventDefault()
        if(password !== passwordConfirm) {
            return setError('Passwords do not match')
        }        

        //Try & catch since it's an async event
        try {
            setError('')
            setLoading(true)
            await  signUp(email, password)
            navigate("/")
        }
        catch(err) {
            console.log(err)
            setError('Failed to create an account')

        }

        setLoading(false)
        
    }

    return(
        <>
        {error && <p>{error}</p>}
            <form className={signupstyle.formWrapper} onSubmit={handleSubmit}>
                <label htmlFor="login-email"></label>
                <input className={signupstyle.input} type='text' id="login-email" onChange={(e) => setEmail(e.target.value)} placeholder="Email"></input>

                <label htmlFor="login-password"></label>
                <input className={signupstyle.input} type='text' id="login-password" onChange={(e) => setPassword(e.target.value)} placeholder="Password"></input>

                <label htmlFor="login-password-confirm"></label>
                <input className={signupstyle.input} type='text' id="login-password-confirm" onChange={(e) => setPasswordConfirm(e.target.value)} placeholder="Password confirmation"></input>
                <button disabled={loading} type="submit">Login</button>
            </form>

            <div className={signupstyle.loginLinks}>
                Alreay have an account ? Log in
            </div>
        </>
    )
}