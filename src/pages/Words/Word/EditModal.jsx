import Modal from "../../../components/Modal/Modal"
import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

import DeleteModal from "../../Library/Dictionary/DeleteModal"
import TranslationInput from "../TranslationInput"
import { useLangStore } from "../../../stores/useLangStore"

export default function EditModal({ words, isOpen, setIsOpen, editWord, oldWord, oldTranslations, oldIsDifficult, remove }) {

    const isEn = useLangStore(state => state.isEn)

    const [isDeleteOpen, setIsDeleteOpen] = useState(false)

    const [word, setWord] = useState(oldWord)
    const [translations, setTranslations] = useState(oldTranslations)
    const [error, setError] = useState({text: "", id: -1})

    const forbidden = /[\^@$[\]{}"]/;

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

    function editElement() {
        if(word.length === 0 || translations.length === 0){
            setError({ text: isEn ? "Enter the field" : "Заповніть поле", id: word.length === 0 ? 1 : 2 });
            return
        }

        if (forbidden.test(word) || forbidden.test(translations)) {;
            setError(isEn ? "Remove forbidden characters (^ @ $ [ ] { } \")" : "Приберіть заборонені символи (^ @ $ [ ] { } \")");
            return;
        }
        if(Object.keys(words).find(key => words[key].word === word && words[key].word !== oldWord)){
            setError({ text: isEn ? "This word already exists" : "Таке слово вже існує", id: 1 });
            return
        }
        if(translations.some((el, index) => translations.indexOf(el) !== index)){
            setError({ text: isEn ? "This translation already exists" : "Такий переклад вже існує", id: 2 });
            return
        }
        if(translations.some(el => el.length === 0)){
            setError({ text: isEn ? "Enter the translation" : "Заповніть переклад", id: 2 });
            return
        }

        editWord(word, translations, oldIsDifficult)
        setError({text: "", id: -1})
        setIsOpen(false)
    }

    function addTranslation(){
        if(translations.length > 9) {
            setError({ text: isEn ? "Maximum 10 translations!" : "Максимум 10 перекладів!", id: 2 });
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
                <input type="text" placeholder={isEn ? "Word" : "Слово"} className={error.id === 1 ? "modal__input error" : "modal__input"} value={word} onChange={(e) => setWord(e.target.value)} />
                {translations.map((el, index) => <TranslationInput key={index} value={el} index={index} error={error.text} setError={setError} translations={translations} setTranslations={setTranslations} forbidden={forbidden}/>)}
                <p className="gradient add" onClick={addTranslation}>{isEn ? "Add new translation" : "Додати новий переклад"}</p>
            </div>
            <DeleteModal isOpen={isDeleteOpen} setIsOpen={setIsDeleteOpen} remove={remove}/>
            <AnimatePresence mode="wait">
                {error.id > 0 && <motion.div className="modal__error" initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}}>{error.text}</motion.div>}
            </AnimatePresence>
            <div className="modal__buttons">
                <div className="modal__button modal__delete" onClick={() => setIsDeleteOpen(true)}>{isEn ? "Delete" : "Видалити"}</div>
                <div className="modal__button gradient" onClick={editElement}>{isEn ? "Save" : "Зберегти"}</div>
            </div>
        </Modal>
    )
}