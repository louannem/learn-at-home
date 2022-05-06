import resetPassword from "../utils/styles/Form.module.css"
import { useUserAuth } from "../utils/context/AuthContext"
import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"

export const ForgotPassword = () => {
    const { resetPasswordEmail } = useUserAuth()

    const [error, setError] = useState()
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState('')

    const [email, setEmail] = useState()

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            setError('')
            setLoading(true)
            await  resetPasswordEmail(email)
            setMessage('Check mailbox for further instructions.')
        } catch(err) {
            setError(err)
        }
        setLoading(false)
    }

    return(
        <>
            {error && <p>{error}</p>}
            {message && <p>{message}</p>}
            <form className={resetPassword.formWrapper} onSubmit={handleSubmit}>
                <label htmlFor="reset-password"></label>
                <input className={resetPassword.input} type='text' id="reset-password" onChange={(e) => setEmail(e.target.value)} placeholder="Email"></input>

                <button type="submit">Reset</button>
            </form>

            <div className={resetPassword.formlink}>
                No account ? <Link to="/signup">Sign up</Link>
            </div>
            <div className={resetPassword.formlink}>
                Forgot your password ? <Link to="/forgot-password">Reset</Link>
            </div>
        </>        
    )

}