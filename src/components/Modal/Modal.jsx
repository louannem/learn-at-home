import modal from "../../utils/styles/Modal.module.css"

export const Modal = ({children}) => {
    return(
        <section className={modal.wrapper}>
            {children}
        </section>
    )

}
