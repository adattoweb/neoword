import Modal from "../../../components/Modal/Modal"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

export default function WordModal({ isOpen, setIsOpen, word, translation, time, isDifficult, bookName, remove={remove} }) {
    const isEn = localStorage.getItem("neoword-lang") === "en"
    const [selected, setSelected] = useState(false)
    const [error, setError] = useState(false)
    function disableError(){
        if(!error){
            setTimeout(() => {
                setError(false)
            }, 6000)
        }
    }
    function moveItem() {
        if(!selected) {
            setError(isEn ? "Select a dictionary" : "Оберіть словник")
            disableError()
        }
        if(bookName === selected){
            setIsOpen(false)
            return
        }
        const arrayWords = localStorage.getItem(`neoword-item-${selected}`).split("@").map(el => el.split("^"))

        for(let i = 0; i < arrayWords[1].length; i++){
            if(arrayWords[1][i] !== ""){
                let nameOfWord = arrayWords[1][i].split("*")[0]
                if(nameOfWord === word) {
                    setIsOpen(false)
                    remove()
                    console.log(`В словнику "${bookName}" вже існує слово з назвою "${word}", перехоплюю спробу і зупиняю дублювання елементу (якщо буде декілько елемента з однаковими назвами в одному словнику, то оскільки назва використовується як унікальний ідентифікатор, будуть помилки).`)
                    return
                }
            }
        }

        arrayWords[1].push(`${word}*${translation}*${time}*${isDifficult}`)
        const index = arrayWords[0][2]
        arrayWords[0][2] = +index + 1
        const newArray = arrayWords.map(el => el.join("^")).join("@")
        localStorage.setItem(`neoword-item-${selected}`, newArray)
        remove()
        setIsOpen(false)
    }
    const books = localStorage.getItem("neoword-books").split("^")
    function Variant({ name }){
        return (
            <div className={selected === name ? "variant gradient" : "variant"} onClick={() => setSelected(name)}>{name}</div>
        )
    }
    return (
        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} className="movemodal">
            <div className="modal__header">{isEn ? "Dictionary selection" : "Обирання словника"}</div>
            <div className="variants__list">
                {books.map(el => <Variant key={el} name={el}/>)}
            </div>
            <AnimatePresence mode="wait">
                {error && <motion.div className="modal__error" initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}}>{error}</motion.div>}
            </AnimatePresence>
            <div className="modal__buttons one">
                <div className="modal__button gradient" onClick={moveItem}>{isEn ? "Select" : "Обрати"}</div>
            </div>
        </Modal>
    )
}