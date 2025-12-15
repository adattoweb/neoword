import Modal from "../../components/Modal/Modal"
import { useState } from "react"
import { useLangStore } from "../../stores/useLangStore"

export default function WordModal({ isOpen, setIsOpen, game, setGame, bads, rights, badWords }) {
    const isEn = useLangStore(state => state.isEn)
    const [isCopied, setIsCopied] = useState(false)
    function copyWords(){
        navigator.clipboard.writeText(badWords.join(", "))
        setIsCopied(true)
        if(!isCopied){
            setTimeout(() => {
                setIsCopied(false)
            }, 3000);
        }
    }
    return (
        <Modal isOpen={isOpen} onClose={() => {setIsOpen(false); setGame(false)}} className="movemodal endmodal">
            <div className="modal__header">
                {bads > rights ? isEn ? "Bad 😭" : "Погано 😭" : isEn ? "Amazing 🎉" : "Чудово 🎉"}
            </div>
            {game === "know" && <p>{isEn ? `You’ve just learned ${bads + rights} words` : `Ви щойно вивчили ${bads + rights} слів`} 🥹</p>}
            <p>{isEn ? `You know ${rights} words perfectly` : `Ви чудово знаєте ${rights} слів`} {bads > rights ? "😭" : "🤩"}</p>
            {bads > 0 && <><p className="badwords__header">{isCopied ? isEn ? "Copied" : "Скопійовано" : isEn ? "Words to review" : "Варто повторити"} <svg onClick={copyWords} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75" /></svg></p>
            <div className="badwords__content">
                {badWords.map(el => <p className="gradient" key={el}>{el}</p>)}
            </div></>}
            <div className="modal__buttons one">
                <div className="modal__button gradient" onClick={() => setGame(false)}>{isEn ? "Okay" : "Добре"}</div>
            </div>
        </Modal>
    )
}