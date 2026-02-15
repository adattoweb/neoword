import { useState, useRef, useEffect } from "react"

import wordKnowed from "@/assets/audio/wordKnowed.mp3"
import wordForgot from "@/assets/audio/wordForgot.mp3"

import { getWords } from "./helpers/getWords"
import { random } from "@/helpers/random"

import { useGameStore } from "@/stores/useGameStore"
import { useLangStore } from "@/stores/useLangStore"

import Progress from "./components/Progress/Progress"
import Back from "@/components/Back/Back"
import EndModal from "./components/EndModal/EndModal"
import Card from "./components/Card/Card"
import Footer from "./components/Footer/Footer"

import "@/styles/svg-gradient.css"
import styles from "./Cards.module.css"


export default function Cards(){
    const game = useGameStore(state => state.game.game)
    const setGame = useGameStore(state => state.setGame)

    const isEn = useLangStore(state => state.isEn)
    const { wordsKeys, onlyWords } = getWords()

    console.log("----")
    console.log(wordsKeys)
    console.log(onlyWords)

    const rand = useRef(random(0, wordsKeys.length))
    const [id, setId] = useState(rand.current)
    const [isOpen, setIsOpen] = useState(false)
    const bads = useRef(0)
    const badWords = useRef([])
    const rights = useRef(0)

    const cardRef = useRef()
    function incrementId(isRight){
        console.log("====")
        if((id + 1) % wordsKeys.length === rand.current){
            setIsOpen(true)
            setId(id-1)
        }
        if(isRight){
            rights.current++
            const audio = new Audio(wordKnowed)
            audio.play();
        } else {
            const audio = new Audio(wordForgot)
            audio.play();
            bads.current++
            badWords.current.push(onlyWords[wordsKeys[id]].word)
        }
        setId(prev => (prev + 1) % wordsKeys.length)
        cardRef.current.classList.add(styles.blur)
        setTimeout(() => {
            cardRef.current.classList.remove(styles.blur)
        }, 300)
    }
    useEffect(() => {
        if (wordsKeys.length === 0) {
          setGame({ game: false, mode: false });
        }
      }, [wordsKeys.length]);

    function reset(){
        setId(0)
        bads.current = 0
        badWords.current = []
        rights.current = 0
        rand.current = 0
    }
    if (wordsKeys.length === 0) return
    return (
        <div className={`${styles.cards} content`}>
            <EndModal isOpen={isOpen} setIsOpen={setIsOpen} game={game} setGame={setGame} bads={bads.current} rights={rights.current} badWords={badWords.current}/>
            <Back onClick={() => setGame({game: false, mode: false})}/>
            <div className={styles.content}>
                <div className={styles.header}>
                    <div className={styles.info}>
                        <div className={`${styles.total} gradient`}>{isEn ? "Total" : "Всього"}: <span id="total">{(wordsKeys.length - rand.current + id) % wordsKeys.length}/{wordsKeys.length}</span></div>
                        <div className={`${styles.reset} gradient`} onClick={reset}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" className="svg-gradient">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                            </svg>
                            <p>{isEn ? "Reset" : "Збросити"}</p>
                        </div>
                    </div>
                    <Progress len={wordsKeys.length} rand={rand} id={id}/>
                    <Card wordsKeys={wordsKeys} id={id} onlyWords={onlyWords} cardRef={cardRef}/>
                </div>
                <Footer incrementId={incrementId} game={game} wordsKeys={wordsKeys} id={id} onlyWords={onlyWords}/>
            </div>
        </div>
    )
}