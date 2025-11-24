import Modal from "../../../components/Modal/Modal"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

export default function ListModal({ isOpen, setIsOpen }){
    const isEn = localStorage.getItem("neoword-lang") === "en"
    const [error, setError] = useState("")
    const [sentence, setSentence] = useState("")

    function addSentence(){
        
    }

    function Sentence({ children }){
        return (
            <div className="sentence">{children}</div>
        )
    }

    return (
        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
            <div className="modal__header">{isEn ? "Example Sentences" : "Речення до слова"}</div>
            <div className="modal__inputs">
                <input type="text" placeholder={isEn ? "Sentence" : "Речення"} className={error ? "modal__input sinput error" : "modal__input sinput"} value={sentence} onChange={(e) => setSentence(e.target.value)} />
            </div>
            <div className="sentences">
                <Sentence>123</Sentence>
                <Sentence>123</Sentence>
            </div>
            <AnimatePresence mode="wait">
                {error && <motion.div className="modal__error" initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}}>{error}</motion.div>}
            </AnimatePresence>
            <div className="modal__buttons">
                <div className="modal__button gradient right" onClick={addSentence}>{isEn ? "Add" : "Додати"}</div>
            </div>
        </Modal>
    )
}