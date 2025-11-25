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

  // localStorage.setItem("neoword-index", "0")
  // localStorage.setItem("neoword-books", "1")
  // localStorage.setItem("neoword-item-1", "1^1764076757533^6@^word*translation*1764076767841*false^123*3123*1764078030760*true^312321*312esaf*1764078034650*false^fsdf*sdfsdfsdf*1764078037238*false^fsdfsd*dsfsdfds*1764078039595*false^sdfsdf*sdfsdfsd*1764078042073*false")

  const booksStr = localStorage.getItem("neoword-books")
  if (!booksStr.includes("[")) {
    const books = booksStr.split("^")
    console.log(books)
    const newBooks = []
    for (let i = 0; i < books.length; i++) {
      const key = books[i]
      const bookArray = localStorage.getItem(`neoword-item-${key}`).split("@")
      const bookInfo = bookArray[0].split("^")
      const newBook = {
        name: bookInfo[0],
        timestamp: +bookInfo[1],
        words: {}
      }

      const bookWords = bookArray[1].split("^").map(el => el.split("*"))
      console.log(bookWords)
      for (let j = 0; j < bookWords.length; j++) {
        let bool = bookWords[j][3] === "true"
        const newWord = {
          word: bookWords[j][0],
          translation: bookWords[j][1],
          time: +bookWords[j][2],
          isDifficult: bool,
          sentences: []
        }
        const index = +localStorage.getItem("neoword-index")
        localStorage.setItem("neoword-index", index + 1)
        newBook.words[index] = newWord
      }
      const index = +localStorage.getItem("neoword-index")
      localStorage.setItem("neoword-index", index + 1)
      newBooks.push(index)
      localStorage.setItem(`neoword-item-${index}`, JSON.stringify(newBook))
      localStorage.removeItem(`neoword-item-${key}`)
    }
    localStorage.setItem("neoword-books", JSON.stringify(newBooks))
  }

  const [isEn, setIsEn] = useState(localStorage.getItem("neoword-lang") === "en")
  const [bookID, setBookID] = useState(false)
  const [game, setGame] = useState(false)
  const bookName = readLocal(`neoword-item-${bookID}`).name

  return (
    <>
      <Header isEn={isEn} setIsEn={setIsEn} bookName={bookName}/>
      {!bookName ? <Library setBookID={setBookID}/> : game ? <Cards bookID={bookID} game={game} setGame={setGame}/> : <Words bookID={bookID} setBookID={setBookID} setGame={setGame}/>}
    </>
  )
}
