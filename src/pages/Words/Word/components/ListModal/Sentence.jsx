import { readLocal } from "@/helpers/readLocal"
import { useState } from "react"
import { useBookStore } from "@/stores/useBookStore"

import styles from "./ListModal.module.css"

export default function Sentence({ index, sentences, removeSentence, ID, firstLetter }){
    const bookID = useBookStore(state => state.bookID)
    const localBook = readLocal(`neoword-item-${bookID}`)
    const [value, setValue] = useState(localBook.words[firstLetter][ID].sentences[index])

    function editSentence(newSentence){
        const newSentences = [...sentences]
        newSentences[index] = newSentence
        setValue(newSentence)

        const book = readLocal(`neoword-item-${bookID}`)
        book.words[firstLetter][ID].sentences = newSentences
        localStorage.setItem(`neoword-item-${bookID}`, JSON.stringify(book))
    }

    return (
        <div className={styles.sentence}><input value={value} onChange={e => editSentence(e.target.value)}/>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#000" onClick={() => removeSentence(sentences[index])}>
                <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
            </svg>
        </div>
    )
}