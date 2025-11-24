import EditModal from "./EditModal"
import MoveModal from "./MoveModal"
import ListModal from "./ListModal"
import { useState } from "react"

export default function Word({ wordObj, search, searchBy, bookName, setWords, selected }) {
    const isEn = localStorage.getItem("neoword-lang") === "en"
    const [word, setWord] = useState(wordObj.word)
    console.log(wordObj)
    const [translation, setTranslation] = useState(wordObj.translation)
    const time = wordObj.time
    const [isDifficult, setIsDifficult] = useState(wordObj.isDifficult)
    const [sentences, setSentences] = useState(wordObj.sentences)

    const [isOpen, setIsOpen] = useState(false)
    const [isMoveOpen, setIsMoveOpen] = useState(false)
    const [isListOpen, setIsListOpen] = useState(false)

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
    if((searchBy.toLowerCase() === "original" || searchBy.toLowerCase() === "unknown") && !word.toLowerCase().includes(search.toLowerCase())) return
    if(searchBy.toLowerCase() === "translation" && !translation.toLowerCase().includes(search.toLowerCase())) return
    if((selected === "Difficult" && !isDifficult) || (selected === "Easy" && isDifficult)) return
    return (
        <div className="word gradient" onClick={() => setIsOpen(true)}>
            <EditModal isOpen={isOpen} setIsOpen={setIsOpen} editWord={editWord} oldWord={word} oldTranslation={translation} oldIsDifficult={isDifficult} bookName={bookName} remove={remove} setWords={setWords}/>
            <MoveModal isOpen={isMoveOpen} setIsOpen={setIsMoveOpen} word={word} translation={translation} time={time} isDifficult={isDifficult} bookName={bookName} remove={remove}/>
            <ListModal isOpen={isListOpen} setIsOpen={setIsListOpen}/>
            <div className="word__text">
                <p className="word__word">{word}</p>
                <p className="word__translate">{translation}</p>
            </div>
            <div className="word__footer">
                <div className="word__left">
                    <div className={!isDifficult ? "word__difficult" : "word__difficult active"} onClick={(e) => {e.stopPropagation(); switchDifficult()}}>{isEn ? "Difficult" : "Складно"}</div>
                </div>
                <div className="word__right">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#fff" onClick={(e) => {e.stopPropagation();setIsMoveOpen(true)} }>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 0 1 4.5 9.75h15A2.25 2.25 0 0 1 21.75 12v.75m-8.69-6.44-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z" />
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#fff" onClick={(e) => {e.stopPropagation(); setIsListOpen(true)}}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                    </svg>
                </div>
            </div>
            <div className="word__date">{`${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`}</div>
        </div>
    )
}