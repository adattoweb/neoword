import { useState } from "react"
import DictionaryModal from "./DictionaryModal"

export default function Dictionary({ name, arrayBooks, setArrayBooks, setBookName }){
    const isEn = localStorage.getItem("neoword-lang") === "en"
    const words = localStorage.getItem(`neoword-item-${name}`).split("@")[0].split("^")[2]
    function remove(){
        const newArray = arrayBooks.filter(el => el !== name) 
        setArrayBooks(newArray)
        localStorage.setItem("neoword-books", newArray.join("^"))
        localStorage.removeItem(`neoword-item-${name}`)
    }
    const [isOpen, setIsOpen] = useState(false)
    const [oldName, setOldName] = useState(name)
    return (
        <div className="dictionary gradient" onClick={() => setBookName(oldName)}>
            <DictionaryModal oldName={oldName} setOldName={setOldName} isOpen={isOpen} setIsOpen={setIsOpen} remove={remove} setArrayBooks={setArrayBooks}/>
            <div className="dictionary__paper"></div>
            <div className="dictionary__content gradient">
                <div className="dictionary__text">
                    <h4 className="dictionary__header">{name}</h4>
                    <p className="dictionary__words">{words} {isEn ? "words" : "слів"}</p>
                </div>
                <div className="dictionary__footer" onClick={(e) => e.preventDefault()}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#fff" onClick={(e) => {e.stopPropagation();setIsOpen(true)}}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#fff" onClick={(e) => {e.stopPropagation();remove()}}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                    </svg>
                </div>
            </div>
        </div>
    )
}