import EditModal from "./EditModal"
import MoveModal from "./MoveModal"
import { useState } from "react"

export default function Word({ search, str, bookName, setWords, selected }) {
    const isEn = localStorage.getItem("neoword-lang") === "en"
    if (str === "" || !str) return
    const wordArray = str.split("*")
    const [word, setWord] = useState(wordArray[0])
    const [translation, setTranslation] = useState(wordArray[1])
    const time = +wordArray[2]
    const [isDifficult, setIsDifficult] = useState(wordArray[3] === "false" ? false : true)

    const [isOpen, setIsOpen] = useState(false)
    const [isMoveOpen, setIsMoveOpen] = useState(false)
    function switchDifficult() {
        editWord(word, translation, !isDifficult)
    }
    function editWord(newWord, newTranslation, newIsDifficult = isDifficult) {
        const arrayWords = localStorage.getItem(`neoword-item-${bookName}`).split("@").map(el => el.split("^"))
        for (let i = 0; i < arrayWords[1].length; i++) {
            if ((arrayWords[1][i] !== undefined && arrayWords[1][i] !== "")) {
                const arrayWord = arrayWords[1][i].split("*")
                if (arrayWord[0] === word) {
                    arrayWords[1][i] = `${newWord}*${newTranslation}*${time}*${newIsDifficult}`
                    setWord(newWord)
                    setTranslation(newTranslation)
                    setIsDifficult(newIsDifficult)
                }
            }
        }
        localStorage.setItem(`neoword-item-${bookName}`, arrayWords.map(el => el.join("^")).join("@"))
    }
    function remove(){
        const arrayWords = localStorage.getItem(`neoword-item-${bookName}`).split("@").map(el => el.split("^"))
        for (let i = 0; i < arrayWords[1].length; i++) {
            if ((arrayWords[1][i] !== undefined && arrayWords[1][i] !== "")) {
                const arrayWord = arrayWords[1][i].split("*")
                if (arrayWord[0] === word) {
                    arrayWords[1].splice(i, 1)
                    +arrayWords[0][2]--
                    break;
                }
            }
        }
        setWords(arrayWords[1])
        localStorage.setItem(`neoword-item-${bookName}`, arrayWords.map(el => el.join("^")).join("@"))
    }
    const date = new Date(time)
    if(!word.includes(search)) return
    if((selected === "Difficult" && !isDifficult) || (selected === "Easy" && isDifficult)) return
    return (
        <div className="word gradient">
            <EditModal isOpen={isOpen} setIsOpen={setIsOpen} editWord={editWord} oldWord={word} oldTranslation={translation} oldIsDifficult={isDifficult} bookName={bookName} remove={remove} setWords={setWords}/>
            <MoveModal isOpen={isMoveOpen} setIsOpen={setIsMoveOpen} word={word} translation={translation} time={time} isDifficult={isDifficult} bookName={bookName} remove={remove}/>
            <div className="word__text">
                <p className="word__word">{word}</p>
                <p className="word__translate">{translation}</p>
            </div>
            <div className="word__footer">
                <div className="word__left">
                    <div className={!isDifficult ? "word__difficult" : "word__difficult active"} onClick={switchDifficult}>{isEn ? "Difficult" : "Складно"}</div>
                </div>
                <div className="word__right">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#fff" onClick={() => setIsMoveOpen(true)}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 0 1 4.5 9.75h15A2.25 2.25 0 0 1 21.75 12v.75m-8.69-6.44-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z" />
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#fff" onClick={() => setIsOpen(true)}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#fff" onClick={remove}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                    </svg>
                </div>
            </div>
            <div className="word__date">{`${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`}</div>
        </div>
    )
}