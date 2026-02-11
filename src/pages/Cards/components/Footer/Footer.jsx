import { useState } from "react"
import { useLangStore } from "@/stores/useLangStore"

import styles from "./Footer.module.css"

export default function Footer({ incrementId, game, onlyWords, wordsKeys, id }) {
    const isEn = useLangStore(state => state.isEn)

    function KnowFooter() {
        return (
            <div className={styles.footer}>
                <div className={`${styles.button} ${styles.forgot}`} onClick={() => incrementId(false)}>{isEn ? "Forgot" : "Забув"}</div>
                <div className={`${styles.button} ${styles.know}`} onClick={() => incrementId(true)}>{isEn ? "Got it" : "Знаю"}</div>
            </div>
        )
    }
    function InputFooter() {
        const [word, setWord] = useState("")
        const translations = onlyWords[wordsKeys[id]].translations

        function checkAnswer(word) {
            if (translations.some(el => el.toLowerCase() === word.toLowerCase())) { // Якщо користувач написав правильний переклад
                incrementId(true)
            }
            setWord(word)
        }
        return (
            <div className={styles.footer}>
                <div className={styles.enter}>
                    <input type="text" autoFocus className={styles.input} placeholder={isEn ? "Enter the translation" : "Введіть переклад"} value={word} onChange={(e) => checkAnswer(e.target.value)} />
                </div>
            </div>
        )
    }

    return game === "know" ? <KnowFooter/> : <InputFooter/>
}