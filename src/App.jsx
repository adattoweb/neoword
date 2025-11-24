import Header from './components/Header/Header'
import Library from './pages/Library/Library'
import Words from "./pages/Words/Words"
import Cards from './pages/Cards/Cards'
import "./styles/animation.css"

import { useEffect, useState } from "react"
import { readLocal } from './helpers/readLocal'

export default function App() {
  const checkKeys = [["neoword-lang", "en"], ["neoword-index", "0"], ["neoword-theme", "blue"]]
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
  const [bookID, setBookID] = useState(false)
  const [game, setGame] = useState(false)
  const bookName = readLocal(`neoword-item-${bookID}`).name

  console.log(bookID)
  return (
    <>
      <Header isEn={isEn} setIsEn={setIsEn} bookName={bookName}/>
      {!bookName ? <Library setBookID={setBookID}/> : game ? <Cards bookID={bookID} game={game} setGame={setGame}/> : <Words bookID={bookID} setBookID={setBookID} setGame={setGame}/>}
    </>
  )
}
