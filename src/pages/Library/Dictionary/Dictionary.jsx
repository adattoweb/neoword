import { useState } from "react"
import DictionaryModal from "./DictionaryModal"
import DeleteModal from "./DeleteModal"
import { readLocal } from "@/helpers/readLocal"
import { useLangStore } from "@/stores/useLangStore"
import { useBookStore } from "@/stores/useBookStore"
import { useBooksStore } from "@/stores/useBooksStore"

import styles from "./Dictionary.module.css"

export default function Dictionary({ bookID }){
    const isEn = useLangStore(state => state.isEn)

    const book = readLocal(`neoword-item-${bookID}`)
    const setBookID = useBookStore(state => state.setBookID)

    const books = useBooksStore(state => state.books)
    const setBooks = useBooksStore(state => state.setBooks)
    
    const [name, setName] = useState(book.name)
    const [isOpen, setIsOpen] = useState(false)
    const [isDeleteOpen, setIsDeleteOpen] = useState(false)

    let words = book.words


    if(name.toLowerCase() === "dev" && Object.keys(words).some(key => words[key].word)){
        console.log("+++")
        const newWords = {}
        Object.keys(words).map(key => {
            const firstLetter = words[key].word[0].toLowerCase()
            if(!newWords[firstLetter]) newWords[firstLetter] = {}
            newWords[firstLetter][key] = words[key]
        })
        
        book.words = newWords
        localStorage.setItem(`neoword-item-${bookID}`, JSON.stringify(book))
    }
    const onlyWords = {}
    Object.keys(words).map(letter => Object.keys(words[letter]).map(key => onlyWords[key] = words[letter][key]))
    const count = Object.keys(onlyWords).length
    function remove(){
        const newBooks = [...books.filter(el => el !== bookID)]
        localStorage.setItem("neoword-books", JSON.stringify(newBooks))
        setBooks(newBooks)

        const deletedBooks = readLocal("neoword-recycle")
        deletedBooks.push(bookID)
        localStorage.setItem("neoword-recycle", JSON.stringify(deletedBooks))
    }
    return (
        <div className={`${styles.dictionary} gradient`} onClick={() => setBookID(bookID)}>
            <DictionaryModal bookID={bookID} oldName={name} setOldName={setName} isOpen={isOpen} setIsOpen={setIsOpen} setIsDeleteOpen={setIsDeleteOpen}/>
            <DeleteModal isOpen={isDeleteOpen} setIsOpen={setIsDeleteOpen} remove={remove}/>
            <div className={styles.paper}></div>
            <div className={`${styles.content} gradient`}>
                <div className={styles.text}>
                    <h4 className={styles.header}>{name}</h4>
                    <p className={styles.words}>{count} {isEn ? "words" : "слів"}</p>
                </div>
                <div className={styles.footer} onClick={(e) => e.preventDefault()}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#fff" onClick={(e) => {e.stopPropagation();setIsOpen(true)}}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#fff" onClick={(e) => {e.stopPropagation();setIsDeleteOpen(true)}}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                    </svg>
                </div>
            </div>
        </div>
    )
}