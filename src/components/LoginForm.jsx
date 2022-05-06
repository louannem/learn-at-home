import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import signupstyle from "../utils/styles/Signup.module.css"
import { useUserAuth } from "../utils/context/AuthContext"

export const LoginForm = () => {
    const [error, setError] = useState()
    const [loading, setLoading] = useState(false)

    const [email, setEmail] = useState()
    const [password, setPassword] = useState()

    const navigate = useNavigate()
    const { logIn } = useUserAuth()

    const handleSubmit = async (e) => {
        e.preventDefault()
       
        //Try & catch since it's an async event
        try {
            setError('')
            setLoading(true)
            await  logIn(email, password)
            navigate("/")
        }
        catch(err) {
            setError(`Failed to create an account : `+err.message) 
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

                <button disabled={loading} type="submit">Login</button>
            </form>

            <div className={signupstyle.loginLinks}>
                No account ? <Link to="/signup">Sign up</Link>
            </div>
        </>
    )
}