import Modal from "@/components/Modal/Modal"
import { Button, ButtonWrapper, Header } from "@/components/Modal/Constructor"
import { useLangStore } from "@/stores/useLangStore"

import styles from "@/components/Modal/Modal.module.css"

export default function DoubleModal({ isOpen, setIsOpen, close, saveTranslations }){
    const isEn = useLangStore(state => state.isEn)
    function onClose(withSaving = true){
        setIsOpen(false)
        close(withSaving)
        if(withSaving){
            saveTranslations()
        }
    }
    return (
        <Modal isOpen={isOpen} onClose={() => onClose(false)}>
            <Header className={styles["text-small"]}>{isEn ? "This word already exists. Do you want to add a new translation?" : "Це слово вже існує. Чи ви хочете додати новий переклад?"}</Header>
            <ButtonWrapper>
                <Button onClick={() => onClose(false)}>{isEn ? "No" : "Ні"}</Button>
                <Button onClick={() => onClose(true)}>{isEn ? "Yes" : "Так"}</Button>
            </ButtonWrapper>
        </Modal>
    )
}