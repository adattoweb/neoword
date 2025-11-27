import Modal from "../../../components/Modal/Modal"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { readLocal } from "../../../helpers/readLocal"

export default function MoveModal({ isOpen, setIsOpen, ID, word, translations, time, isDifficult, sentences, bookID, remove, firstLetter }) {
    const isEn = localStorage.getItem("neoword-lang") === "en"
    const [selectedID, setSelectedID] = useState(false)
    const [error, setError] = useState(false)
    function disableError(){
        if(!error){
            setTimeout(() => {
                setError(false)
            }, 6000)
        }
    }
    function moveItem() {
        if(!selectedID) {
            setError(isEn ? "Select a dictionary" : "Оберіть словник")
            disableError()
        }
        if(bookID === selectedID){
            setIsOpen(false)
            return
        }
        const book = readLocal(`neoword-item-${selectedID}`)
        if(!book.words[firstLetter]) book.words[firstLetter] = {}
        book.words[firstLetter][ID] = {
            word: word,
            translations: translations,
            time: time,
            isDifficult: isDifficult,
            sentences: sentences,
        }
        localStorage.setItem(`neoword-item-${selectedID}`, JSON.stringify(book))
        remove()
        setIsOpen(false)
    }
    const books = readLocal("neoword-books")
    function Variant({ bookID }){
        const book = readLocal(`neoword-item-${bookID}`)
        return (
            <div className={selectedID === bookID ? "variant gradient" : "variant"} onClick={() => setSelectedID(bookID)}>{book.name}</div>
        )
    }
    return (
        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} className="movemodal">
            <div className="modal__header">{isEn ? "Dictionary selection" : "Обирання словника"}</div>
            <div className="variants__list">
                {books.map(el => <Variant key={el} bookID={el}/>)}
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