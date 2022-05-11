import modal from "../utils/styles/Modal.module.css"

export const Modal = ({children, show}) => {
    return(
        <section className={modal.wrapper}>
            {children}
        </section>
    )

}
