import Modal from "../../../components/Modal/Modal"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

export default function DictionaryModal({ oldName, setOldName, isOpen, setIsOpen, setArrayBooks, remove }) {
    const isEn = localStorage.getItem("neoword-lang") === "en"
    const [name, setName] = useState(oldName)
    const [error, setError] = useState(false)
    const localBooks = localStorage.getItem("neoword-books")
    function disableError(){
        if(!error){
            setTimeout(() => {
                setError(false)
            }, 6000)
        }
    }
    function updateElement() {
        if(name.includes("^") || name.includes("@") || name.includes("$")){ // ^, |, $ - спец символ
            disableError()
            setError(isEn ? "Remove the ^, @ or $ character" : "Приберіть символ ^, @ або $")
            return
        }
        if(name.length === 0){
            disableError()
            setError(isEn ? "Enter the field" : "Заповніть поле")
            return
        }
        if(localBooks?.split("^").includes(name) && name !== oldName){
            disableError()
            setError(isEn ? "This name already exists" : "Така назва вже існує")
            return 
        }
        const array = localBooks.length > 0 ? localBooks.split("^") : []
        for(let i = 0; i < array.length; i++){
            if(array[i] === oldName){
                array[i] = name
                setOldName(name)
            }
        }
        const oldLocal = localStorage.getItem(`neoword-item-${oldName}`)
        const index = oldLocal.split("@")[0].split("^")[2]
        localStorage.removeItem(`neoword-item-${oldName}`)

        const now = new Date()
        localStorage.setItem(`neoword-item-${name}`, `${name}^${now.getTime()}^${index}@${oldLocal.split("@")[1]}`)
        localStorage.setItem("neoword-books", array.join("^"))
        setArrayBooks(array)
        setError(false)
        setName("")
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
                <div className="modal__button modal__delete" onClick={remove}>{isEn ? "Delete" : "Видалити"}</div>
                <div className="modal__button gradient" onClick={updateElement}>{isEn ? "Save" : "Зберегти"}</div>
            </div>
        </Modal>
    )
}