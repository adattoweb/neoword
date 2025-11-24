import Modal from "../../components/Modal/Modal"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { readLocal } from "../../helpers/readLocal"

export default function AddModal({ isOpen, setIsOpen, setWords, bookName }) {
    const isEn = localStorage.getItem("neoword-lang") === "en"
    const [word, setWord] = useState("")
    const [translation, setTranslation] = useState("")
    const [error, setError] = useState(false)
    const [errorId, setErrorId] = useState(0)
    function disableError(){
        if(!error){
            setTimeout(() => {
                setError(false)
                setErrorId(0)
            }, 6000)
        }
    }
    function addElement() {
        if(word.length === 0 || translation.length === 0){
            disableError()
            setError(isEn ? "Enter the field" : "Заповніть поле")
            setErrorId(word.length === 0 ? 1 : 2)
            return
        }
        if(word.includes("^") || word.includes("@") || word.includes("$") || word.includes("*")){ // ^, |, $, * - спец символ
            disableError()
            setError(isEn ? "Remove the ^, @, $ or * character" : "Приберіть символ ^, @, $ або *")
            setErrorId(1)
            return
        }
        if(translation.includes("^") || translation.includes("@") || translation.includes("$") || translation.includes("*")){ // ^, |, $, * - спец символ
            disableError()
            setError(isEn ? "Remove the ^, @, $ or * character" : "Приберіть символ ^, @, $ або *")
            setErrorId(2)
            return
        }
        const book = readLocal(`neoword-item-${bookName}`)
        const words = book.words
        if(words.find(el => el.word === word)){
            disableError()
            setError(isEn ? "This word already exists" : "Таке слово вже існує")
            setErrorId(1)
            return
        }
        const now = new Date()
        book.words.push({word: word, translation: translation, time: now.getTime(), isDifficult: false, sentences: []})
        const newWords = [...book.words]
        localStorage.setItem(`neoword-item-${bookName}`, JSON.stringify(book))
        setWords(newWords)
        setError(false)
        setErrorId(0)
        setWord("")
        setTranslation("")
        setIsOpen(false)
        console.log(newWords)
        console.log(book)
    }
    return (
        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
            <div className="modal__header">{isEn ? "Creating a word" : "Створення слова"}</div>
            <div className="modal__inputs">
                <input type="text" placeholder={isEn ? "Word" : "Слово"} className={error && errorId === 1 ? "modal__input error" : "modal__input"} value={word} onChange={(e) => setWord(e.target.value)} />
                <input type="text" placeholder={isEn ? "Translatation" : "Переклад"} className={error && errorId === 2 ? "modal__input error" : "modal__input"} value={translation} onChange={(e) => setTranslation(e.target.value)} />
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