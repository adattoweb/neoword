import Header from './components/Header/Header'
import Library from './pages/Library/Library'
import Words from "./pages/Words/Words"
import Cards from './pages/Cards/Cards'
import "./styles/animation.css"

import { useEffect, useState } from "react"
import { readLocal } from './helpers/readLocal'
import RecycleBin from './pages/RecycleBin/RecycleBin'
import { useBookStore } from './stores/useBookStore'
import { useGameStore } from './stores/useGameStore'

export default function App() {
  const checkKeys = [["neoword-lang", "en"], ["neoword-index", "0"], ["neoword-theme", "blue"], ["neoword-books", "[]"], ["neoword-recycle", "[]"]]
  for(let i = 0; i < checkKeys.length; i++){
    const localKey = checkKeys[i][0]
    if(!localStorage.getItem(localKey)) localStorage.setItem(localKey, checkKeys[i][1])
  }

  // localStorage.setItem("neoword-item-0", `{"name":"a","timestamp":1764274410602,"words":{"1":{"word":"c","translations":["c"],"time":1764274414044,"isDifficult":false,"sentences":[]},"2":{"word":"b","translations":["b"],"time":1764274416191,"isDifficult":false,"sentences":[]},"3":{"word":"bad","translations":["bad"],"time":1764274420636,"isDifficult":false,"sentences":[]},"4":{"word":"a","translations":["a"],"time":1764274423134,"isDifficult":false,"sentences":[]},"5":{"word":"12","translations":["123"],"time":1764274425798,"isDifficult":false,"sentences":[]}}}`)
  // localStorage.setItem("neoword-books", "[0]")
  // localStorage.setItem("neoword-index", "6")

  useEffect(() => {
    const localTheme = localStorage.getItem("neoword-theme")
    const root = document.getElementById("root")
    root.className = ""
    root.classList.add(localTheme)
  }, [])

  const bookID = useBookStore(state => state.bookID)
  const game = useGameStore(state => state.game)

  const [recycle, setRecycle] = useState(false)
  const bookName = readLocal(`neoword-item-${bookID}`).name
  return (
    <>
      <Header bookName={bookName}/>
      {recycle ? <RecycleBin setRecycle={setRecycle}/> : !bookName ? <Library setRecycle={setRecycle}/> : game ? <Cards/> : <Words/>}
    </>
  )
}
