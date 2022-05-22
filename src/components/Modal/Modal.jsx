import modal from "../../utils/styles/components/Modal.module.css"

export const Modal = ({children}) => {
    return(
        <section className={modal.wrapper}>
            {children}
        </section>
    )

}
