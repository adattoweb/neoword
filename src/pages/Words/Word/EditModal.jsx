import Modal from "../../../components/Modal/Modal"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

export default function EditModal({ isOpen, setIsOpen, editWord, oldWord, oldTranslation, oldIsDifficult, bookName, remove, setWords }) {

    const isEn = localStorage.getItem("neoword-lang") === "en"
    const [word, setWord] = useState(oldWord)
    const [translation, setTranslation] = useState(oldTranslation)
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
    function editElement() {
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
        const words = localStorage.getItem(`neoword-item-${bookName}`)?.split("@")?.map(el => el?.split("^"))[1]
        const onlyWords = []
        for(let i = 0; i < words.length; i++){
            if(words[i] === "") continue
            onlyWords.push(words[i]?.split("*")[0])
        }
        let counter = 0
        for(let i = 0; i < onlyWords.length; i++){
            if(onlyWords[i] === word) counter++
        }
        if(counter >= 1 && word !== oldWord){
            disableError()
            setError(isEn ? "This word already exists" : "Таке слово вже існує")
            setErrorId(1)
            return
        }
        editWord(word, translation, oldIsDifficult)
        const arrayWords = localStorage.getItem(`neoword-item-${bookName}`).split("@")[1].split("^")
        console.log(arrayWords)
        setWords(arrayWords)
        setError(false)
        setErrorId(0)
        setIsOpen(false)

    }
    return (
        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
            <div className="modal__header">{isEn ? "Editing a word" : "Редагування слова"}</div>
            <div className="modal__inputs">
                <input type="text" placeholder={isEn ? "Word" : "Слово"} className={error && errorId === 1 ? "modal__input error" : "modal__input"} value={word} onChange={(e) => setWord(e.target.value)} />
                <input type="text" placeholder={isEn ? "Translatation" : "Переклад"} className={error && errorId === 2 ? "modal__input error" : "modal__input"} value={translation} onChange={(e) => setTranslation(e.target.value)} />
            </div>
            <AnimatePresence mode="wait">
                {error && <motion.div className="modal__error" initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}}>{error}</motion.div>}
            </AnimatePresence>
            <div className="modal__buttons">
                <div className="modal__button modal__delete" onClick={remove}>{isEn ? "Delete" : "Видалити"}</div>
                <div className="modal__button gradient" onClick={editElement}>{isEn ? "Save" : "Зберегти"}</div>
            </div>
        </Modal>
    )
}