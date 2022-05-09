import { ForgotPassword } from "../components/Forms/ForgotPassword"
import form from "../utils/styles/Wrapper.module.css"

export const ForgotPasswordPage = () => {
    return(
        <main className={form.wrapper}>
            <h1>Reset your password</h1>
            <ForgotPassword />
        </main>
        
    )
}