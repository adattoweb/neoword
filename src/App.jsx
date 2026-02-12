import Header from './components/Header/Header'
import Library from './pages/Library/Library'
import Words from "./pages/Words/Words"
import Cards from './pages/Cards/Cards'
import "./styles/animation.css"

import { useLayoutEffect, useState } from "react"
import { readLocal } from './helpers/readLocal'
import RecycleBin from './pages/RecycleBin/RecycleBin'
import { useBookStore } from './stores/useBookStore'
import { useGameStore } from './stores/useGameStore'

export default function App() {
  const date = new Date()
  const today = [date.getDate(), date.getMonth() + 1, date.getFullYear()]
  const checkKeys = [["neoword-lang", "en"], ["neoword-index", "0"], ["neoword-theme", "blue"], ["neoword-books", "[]"], ["neoword-recycle", "[]"], ["neoword-lastdate", JSON.stringify(today)]]
  for(let i = 0; i < checkKeys.length; i++){
    const localKey = checkKeys[i][0]
    if(!localStorage.getItem(localKey)) localStorage.setItem(localKey, checkKeys[i][1])
  }

  useLayoutEffect(() => {
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
