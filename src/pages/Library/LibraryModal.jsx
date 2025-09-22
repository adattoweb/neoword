import Modal from "../../components/Modal/Modal"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

export default function LibraryModal({ isOpen, setIsOpen, setArrayBooks }) {
    const isEn = localStorage.getItem("neoword-lang") === "en"
    const [name, setName] = useState("")
    const [error, setError] = useState(false)
    const localBooks = localStorage.getItem("neoword-books")
    function disableError(){
        if(!error){
            setTimeout(() => {
                setError(false)
            }, 6000)
        }
    }
    function addElement() {
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
        if(localBooks?.split("^").includes(name)){
            disableError()
            setError(isEn ? "This name already exists" : "Така назва вже існує")
            return 
        }
        const array = localBooks.length > 0 ? localBooks.split("^") : []
        array.push(name)
        localStorage.setItem("neoword-books", array.join("^"))

        const now = new Date()
        localStorage.setItem(`neoword-item-${name}`, `${name}^${now.getTime()}^0@`)
        console.log(array)

        setArrayBooks(array)
        setError(false)
        setName("")
        setIsOpen(false)
    }
    return (
        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
            <div className="modal__header">{isEn ? "Creating a dictionary" : "Створення словника"}</div>
            <div className="modal__inputs">
                <input type="text" placeholder={isEn ? "Name" : "Назва"} className={error ? "modal__input error" : "modal__input"} value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <AnimatePresence mode="wait">
                {error && <motion.div className="modal__error" initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}}>{error}</motion.div>}
            </AnimatePresence>
            <div className="modal__buttons one">
                <div className="modal__button gradient" onClick={addElement}>{isEn ? "Create" : "Створити"}</div>
            </div>
        </Modal>
    )
}