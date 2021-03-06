import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import signupstyle from "../../utils/styles/Form.module.css"
import { useUserAuth } from "../../utils/context/AuthContext"
import logo from "../../assets/logo.svg"

export const LoginForm = () => {
    const [error, setError] = useState()
    const [loading, setLoading] = useState(false)

    const [email, setEmail] = useState()
    const [password, setPassword] = useState()

    const navigate = useNavigate()
    const { logIn } = useUserAuth()

    const handleSubmit = async (e) => {
        e.preventDefault()
       

        if(email === undefined && password === undefined) {
            setError('Please enter an email and a password')
        } else if (email === undefined) {
            setError('Please enter an email')
        } else if (password === undefined) {
            setError('Please enter a password')
        } else {
                   //Try & catch since it's an async event
            try {
                setError('')
                setLoading(true)
                await  logIn(email, password)
                navigate("/")
            }
            catch(err) {
                setError(`Failed to create an account : unknown email or password`) 
            }

        }

        setLoading(false)
    }

    return(
        <>
        {error && <div className={signupstyle.error}>{error}</div>}
            <form className={signupstyle.formWrapper} onSubmit={handleSubmit}>
                <img src={logo} alt="learn at home" />
                <label htmlFor="login-email"></label>
                <input className={signupstyle.input} type='text' id="login-email" onChange={(e) => setEmail(e.target.value)} placeholder="Email"></input>

                <label htmlFor="login-password"></label>
                <input className={signupstyle.input} type='text' id="login-password" onChange={(e) => setPassword(e.target.value)} placeholder="Password"></input>

                <button disabled={loading} type="submit">Login</button>
            </form>

            <div className={signupstyle.formlink}>
                No account ? <Link to="/signup" className={signupstyle.secondaryLink}>Sign up</Link>
            </div>
            <div className={signupstyle.formlink}>
                Forgot your password ? <Link to="/forgot-password" className={signupstyle.secondaryLink}>Reset</Link>
            </div>
        </>
    )
}