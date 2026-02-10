import Modal from "@/components/Modal/Modal"
import { useLangStore } from "@/stores/useLangStore"

import { Button, ButtonWrapper, Header } from "@/components/Modal/Constructor"

import styles from "@/components/Modal/Modal.module.css"

export default function DeleteModal({ isOpen, setIsOpen, remove }) {
    const isEn = useLangStore(state => state.isEn)
    return (
        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
            <Header>{isEn ? "Are you sure?" : "Ви впевнені?"}</Header>
            <ButtonWrapper>
                <Button className={`${styles.modal__delete} ${styles["text-small"]}`} onClick={remove}>{isEn ? "Yes, remove it" : "Так, видаліть"}</Button>
                <Button className={`${styles["text-small"]} gradient`} onClick={() => setIsOpen(false)}>{isEn ? "No, keep it" : "Ні, залиште"}</Button>
            </ButtonWrapper>
        </Modal>
    )
    

}