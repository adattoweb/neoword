import Modal from "../../../components/Modal/Modal"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

import DeleteModal from "../../Library/Dictionary/DeleteModal"
import TranslationInput from "../TranslationInput"

export default function EditModal({ words, isOpen, setIsOpen, editWord, oldWord, oldTranslations, oldIsDifficult, remove }) {

    const isEn = localStorage.getItem("neoword-lang") === "en"

    const [isDeleteOpen, setIsDeleteOpen] = useState(false)

    const [word, setWord] = useState(oldWord)
    const [translations, setTranslations] = useState(oldTranslations)
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
    function editElement() {
        if(word.length === 0 || translations.length === 0){
            disableError()
            setError(isEn ? "Enter the field" : "Заповніть поле")
            setErrorID(word.length === 0 ? 1 : 2)
            return
        }

        if (forbidden.test(word) || forbidden.test(translations)) {
            disableError();
            setError(isEn ? "Remove forbidden characters (^ @ $ [ ] { } \")" : "Приберіть заборонені символи (^ @ $ [ ] { } \")");
            return;
        }
        if(Object.keys(words).find(key => words[key].word === word && words[key].word !== oldWord)){
            disableError()
            setError(isEn ? "This word already exists" : "Таке слово вже існує")
            setErrorID(1)
            return
        }
        if(translations.some((el, index) => translations.indexOf(el) !== index)){
            disableError()
            setError(isEn ? "This translaiton already exists" : "Такий переклад вже існує")
            setErrorID(2)
            return
        }

        editWord(word, translations, oldIsDifficult)
        setError(false)
        setErrorID(0)
        setIsOpen(false)
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
            <div className="modal__header">{isEn ? "Editing a word" : "Редагування слова"}</div>
            <div className="modal__inputs">
                <input type="text" placeholder={isEn ? "Word" : "Слово"} className={error && errorID === 1 ? "modal__input error" : "modal__input"} value={word} onChange={(e) => setWord(e.target.value)} />
                {translations.map((el, index) => <TranslationInput key={index} value={el} index={index} disableError={disableError} error={error} setError={setError} errorID={errorID} setErrorID={setErrorID} translations={translations} setTranslations={setTranslations} forbidden={forbidden}/>)}
                <p className="gradient add" onClick={addTranslation}>{isEn ? "Add new translation" : "Додати новий переклад"}</p>
            </div>
            <DeleteModal isOpen={isDeleteOpen} setIsOpen={setIsDeleteOpen} remove={remove}/>
            <AnimatePresence mode="wait">
                {error && <motion.div className="modal__error" initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}}>{error}</motion.div>}
            </AnimatePresence>
            <div className="modal__buttons">
                <div className="modal__button modal__delete" onClick={() => setIsDeleteOpen(true)}>{isEn ? "Delete" : "Видалити"}</div>
                <div className="modal__button gradient" onClick={editElement}>{isEn ? "Save" : "Зберегти"}</div>
            </div>
        </Modal>
    )
}