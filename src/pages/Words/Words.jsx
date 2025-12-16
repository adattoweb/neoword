import "./Words.css"

import { useEffect, useState, lazy, Suspense } from "react"
import AddModal from "./AddModal"
import Back from "../../components/Back/Back"
import WordsHeader from "./WordsHeader"
import { useBookStore } from "../../stores/useBookStore"
import { useWordsStore } from "../../stores/useWordsStore"
import { readLocal } from "../../helpers/readLocal"
import { useLangStore } from "../../stores/useLangStore"

export default function Words(){
    const isEn = useLangStore(state => state.isEn)

    const bookID = useBookStore(state => state.bookID)
    const setBookID = useBookStore(state => state.setBookID)

    const words = useWordsStore(state => state.words)
    const setWords = useWordsStore(state => state.setWords)
    
    useEffect(() => {
        setWords(readLocal(`neoword-item-${bookID}`).words)
    }, [bookID])
    
    const [isOpen, setIsOpen] = useState(false)
    function WordAdd(){
        return (
            <div className="word gradient plus" onClick={() => setIsOpen(true)}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="#fff" className="dictionary__plus">
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

    const Word = lazy(() => import("./Word/Word"));

    return (
        <div className="words content">
            <Back onClick={() => setBookID(false)}/>
            <WordsHeader selected={selected} setSelected={setSelected} searchBy={searchBy} setSearchBy={setSearchBy} search={search} setSearch={setSearch}/> 
            <AddModal isOpen={isOpen} setIsOpen={setIsOpen}/>
            <div className="words__list slide">
                <WordAdd/>
                <Suspense fallback={<div>{isEn ? "Loading words..." : "Завантаження слів"}</div>}>
                    {sortedKeys.map(letter => Object.keys(words[letter]).map(key => <Word key={words[letter][key].word} ID={key} wordObj ={words[letter][key]} search={search} searchBy={searchBy} words={onlyWords} selected={selected}/>))}
                </Suspense>
            </div>
        </div>
    )
}