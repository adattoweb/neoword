import "./Library.css"
import { useState } from "react"
import LibraryModal from "./LibraryModal"
import Dictionary from "./Dictionary/Dictionary"
import { readLocal } from "../../helpers/readLocal"
import { useBookStore } from "../../stores/useBookStore"

export default function Library({ setRecycle }) {

    const setBookID = useBookStore(state => state.setBookID)
    
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
    function RecycleBin(){
        return (
            <div className="dictionary gradient plus delete" onClick={() => {setRecycle(true); setBookID(false)}}>
                <div className="delete__header gradient">
                    <div className="delete__stick gradient">
                        <div className="delete__white"></div>
                    </div>
                </div>
                <div className="delete__content">
                    <div className="delete__line"></div>
                    <div className="delete__line"></div>
                    <div className="delete__line"></div>
                </div>
            </div>
        )
    }
    return (
        <div className="library content">
            <LibraryModal isOpen={isOpen} setIsOpen={setIsOpen} setBooks={setBooks}/>
            <div className="library__list slide">
                {books.map(el => <Dictionary key={el} bookID={el} books={books} setBooks={setBooks}/>)}
                <DictionaryAdd/>
                <RecycleBin/>
            </div>
        </div>
    )
}