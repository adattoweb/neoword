import Modal from "../../../components/Modal/Modal"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { readLocal } from "../../../helpers/readLocal"

export default function ListModal({ isOpen, setIsOpen, ID, bookID, sentences, setSentences }){
    const isEn = localStorage.getItem("neoword-lang") === "en"
    const [error, setError] = useState("")
    const [sentence, setSentence] = useState("")

    function disableError(){
        if(!error){
            setTimeout(() => {
                setError(false)
            }, 6000)
        }
    }

    function addSentence(){
        if(sentence.length === 0){
            setError(isEn ? "Enter a field" : "Заповніть поле")
            disableError()
            return
        }
        if(sentences.includes(sentence)){
            setError(isEn ? "This sentence already exists" : "Таке речення вже існує")
            disableError()
            return
        }

        const newSentences = [...sentences, sentence]

        const book = readLocal(`neoword-item-${bookID}`)
        book.words[ID].sentences = newSentences
        setSentences(newSentences)
        localStorage.setItem(`neoword-item-${bookID}`, JSON.stringify(book)) 
    }

    function removeSentence(sentence){
        const newSentences = sentences.filter(el => el !== sentence)

        const book = readLocal(`neoword-item-${bookID}`)
        book.words[ID].sentences = newSentences
        setSentences(newSentences)
        localStorage.setItem(`neoword-item-${bookID}`, JSON.stringify(book)) 
    }

    function Sentence({ index }){
        const localBook = readLocal(`neoword-item-${bookID}`)
        const [value, setValue] = useState(localBook.words[ID].sentences[index])

        function editSentence(newSentence){
            const newSentences = [...sentences]
            newSentences[index] = newSentence
            setValue(newSentence)

            const book = readLocal(`neoword-item-${bookID}`)
            book.words[ID].sentences = newSentences
            localStorage.setItem(`neoword-item-${bookID}`, JSON.stringify(book))
        }

        return (
            <div className="sentence"><input value={value} onChange={e => editSentence(e.target.value)}/>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#000" onClick={() => removeSentence(sentences[index])}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                </svg>
            </div>
        )
    }

    return (
        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
            <div className="modal__header">{isEn ? "Example Sentences" : "Речення до слова"}</div>
            <div className="modal__inputs">
                <input type="text" placeholder={isEn ? "Sentence" : "Речення"} className={error ? "modal__input sinput error" : "modal__input sinput"} value={sentence} onChange={(e) => setSentence(e.target.value)} />
            </div>
            <AnimatePresence mode="wait">
                {error && <motion.div className="modal__error" initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}}>{error}</motion.div>}
            </AnimatePresence>
            <div className="sentences">
                {sentences.map((el, index) => <Sentence key={index} index={index}/>)}
            </div>
            <div className="modal__buttons">
                <div className="modal__button gradient right" onClick={addSentence}>{isEn ? "Add" : "Додати"}</div>
            </div>
        </Modal>
    )
}