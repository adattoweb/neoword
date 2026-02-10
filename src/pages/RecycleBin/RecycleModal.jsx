import Modal from "@/components/Modal/Modal"
import { useLangStore } from "@/stores/useLangStore"

import { Button, ButtonWrapper, Header } from "@/components/Modal/Constructor"

import styles from "@/components/Modal/Modal.module.css"

export default function RecycleModal({ name, isOpen, setIsOpen, setIsDeleteOpen, restore }) {
    const isEn = useLangStore(state => state.isEn)
    return (
        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
            <Header>{name}</Header>
            <ButtonWrapper>
                <Button className={styles.modal__delete} onClick={() => setIsDeleteOpen(true)}>{isEn ? "Delete" : "Видалити"}</Button>
                <Button className="gradient" onClick={restore}>{isEn ? "Restore" : "Відновити"}</Button>
            </ButtonWrapper>
        </Modal>
    )
    
}