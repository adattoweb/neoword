import Modal from "../../components/Modal/Modal"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

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
        const words = localStorage.getItem(`neoword-item-${bookName}`)?.split("@")?.map(el => el?.split("^"))[1]
        const onlyWords = []
        for(let i = 0; i < words.length; i++){
            if(words[i] === "") continue
            onlyWords.push(words[i]?.split("*")[0])
        }
        if(onlyWords.includes(word)){
            disableError()
            setError(isEn ? "This word already exists" : "Таке слово вже існує")
            setErrorId(1)
            return
        }
        const arrayWords = localStorage.getItem(`neoword-item-${bookName}`).split("@").map(el => el.split("^"))
        const now = new Date()
        arrayWords[1].push(`${word}*${translation}*${now.getTime()}*false`)
        const index = arrayWords[0][2]
        arrayWords[0][2] = +index + 1
        const newArray = arrayWords.map(el => el.join("^")).join("@")
        localStorage.setItem(`neoword-item-${bookName}`, newArray)
        setWords(arrayWords[1])
        setError(false)
        setErrorId(0)
        setWord("")
        setTranslation("")
        setIsOpen(false)
        console.log(onlyWords, arrayWords[1])
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