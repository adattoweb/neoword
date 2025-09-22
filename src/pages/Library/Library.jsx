import "./Library.css"
import { useState } from "react"
import LibraryModal from "./LibraryModal"
import Dictionary from "./Dictionary/Dictionary"

export default function Library({ setBookName }) {
    
    const [isOpen, setIsOpen] = useState(false)
    const [arrayBooks, setArrayBooks] = useState(localStorage.getItem("neoword-books")?.split("^"))
    function DictionaryAdd(){
        return (
            <div className="dictionary gradient plus" onClick={() => setIsOpen(true)}>
                <div className="dictionary__paper"></div>
                <div className="dictionary__content gradient">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="#fff" className="dictionary__plus">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                </div>
            </div>
        )
    }
    return (
        <div className="library content">
            <LibraryModal isOpen={isOpen} setIsOpen={setIsOpen} setArrayBooks={setArrayBooks}/>
            <div className="library__list">
                {arrayBooks[0] !== "" && arrayBooks?.map(el => <Dictionary key={el} name={el} arrayBooks={arrayBooks} setArrayBooks={setArrayBooks} setBookName={setBookName}/>)}
                <DictionaryAdd/>
            </div>
        </div>
    )
}