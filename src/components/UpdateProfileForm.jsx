import { useState } from "react"
import { useUserAuth } from "../utils/context/AuthContext"
import form from "../utils/styles/components/Form.module.css"
import { Link, useNavigate } from "react-router-dom"
import { db } from "../utils/firebase"
import { doc, updateDoc } from "firebase/firestore"

export const UpdateProfileForm = () => {
    const { user, updateUserEmail, updateUserName, updateUserPassword, updateUserPhoto } = useUserAuth()
   
   
    const [photoURL, setPhotoURL] = useState()
    const [name, setName] = useState(user.displayName)
    const [email, setEmail] = useState(user.email)
    const [password, setPassword] = useState('')
    const [passwordConfirm, setPasswordConfirm] = useState()
    const [userBio, setUserBio] = useState('')

    const [error, setError] = useState('')
    const [loading, setLoading] = useState(true)

    const navigate = useNavigate()


    const handleSubmit = (e) => {
        e.preventDefault()

        if(password !== passwordConfirm) {
            setError('Passwords do not match')
        }

        //Array of updates to push
        const promises = []

        if(email !== user.email) {
            promises.push(updateUserEmail(email))           
        }
        if(password) {
            promises.push(updateUserPassword(password))
        }
        if(name !== user.displayName) {
            promises.push(updateUserName(name))
        }
        if(photoURL !== user.photoURL) {
            promises.push(updateUserPhoto(photoURL))
        }

        Promise.all(promises).then(() => {
            setLoading(false)
        }).catch(err => setError(err)
        ).finally(() => navigate("/"))


        async function writeUserData() {
            const docRef = doc(db, 'users', user.uid)
            await updateDoc(docRef, {
                bio: userBio
            })
          }

          writeUserData()

        setError('')
    }

 

    return(
        <>
            {error && <p>{error}</p>}
            <form className={form.formWrapper} onSubmit={handleSubmit}>
                <img src={user.photoURL} alt="User profile" className={form.userProfile} />
               
                <fieldset>
                    <h2>Profile picture</h2>
                    <label htmlFor="login-photo"></label>
                    <input className={form.input} type='text' defaultValue={user.photoURL} id="login-photo" onChange={(e) => setPhotoURL(e.target.value)} placeholder="Photo URL"></input>
                </fieldset>
                
                <fieldset>
                    <h2>User name</h2>
                    <label htmlFor="user-name"></label>
                    <input className={form.input} type='text' defaultValue={user.displayName} id="user-name" onChange={(e) => setName(e.target.value)} placeholder="Name"></input>
                </fieldset>
                
                <fieldset>
                    <h2>Email</h2>
                    <label htmlFor="login-email"></label>
                    <input className={form.input} type='text' defaultValue={user.email} id="login-email" onChange={(e) => setEmail(e.target.value)} placeholder="Email"></input>
                </fieldset>
                
                <fieldset>
                <h2>Password</h2>
                    <label htmlFor="login-email"></label>
                    <input className={form.input} type='text' id="login-password" defaultValue={user.password} onChange={(e) => setPassword(e.target.value)} placeholder="Leave empty to keep the same"></input>

                    <label htmlFor="login-password-confirm"></label>
                    <input className={form.input} type='text' id="login-password-confirm" onChange={(e) => setPasswordConfirm(e.target.value)} placeholder="Password confirmation"></input>
                </fieldset>

               <fieldset>
                    <h2>Bio</h2> 
                    <label htmlFor="user-bio"></label>
                    <textarea  className={form.textarea} type='text' id="user-bio" onChange={(e) => setUserBio(e.target.value)} placeholder="A little bit about yourself" />
                </fieldset> 
                
                <button type="submit">Update</button>
            </form>
            <div className={form.formlink}>
                <Link to="/" className={form.secondaryLink}>Cancel</Link>
            </div>
        </>
        
    )
}