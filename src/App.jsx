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
  const storageDefaults = {
    "neoword-lang": "en",
    "neoword-index": "0",
    "neoword-theme": "blue",
    "neoword-books": "[]",
    "neoword-recycle": "[]",
    "neoword-lastdate": date.getDate(),
    "neoword-streak": "1",
    "neoword-lasttime": date.getTime(),
  }
  for (const key in storageDefaults) {
    if (!localStorage.getItem(key)) {
      localStorage.setItem(key, storageDefaults[key])
    }
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
      {recycle ? <RecycleBin setRecycle={setRecycle}/> : !bookName ? <Library setRecycle={setRecycle}/> : game.game ? <Cards/> : <Words/>}
    </>
  )
}
