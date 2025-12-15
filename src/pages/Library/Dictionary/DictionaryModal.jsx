import Modal from "../../../components/Modal/Modal"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { readLocal } from "../../../helpers/readLocal"
import { useLangStore } from "../../../stores/useLangStore"

export default function DictionaryModal({ bookID, oldName, setOldName, isOpen, setIsOpen, setIsDeleteOpen }) {
    const isEn = useLangStore(state => state.isEn)
    const [name, setName] = useState(oldName)
    const [error, setError] = useState(false)
    const books = readLocal("neoword-books")
    function disableError(){
        if(!error){
            setTimeout(() => {
                setError(false)
            }, 6000)
        }
    }
    function updateElement() {
        const forbidden = /[\^@$[\]{}"]/;
        if (forbidden.test(name)){
            disableError();
            setError(isEn ? "Remove forbidden characters (^ @ $ [ ] { } \")" : "Приберіть заборонені символи (^ @ $ [ ] { } \")");
            return;
        }
        if(name.length === 0){
            disableError()
            setError(isEn ? "Enter the field" : "Заповніть поле")
            return
        }
        if(books.includes(name) && name !== oldName){
            disableError()
            setError(isEn ? "This name already exists" : "Така назва вже існує")
            return 
        }

        const book = readLocal(`neoword-item-${bookID}`)
        book.name = name
        localStorage.setItem(`neoword-item-${bookID}`, JSON.stringify(book))

        setOldName(name)
        setError(false)
        setIsOpen(false)
    }
    return (
        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
            <div className="modal__header">{isEn ? "Editing a dictionary" : "Редагування словника"}</div>
            <div className="modal__inputs">
                <input type="text" placeholder={isEn ? "Name" : "Назва"} className={error ? "modal__input error" : "modal__input"} value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <AnimatePresence mode="wait">
                {error && <motion.div className="modal__error" initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}}>{error}</motion.div>}
            </AnimatePresence>
            <div className="modal__buttons">
                <div className="modal__button modal__delete" onClick={() => setIsDeleteOpen(true)}>{isEn ? "Delete" : "Видалити"}</div>
                <div className="modal__button gradient" onClick={updateElement}>{isEn ? "Save" : "Зберегти"}</div>
            </div>
        </Modal>
    )
}