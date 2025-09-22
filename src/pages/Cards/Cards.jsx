import "./Cards.css"
import { useState, useRef, useEffect } from "react"
import EndModal from "./EndModal"

import wordKnowed from "../../assets/wordKnowed.mp3"
import wordForgot from "../../assets/wordForgot.mp3"

import { motion } from "framer-motion"

export default function Cards({ bookName, game, setGame }){
    const isEn = localStorage.getItem("neoword-lang") === "en"
    const localBook = localStorage.getItem(`neoword-item-${bookName}`)
    let array = localBook ? localBook.split("@")[1].split("^").map(el => el.split("*")) : []
    array = array.filter(el => el[0] !== "")
    const [id, setId] = useState(0)
    const [isOpen, setIsOpen] = useState(false)
    const bads = useRef(0)
    const badWords = useRef([])
    const rights = useRef(0)
    const screenWidth = window.innerWidth
    const maxWidth = screenWidth > 230 && screenWidth > 700 ?  400 : screenWidth > 350 ? 300 : 230;
    console.log(maxWidth, screenWidth)
    let width = maxWidth * (id / array.length)
    function incrementId(isRight){
        if(id + 1 === array.length){
            setIsOpen(true)
        }
        if(isRight){
            rights.current++
            const audio = new Audio(wordKnowed)
            audio.play();
        } else {
            const audio = new Audio(wordForgot)
            audio.play();
            bads.current++
            badWords.current.push(array[id][0])
        }
        setId(prev => prev + 1)
    }
    const date = new Date(array[id] ? +array[id][2] : isOpen ? +array[id-1][2] : 0)
    function KnowFooter() {
        return (
            <div className="cardsfooter">
                <div className="cardsfooter__button forgot" onClick={() => incrementId(false)}>{isEn ? "Forgot" : "Забув"}</div>
                <div className="cardsfooter__button know" onClick={() => incrementId(true)}>{isEn ? "Got it" : "Знаю"}</div>
            </div>
        )
    }
    function InputFooter() {
        const [word, setWord] = useState("")
        const inputRef = useRef()
        const translation = array[id] ? array[id][1] : "www"
        useEffect(() =>{
            if(id === array.length){
                setIsOpen(true)
                inputRef.current.disabled = true;
            }
            if(word.toLowerCase() === translation.toLowerCase()){
                setId(prev => prev + 1)
                rights.current++;
                const audio = new Audio(wordKnowed)
                audio.play();
            }
        }, [word])
        useEffect(() => {
            inputRef.current.focus()
        }, [])
        return (
            <div className="cardsfooter">
                <div className="cardsenter">
                    <input type="text" ref={inputRef} className="cardsenter__input" placeholder={isEn ? "Enter the translation" : "Введіть переклад"} value={word} onChange={(e) => setWord(e.target.value)}/>
                </div>
            </div>
        )
    }
    if(array.length === 0) setGame(false)
    function Card(){
        const [isRotate, setIsRotate] = useState(false)
        return (
            <div className={isRotate ? "card rotate" : "card"} onClick={() => setIsRotate(prev => !prev)}>
                <div className="card__inner">
                    <div className="card__front gradient">
                        <p className="card__word">{array[id] ? array[id][0] : array[id - 1][0]}</p>
                        <p className="card__date">{`${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`}</p>
                    </div>
                    <div className="card__back gradient">
                        <p className="card__word">{array[id] ? array[id][1] : array[id - 1][1]}</p>
                    </div>
                </div>
            </div>
        )
    }
    return (
        <div className="cards content">
            <EndModal isOpen={isOpen} setIsOpen={setIsOpen} game={game} setGame={setGame} bads={bads.current} rights={rights.current} badWords={badWords.current}/>
            <div className="back" onClick={() => setGame(false)}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
                </svg>
                <p>{isEn ? "Go back" : "Повернутися назад"}</p>
            </div>
            <div className="cards__content">
                <div className="cardsheader">
                    <div className="cardsheader__info">
                        <div className="cardsheader__total">{isEn ? "Total" : "Всього"}: <span id="total">{id}/{array.length}</span></div>
                        <div className="cardsheader__reset" onClick={() => setId(0)}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#002E9A">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                            </svg>
                            <p>{isEn ? "Reset" : "Збросити"}</p>
                        </div>
                    </div>
                    <div className="cardsprogress">
                        <motion.div initial={{width : 0}} animate={{width: width}} className="cardsprogress__fill gradient" id="progress"></motion.div>
                    </div>
                    <Card/>
                </div>
                {game === "know" ? <KnowFooter/> : <InputFooter/>}
            </div>
        </div>
    )
}