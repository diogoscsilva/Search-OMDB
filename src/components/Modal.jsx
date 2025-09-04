import "../styles/Modal.css"
import { useState } from "react"

export function Modal(props) {
    const [active, setActive] = useState(false)
    const modalOn = props.modalOn || {}
    modalOn.out = setActive
    return (
        <div id={props.id} className={active ? "modal" : "none"} >
            {props.children}
        </div>
    )
}

export function ModalContainer(props) {
    return (
        <Modal modalOn={props.activeModal}>
            <div className='outer-modal' onClick={() => props.activeModal.out(false)}>
                <div className='inner-modal' onClick={e => e.stopPropagation()}>
                    {props.children}
                </div>
            </div>
        </Modal>
    )
}

export function OutEscapeModal(props) {
    const activeModal = { out: () => { } }
    return (
        <>
            <label onClick={(e) => {
                e.stopPropagation()
                activeModal.out(true)
            }
            }>
                {props.children[0]}
            </label>
            <ModalContainer activeModal={activeModal}>
                {props.children.slice(1)}
            </ModalContainer>
        </>
    )
}