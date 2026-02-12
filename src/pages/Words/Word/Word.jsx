import EditModal from "./EditModal"
import MoveModal from "./components/MoveModal/MoveModal"
import ListModal from "./components/ListModal/ListModal"
import { useState } from "react"
import { readLocal } from "@/helpers/readLocal"
import { useBookStore } from "@/stores/useBookStore"
import { useLangStore } from "@/stores/useLangStore"
import { useWordsStore } from "@/stores/useWordsStore"

import styles from "./Word.module.css"

export default function Word({ ID, wordObj, search, searchBy, words, selected }) {
    const bookID = useBookStore(state => state.bookID)
    const setWords = useWordsStore(state => state.setWords)

    if(wordObj.translation){
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
    const isEn = useLangStore(state => state.isEn)
    const [word, setWord] = useState(wordObj.word)
    const [translations, setTranslations] = useState(wordObj.translations)
    const time = wordObj.time
    const [isDifficult, setIsDifficult] = useState(wordObj.isDifficult)
    const [sentences, setSentences] = useState(wordObj.sentences)

    const [isOpen, setIsOpen] = useState(false)
    const [isMoveOpen, setIsMoveOpen] = useState(false)
    const [isListOpen, setIsListOpen] = useState(false)

    const firstLetter = word[0].toLowerCase()

    function switchDifficult() {
        editWord(word, translations, !isDifficult)
    }
    function editWord(newWord, newTranslations, newIsDifficult = isDifficult) {
        const bookObject = readLocal(`neoword-item-${bookID}`)
        const newFirstLetter = newWord[0].toLowerCase()
        const newWordObject = {
            word: newWord,
            translations: newTranslations,
            time: time,
            isDifficult: newIsDifficult,
            sentences: sentences,
        }
        if(firstLetter !== newFirstLetter) delete bookObject.words[firstLetter][ID]
        if(!bookObject.words[newFirstLetter]) bookObject.words[newFirstLetter] = {}
        bookObject.words[newFirstLetter][ID] = newWordObject
        localStorage.setItem(`neoword-item-${bookID}`, JSON.stringify(bookObject))

        setWord(newWord)
        setTranslations(newTranslations)
        setIsDifficult(newIsDifficult)
    }
    function remove(){
        const bookObject = readLocal(`neoword-item-${bookID}`)
        delete bookObject.words[firstLetter][ID]
        localStorage.setItem(`neoword-item-${bookID}`, JSON.stringify(bookObject))
        setWords(bookObject.words)
    }
    const date = new Date(time)
    if((searchBy.toLowerCase() === "original" || searchBy.toLowerCase() === "unknown") && !word.toLowerCase().includes(search.toLowerCase())) return
    if(searchBy.toLowerCase() === "translation" && !translations.some(el => el.toLowerCase().includes(search.toLowerCase()))) return
    if((selected === "Difficult" && !isDifficult) || (selected === "Easy" && isDifficult)) return

    return (
        <div className={`${styles.word} gradient`} onClick={() => setIsOpen(true)}>
            <EditModal isOpen={isOpen} words={words} setIsOpen={setIsOpen} editWord={editWord} oldWord={word} oldTranslations={translations} oldIsDifficult={isDifficult} remove={remove}/>
            <MoveModal isOpen={isMoveOpen} setIsOpen={setIsMoveOpen} ID={ID} word={word} translations={translations} time={time} isDifficult={isDifficult} sentences={sentences} remove={remove} firstLetter={firstLetter}/>
            <ListModal isOpen={isListOpen} setIsOpen={setIsListOpen} ID={ID} sentences={sentences} setSentences={setSentences} firstLetter={firstLetter}/>
            <div className={styles.text}>
                <p className={styles.word__word}>{word}</p>
                <div className={styles.translations}>
                    {translations.map((el, index) => <div key={index} className={styles.translation}>{el}</div>)}
                </div>
            </div>
            <div className={styles.footer}>
                <div className={styles.left}>
                    <div className={`${styles.difficult} ${isDifficult ? styles.active : ""}`} onClick={(e) => {e.stopPropagation(); switchDifficult()}}>{isEn ? "Difficult" : "Складно"}</div>
                </div>
                <div className={styles.right}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#fff" onClick={(e) => {e.stopPropagation();setIsMoveOpen(true)} }>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 0 1 4.5 9.75h15A2.25 2.25 0 0 1 21.75 12v.75m-8.69-6.44-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z" />
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#fff" onClick={(e) => {e.stopPropagation(); setIsListOpen(true)}} className={sentences.length > 0 ? "list-active" : ""}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                    </svg>
                </div>
            </div>
            <div className={styles.date}>{`${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`}</div>
        </div>
    )
}