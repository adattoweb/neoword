import Modal from "../../components/Modal/Modal"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { readLocal } from "../../helpers/readLocal"

import TranslationInput from "./TranslationInput"

export default function AddModal({ isOpen, setIsOpen, setWords, bookID }) {
    const isEn = localStorage.getItem("neoword-lang") === "en"
    const [word, setWord] = useState("")
    const [translations, setTranslations] = useState([""])
    const [error, setError] = useState(false)
    const [errorID, setErrorID] = useState(0)

    const forbidden = /[\^@$[\]{}"]/;

    function disableError(){
        if(!error){
            setTimeout(() => {
                setError(false)
                setErrorID(0)
            }, 6000)
        }
    }
    function addElement() {
        if(word.length === 0 || translations.length === 0){
            disableError()
            setError(isEn ? "Enter the field" : "Заповніть поле")
            setErrorID(word.length === 0 ? 1 : 2)
            return
        }
        if(forbidden.test(word)) {
            disableError();
            setError(isEn ? "Remove forbidden characters (^@$[]{}\")" : "Приберіть заборонені символи (^@$[]{}\")");
            setErrorID(1)
            return;
        }
        if(translations.some(el => el.length === 0)){
            disableError()
            setError(isEn ? "Enter all fields" : "Заповніть усі поля")
            setErrorID(word.length === 0 ? 1 : 2)
            return
        }
        if(translations.some((el, index) => translations.indexOf(el) !== index)){
            disableError()
            setError(isEn ? "This translaiton already exists" : "Такий переклад вже існує")
            setErrorID(2)
            return
        }
        const book = readLocal(`neoword-item-${bookID}`)
        const words = book.words
        if(Object.keys(words).find(key => words[key].word === word)){
            disableError()
            setError(isEn ? "This word already exists" : "Таке слово вже існує")
            setErrorID(1)
            return
        }
        const now = new Date()
        const id = +localStorage.getItem("neoword-index")
        localStorage.setItem("neoword-index", id+1)
        book.words[id] = {
            word: word,
            translations: translations,
            time: now.getTime(),
            isDifficult: false,
            sentences: []
        }
        const newWords = {...book.words}
        localStorage.setItem(`neoword-item-${bookID}`, JSON.stringify(book))
        setWords(newWords)
        setError(false)
        setErrorID(0)
        setWord("")
        setTranslations([""])
        setIsOpen(false)
        console.log(newWords)
        console.log(book)
    }

    function addTranslation(){
        if(translations.length > 9) {
            disableError()
            setError(isEn ? "Maximum 10 translations!" : "Максимум 10 перекладів!")
            setErrorID(2)
            return
        }
        const newTranslations = [...translations]
        newTranslations.push("")
        setTranslations(newTranslations)
    }

    return (
        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
            <div className="modal__header">{isEn ? "Creating a word" : "Створення слова"}</div>
            <div className="modal__inputs">
                <input type="text" placeholder={isEn ? "Word" : "Слово"} className={error && errorID === 1 ? "modal__input error" : "modal__input"} value={word} onChange={(e) => setWord(e.target.value)} />
                {translations.map((el, index) => <TranslationInput key={index} value={el} index={index} disableError={disableError} error={error} setError={setError} errorID={errorID} setErrorID={setErrorID} translations={translations} setTranslations={setTranslations} forbidden={forbidden}/>)}
                <p className="gradient add" onClick={addTranslation}>Додати новий переклад</p>
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