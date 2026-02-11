import Modal from "@/components/Modal/Modal"
import { useEffect, useRef, useState } from "react"
import { AnimatePresence } from "framer-motion"
import { readLocal } from "@/helpers/readLocal"
import { useBookStore } from "@/stores/useBookStore"
import { useLangStore } from "@/stores/useLangStore"

import { Button, ButtonWrapper, Error, Header } from "@/components/Modal/Constructor"

import modalStyles from "@/components/Modal/Modal.module.css"
import styles from "./MoveModal.module.css"

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
            <div className={`${styles.variant} ${selectedID === bookID ? "gradient" : ""}`} onClick={() => setSelectedID(bookID)}>{book.name}</div>
        )
    }
    return (
        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} className={modalStyles.movemodal}>
            <Header>{isEn ? "Dictionary selection" : "Обирання словника"}</Header>
            <div className={styles.variants__list}>
                {books.map(el => <Variant key={el} bookID={el} />)}
            </div>
            <AnimatePresence mode="wait">
                <Error hasError={error.id > 0} message={error.text} />
            </AnimatePresence>
            <ButtonWrapper className={modalStyles.one}>
                <Button className="gradient" onClick={moveItem}>{isEn ? "Select" : "Обрати"}</Button>
            </ButtonWrapper>
        </Modal>
    )
    
}