import { useState } from "react"
import LibraryModal from "./LibraryModal"
import Dictionary from "./Dictionary/Dictionary"
import { useBookStore } from "@/stores/useBookStore"
import { useBooksStore } from "@/stores/useBooksStore"

import styles from "./Library.module.css"
import dictionaryStyles from "./Dictionary/Dictionary.module.css"

export default function Library({ setRecycle }) {

    const setBookID = useBookStore(state => state.setBookID)
    
    const [isOpen, setIsOpen] = useState(false)
    const books = useBooksStore(state => state.books)
    function DictionaryAdd(){
        return (
            <div className={`${dictionaryStyles.dictionary} ${styles.plus} gradient`} onClick={() => setIsOpen(true)}>
                <div className={dictionaryStyles.paper}></div>
                <div className={`${dictionaryStyles.content} gradient`}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="#fff" className={styles.plus__icon}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                </div>
            </div>
        )
    }
    function RecycleBin(){
        return (
            <div className={`${dictionaryStyles.dictionary} ${styles.plus} ${styles.delete} gradient`} onClick={() => {setRecycle(true); setBookID(false)}}>
                <div className={`${styles.delete__header} gradient`}>
                    <div className={`${styles.delete__stick} gradient`}>
                        <div className={styles.delete__white}></div>
                    </div>
                </div>
                <div className={styles.delete__content}>
                    <div className={styles.line}></div>
                    <div className={styles.line}></div>
                    <div className={styles.line}></div>
                </div>
            </div>
        )
    }
    return (
        <div className={`${styles.library} content`}>
            <LibraryModal isOpen={isOpen} setIsOpen={setIsOpen}/>
            <div className={`${styles.list} slide`}>
                {books.map(el => <Dictionary key={el} bookID={el}/>)}
                <DictionaryAdd/>
                <RecycleBin/>
            </div>
        </div>
    )
}