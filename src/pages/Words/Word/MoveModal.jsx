import Modal from "@/components/Modal/Modal"
import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { readLocal } from "@/helpers/readLocal"
import { useBookStore } from "@/stores/useBookStore"
import { useLangStore } from "@/stores/useLangStore"

export default function MoveModal({ isOpen, setIsOpen, ID, word, translations, time, isDifficult, sentences, remove, firstLetter }) {
    const isEn = useLangStore(state => state.isEn)
    const bookID = useBookStore(state => state.bookID)
    const [selectedID, setSelectedID] = useState(false)
    const [error, setError] = useState({ text: "", id: -1})
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

    function moveItem() {
        if(!selectedID) {
            setError({ text: isEn ? "Select a dictionary" : "Оберіть словник", id: 1})
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
                {error.id > 0 && <motion.div className="modal__error" initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}}>{error.text}</motion.div>}
            </AnimatePresence>
            <div className="modal__buttons one">
                <div className="modal__button gradient" onClick={moveItem}>{isEn ? "Select" : "Обрати"}</div>
            </div>
        </Modal>
    )
}