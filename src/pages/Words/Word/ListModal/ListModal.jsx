import Modal from "@/components/Modal/Modal"
import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { readLocal } from "@/helpers/readLocal"

import Sentence from "./Sentence"
import { useBookStore } from "@/stores/useBookStore"
import { useLangStore } from "@/stores/useLangStore"

export default function ListModal({ isOpen, setIsOpen, ID, sentences, setSentences, firstLetter }){
    const isEn = useLangStore(state => state.isEn)
    const bookID = useBookStore(state => state.bookID)
    const [error, setError] = useState({ text: "", id: -1})
    const [sentence, setSentence] = useState("")

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

    function addSentence(){
        if(sentence.length === 0){
            setError({ text: isEn ? "Enter a field" : "Заповніть поле", id: 1})
            return
        }
        if(sentences.includes(sentence)){
            setError({ text: isEn ? "This sentence already exists" : "Таке речення вже існує", id: 1})
            return
        }

        const newSentences = [...sentences, sentence]

        const book = readLocal(`neoword-item-${bookID}`)
        book.words[firstLetter][ID].sentences = newSentences
        setSentences(newSentences)
        localStorage.setItem(`neoword-item-${bookID}`, JSON.stringify(book)) 

        setSentence("")
    }

    function removeSentence(sentence){
        const newSentences = sentences.filter(el => el !== sentence)

        const book = readLocal(`neoword-item-${bookID}`)
        book.words[firstLetter][ID].sentences = newSentences
        setSentences(newSentences)
        localStorage.setItem(`neoword-item-${bookID}`, JSON.stringify(book)) 
    }

    return (
        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
            <div className="modal__header">{isEn ? "Example Sentences" : "Речення до слова"}</div>
            <div className="modal__inputs">
                <input type="text" placeholder={isEn ? "Sentence" : "Речення"} className={error.id > 0 ? "modal__input sinput error" : "modal__input sinput"} value={sentence} onChange={(e) => setSentence(e.target.value)} />
            </div>
            <AnimatePresence mode="wait">
                {error.id > 0 && <motion.div className="modal__error" initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}}>{error.text}</motion.div>}
            </AnimatePresence>
            <div className="sentences">
                {sentences.map((el, index) => <Sentence key={index} index={index} sentences={sentences} removeSentence={removeSentence} ID={ID} firstLetter={firstLetter}/>)}
            </div>
            <div className="modal__buttons">
                <div className="modal__button gradient right" onClick={addSentence}>{isEn ? "Add" : "Додати"}</div>
            </div>
        </Modal>
    )
}