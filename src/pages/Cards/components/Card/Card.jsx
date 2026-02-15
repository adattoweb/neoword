import { useEffect, useState } from "react"

import styles from "./Card.module.css"
import wordStyles from "@/pages/Words/Word/Word.module.css"

export default function Card({ wordsKeys, id, onlyWords, cardRef }) {

    const date = new Date(onlyWords[wordsKeys[id]].time)
    const [isRotated, setIsRotated] = useState(false)

    useEffect(() => {
        setIsRotated(false)
    }, [id])

    return (
        <div className={`${styles.card} ${isRotated ? styles.rotate : ""}`} onClick={() => setIsRotated(prev => !prev)}>
            <div className={styles.inner}>
                <div className={`${styles.front} gradient`}>
                    <p className={styles.word}>{wordsKeys[id] ? onlyWords[wordsKeys[id]].word : onlyWords[wordsKeys[id - 1]].word}</p>
                    <p className={styles.date}>{`${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`}</p>
                </div>
                <div className={`${styles.back} gradient`} ref={cardRef}>
                    <div className={wordStyles.translations}>
                        {onlyWords[wordsKeys[id]].translations.map((el, index) => <div key={index} className={wordStyles.translation}>{el}</div>)}
                    </div>
                </div>
            </div>
        </div>
    )
}