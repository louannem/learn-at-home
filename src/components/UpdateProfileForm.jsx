import { useState } from "react"
import { useUserAuth } from "../utils/context/AuthContext"
import form from "../utils/styles/Form.module.css"
import { Link, useNavigate } from "react-router-dom"
import { db } from "../utils/firebase"
import { addDoc, collection, getDocs } from "firebase/firestore"

export const UpdateProfileForm = () => {
    const { user, updateUserEmail, updateUserName, updateUserPassword, updateUserPhoto } = useUserAuth()
   
   
    const [photoURL, setPhotoURL] = useState()
    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState('')
    const [passwordConfirm, setPasswordConfirm] = useState()

    const [error, setError] = useState('')
    const [loading, setLoading] = useState(true)

    const navigate = useNavigate()

    const newCollection = async () => {
        const querySnapshot = await getDocs(collection(db, "users"));
        querySnapshot.forEach((doc) => {
          console.log(doc.id);
          console.log(doc.data())
        });

        try {
            const docRef = await addDoc(collection(db, "users"), {
              first: "Alan",
              middle: "Mathison",
              last: "Turing",
              born: 1912
            });
          
            console.log("Document written with ID: ", docRef.id);
          } catch (e) {
            console.error("Error adding document: ", e);
          }
    }

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

        setError('')
    }

 

    return(
        <>
            {error && <p>{error}</p>}
            <form className={form.formWrapper} onSubmit={handleSubmit}>
                <img src={user.photoURL} alt="User profile" className={form.userProfile} />
               
                <label htmlFor="login-photo"></label>
                <input className={form.input} type='text' defaultValue={user.photoURL} id="login-photo" onChange={(e) => setPhotoURL(e.target.value)} placeholder="Photo URL"></input>

                
                <label htmlFor="login-email"></label>
                <input className={form.input} type='text' defaultValue={user.displayName} id="login-email" onChange={(e) => setName(e.target.value)} placeholder="Name"></input>

                <label htmlFor="login-password"></label>
                <input className={form.input} type='text' defaultValue={user.email} id="login-password" onChange={(e) => setEmail(e.target.value)} placeholder="Email"></input>

                <label htmlFor="login-password"></label>
                <input className={form.input} type='text' id="login-password" defaultValue={user.password} onChange={(e) => setPassword(e.target.value)} placeholder="Leave empty to keep the same"></input>

                <label htmlFor="login-password-confirm"></label>
                <input className={form.input} type='text' id="login-password-confirm" onChange={(e) => setPasswordConfirm(e.target.value)} placeholder="Password confirmation"></input>

                <button type="submit">Update</button>
            </form>
            <div className={form.formlink}>
                <Link to="/" className={form.secondaryLink}>Cancel</Link>
            </div>
        </>
        
    )
}