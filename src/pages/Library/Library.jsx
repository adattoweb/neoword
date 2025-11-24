import "./Library.css"
import { useState } from "react"
import LibraryModal from "./LibraryModal"
import Dictionary from "./Dictionary/Dictionary"
import { readLocal } from "../../helpers/readLocal"

export default function Library({ setBookID }) {
    
    const [isOpen, setIsOpen] = useState(false)
    const [books, setBooks] = useState(readLocal("neoword-books"))
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
            <LibraryModal isOpen={isOpen} setIsOpen={setIsOpen} setBooks={setBooks}/>
            <div className="library__list slide">
                {books.map(el => <Dictionary key={el} bookID={el} setBookID={setBookID} books={books} setBooks={setBooks}/>)}
                <DictionaryAdd/>
            </div>
        </div>
    )
}