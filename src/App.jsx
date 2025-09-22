import Header from './components/Header/Header'
import Library from './pages/Library/Library'
import Words from "./pages/Words/Words"
import Cards from './pages/Cards/Cards'

import { useEffect, useState } from "react"

export default function App() {
  const checkKeys = [["neoword-lang", "en"], ["neoword-index", "0"], ["neoword-books",""], ["neoword-theme", "blue"]]
  for(let i = 0; i < checkKeys.length; i++){
    const localKey = checkKeys[i][0]
    if(!localStorage.getItem(localKey)) localStorage.setItem(localKey, checkKeys[i][1])
  }

  useEffect(() => {
    const localTheme = localStorage.getItem("neoword-theme")
    const root = document.getElementById("root")
    root.className = ""
    root.classList.add(localTheme)
  }, [])
  const [isEn, setIsEn] = useState(localStorage.getItem("neoword-lang") === "en")
  const [bookName, setBookName] = useState(false)
  const [game, setGame] = useState(false)
  return (
    <>
      <Header isEn={isEn} setIsEn={setIsEn} bookName={bookName}/>
      {!bookName ? <Library setBookName={setBookName}/> : game ? <Cards bookName={bookName} game={game} setGame={setGame}/> : <Words bookName={bookName} setBookName={setBookName} setGame={setGame}/>}
    </>
  )
}
