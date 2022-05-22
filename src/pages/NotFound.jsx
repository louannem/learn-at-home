import { Link } from "react-router-dom"
import page from "../utils/styles/Wrapper.module.css"
import content from "../utils/styles/pages/404.module.css"

export const NotFound = () => {
    return(
        <main className={`${page.defaultWrapper} ${content.notfound}`}>
            <section>
                <h1>Oops ! Looks like this page doesn't exist.</h1>
                 <div className={content.divider}></div>
                <p>
                    <Link to="/">Go back</Link>
                </p>
            </section>
        </main>
    )
}