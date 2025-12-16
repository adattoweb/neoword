import Modal from "../../../components/Modal/Modal"
import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { readLocal } from "../../../helpers/readLocal"
import { useLangStore } from "../../../stores/useLangStore"

export default function DictionaryModal({ bookID, oldName, setOldName, isOpen, setIsOpen, setIsDeleteOpen }) {
    const isEn = useLangStore(state => state.isEn)
    const [name, setName] = useState(oldName)
    const [error, setError] = useState({ text: "", id: -1})
    const books = readLocal("neoword-books")
    const errorTimeout = useRef(null);

    useEffect(() => {
        if (errorTimeout.current) {
            clearTimeout(errorTimeout.current);
        }
        errorTimeout.current = setTimeout(() => {
            setError({ text: "", id: -1 });
            errorTimeout.current = null;
        }, 5000);
    }, [error])

    function updateElement() {
        const forbidden = /[\^@$[\]{}"]/;
        if (forbidden.test(name)){
            setError({ text: isEn ? 'Remove forbidden characters (^ @ $ [ ] { } ")' : 'Приберіть заборонені символи (^ @ $ [ ] { } ")', id: 1 });
            return;
        }
        if(name.length === 0){
            setError({ text: isEn ? "Enter the field" : "Заповніть поле", id: 1 });
            return
        }
        if(books.includes(name) && name !== oldName){
            setError({ text: isEn ? "This name already exists" : "Така назва вже існує", id: 1 });
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
                <input type="text" placeholder={isEn ? "Name" : "Назва"} className={error.id > 0 ? "modal__input error" : "modal__input"} value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <AnimatePresence mode="wait">
                {error.id > 0 && <motion.div className="modal__error" initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}}>{error.text}</motion.div>}
            </AnimatePresence>
            <div className="modal__buttons">
                <div className="modal__button modal__delete" onClick={() => setIsDeleteOpen(true)}>{isEn ? "Delete" : "Видалити"}</div>
                <div className="modal__button gradient" onClick={updateElement}>{isEn ? "Save" : "Зберегти"}</div>
            </div>
        </Modal>
    )
}