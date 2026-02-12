import { useEffect, useRef, useState } from "react"
import AddModal from "./components/AddModal/AddModal"
import Back from "@/components/Back/Back"
import Header from "./components/Header/Header"
import { useBookStore } from "@/stores/useBookStore"
import { useWordsStore } from "@/stores/useWordsStore"
import { readLocal } from "@/helpers/readLocal"
import Word from "./Word/Word"
import { useLangStore } from "@/stores/useLangStore"

import libraryStyles from "@/pages/Library/Library.module.css"
import wordStyles from "./Word/Word.module.css"
import styles from "./Words.module.css"

export default function Words(){
    const bookID = useBookStore(state => state.bookID)
    const setBookID = useBookStore(state => state.setBookID)

    const words = useWordsStore(state => state.words)
    const setWords = useWordsStore(state => state.setWords)

    const isEn = useLangStore(state => state.isEn)
    
    useEffect(() => {
        setWords(readLocal(`neoword-item-${bookID}`).words)
    }, [bookID])
    
    const [isOpen, setIsOpen] = useState(false)
    function WordAdd(){
        return (
            <div className={`${wordStyles.word} ${libraryStyles.plus} gradient`} onClick={() => setIsOpen(true)}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="#fff" className={libraryStyles.plus__icon}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
            </div>
        )
    }
    const [search, setSearch] = useState("")
    const [searchBy, setSearchBy] = useState("unknown")
    const [selected, setSelected] = useState("All")

    const sortedKeys = Object.keys(words).sort()
    const onlyWords = {}
    sortedKeys.map(letter => Object.keys(words[letter]).map(key => onlyWords[key] = words[letter][key]))
    console.log(sortedKeys)

    const [page, setPage] = useState(1)
    const visibleKeys = sortedKeys.slice(0, page)

    const loaderRef = useRef(null)
    const hasMore = visibleKeys.length < sortedKeys.length

    useEffect(() => {
        if (!loaderRef.current || !hasMore) return
    
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setPage(prev => prev + 1)
                }
            },
            {
                rootMargin: "200px",
            }
        )
    
        observer.observe(loaderRef.current)
    
        return () => observer.disconnect()
    }, [page, hasMore])
    

    return (
        <div className="content">
            <Back onClick={() => setBookID(false)}/>
            <Header selected={selected} setSelected={setSelected} searchBy={searchBy} setSearchBy={setSearchBy} search={search} setSearch={setSearch}/> 
            <AddModal isOpen={isOpen} setIsOpen={setIsOpen}/>
            <div className={`${styles.list} slide`}>
                <WordAdd />
                {visibleKeys.map(letter => Object.keys(words[letter]).map(key => <Word key={words[letter][key].word} ID={key} wordObj={words[letter][key]} search={search} searchBy={searchBy} words={onlyWords} selected={selected} />))}
                {hasMore && <div ref={loaderRef} className={styles.load}>
                    {isEn ? "Loading..." : "Завантаження..."}
                </div>}
            </div>
        </div>
    )
}