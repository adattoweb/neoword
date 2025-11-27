import "./Words.css"

import { useState } from "react"
import AddModal from "./AddModal"
import Word from "./Word/Word"
import { readLocal } from "../../helpers/readLocal"
import Back from "../../components/Back/Back"
import WordsHeader from "./Wordsheader"

export default function Words({ bookID, setBookID, setGame }){
    const [words, setWords] = useState(readLocal(`neoword-item-${bookID}`).words)
    console.log(words)
    
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

    return (
        <div className="words content">
            <Back onClick={() => setBookID(false)}/>
            <WordsHeader setGame={setGame} selected={selected} setSelected={setSelected} searchBy={searchBy} setSearchBy={setSearchBy} search={search} setSearch={setSearch} words={words}/> 
            <AddModal isOpen={isOpen} setIsOpen={setIsOpen} words={words} setWords={setWords} onlyWords={words} bookID={bookID}/>
            <div className="words__list slide">
                <WordAdd/>
                {sortedKeys.map(letter => Object.keys(words[letter]).map(key => <Word key={words[letter][key].word} ID={key} wordObj ={words[letter][key]} search={search} searchBy={searchBy} bookID={bookID} words={onlyWords} setWords={setWords} selected={selected}/>))}
            </div>
        </div>
    )
}