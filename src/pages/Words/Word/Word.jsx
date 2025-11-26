import EditModal from "./EditModal"
import MoveModal from "./MoveModal"
import ListModal from "./ListModal/ListModal"
import { useState } from "react"
import { readLocal } from "../../../helpers/readLocal"

export default function Word({ ID, wordObj, search, searchBy, bookID, words, setWords, selected }) {
    if(wordObj.translation){
        console.log("+")
        const bookObject = readLocal(`neoword-item-${bookID}`)
        const newWordObject = {
            word: wordObj.word,
            translations: [wordObj.translation],
            time: wordObj.time,
            isDifficult: wordObj.isDifficult,
            sentences: wordObj.sentences,
        }
        bookObject.words[ID] = newWordObject
        localStorage.setItem(`neoword-item-${bookID}`, JSON.stringify(bookObject))

        wordObj.translations = [wordObj.translation]
    }
    const isEn = localStorage.getItem("neoword-lang") === "en"
    const [word, setWord] = useState(wordObj.word)
    const [translations, setTranslations] = useState(wordObj.translations)
    const time = wordObj.time
    const [isDifficult, setIsDifficult] = useState(wordObj.isDifficult)
    const [sentences, setSentences] = useState(wordObj.sentences)

    const [isOpen, setIsOpen] = useState(false)
    const [isMoveOpen, setIsMoveOpen] = useState(false)
    const [isListOpen, setIsListOpen] = useState(false)

    function switchDifficult() {
        editWord(word, translations, !isDifficult)
    }
    function editWord(newWord, newTranslations, newIsDifficult = isDifficult) {
        const bookObject = readLocal(`neoword-item-${bookID}`)
        const newWordObject = {
            word: newWord,
            translations: newTranslations,
            time: time,
            isDifficult: newIsDifficult,
            sentences: sentences,
        }
        bookObject.words[ID] = newWordObject
        localStorage.setItem(`neoword-item-${bookID}`, JSON.stringify(bookObject))

        setWord(newWord)
        setTranslations(newTranslations)
        setIsDifficult(newIsDifficult)
    }
    function remove(){
        const bookObject = readLocal(`neoword-item-${bookID}`)
        delete bookObject.words[ID]
        localStorage.setItem(`neoword-item-${bookID}`, JSON.stringify(bookObject))
        setWords(bookObject.words)
    }
    const date = new Date(time)
    if((searchBy.toLowerCase() === "original" || searchBy.toLowerCase() === "unknown") && !word.toLowerCase().includes(search.toLowerCase())) return
    if(searchBy.toLowerCase() === "translation" && !translations.map(el => el.toLowerCase()).includes(search.toLowerCase())) return
    if((selected === "Difficult" && !isDifficult) || (selected === "Easy" && isDifficult)) return

    console.log(translations)
    return (
        <div className="word gradient" onClick={() => setIsOpen(true)}>
            <EditModal isOpen={isOpen} words={words} setIsOpen={setIsOpen} editWord={editWord} oldWord={word} oldTranslations={translations} oldIsDifficult={isDifficult} remove={remove}/>
            <MoveModal isOpen={isMoveOpen} setIsOpen={setIsMoveOpen} ID={ID} word={word} translations={translations} time={time} isDifficult={isDifficult} sentences={sentences} bookID={bookID} remove={remove}/>
            <ListModal isOpen={isListOpen} setIsOpen={setIsListOpen} ID={ID} bookID={bookID} sentences={sentences} setSentences={setSentences}/>
            <div className="word__text">
                <p className="word__word">{word}</p>
                <div className="word__translations">
                    {translations.map((el, index) => <div key={index} className="word__translate">{el}</div>)}
                </div>
            </div>
            <div className="word__footer">
                <div className="word__left">
                    <div className={!isDifficult ? "word__difficult" : "word__difficult active"} onClick={(e) => {e.stopPropagation(); switchDifficult()}}>{isEn ? "Difficult" : "Складно"}</div>
                </div>
                <div className="word__right">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#fff" onClick={(e) => {e.stopPropagation();setIsMoveOpen(true)} }>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 0 1 4.5 9.75h15A2.25 2.25 0 0 1 21.75 12v.75m-8.69-6.44-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z" />
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#fff" onClick={(e) => {e.stopPropagation(); setIsListOpen(true)}} className={sentences.length > 0 ? "list-active" : ""}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                    </svg>
                </div>
            </div>
            <div className="word__date">{`${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`}</div>
        </div>
    )
}