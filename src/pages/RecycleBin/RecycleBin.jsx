import { useState } from "react"
import { readLocal } from "../../helpers/readLocal"
import "../Library/Library.css"

import RecycleItem from "./RecycleItem"
import Back from "../../components/Back/Back"
import { useLangStore } from "../../stores/useLangStore"

export default function RecycleBin({ setRecycle }){
    const isEn = useLangStore(state => state.isEn)
    const [books, setBooks] = useState(readLocal("neoword-recycle"))
    return (
        <div className="library content">
            <Back onClick={() => setRecycle(false)}/>
            <div className="library__list slide">
                {!books.length && <p className="empty">{isEn ? "There are no deleted dictionaries" : "Немає видалених словників"} 🥳</p>}
                {books.map(el => <RecycleItem key={el} bookID={el} books={books} setBooks={setBooks} />)}
            </div>
        </div>
    )
}