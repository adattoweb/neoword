import styles from "@/pages/Words/Word/Word.module.css"

export default function Word({ word }){
    const date = new Date(word.time)
    return (
        <div className={`${styles.word} gradient without-cursor`}>
            <div className={styles.text}>
                <p className={styles.word__word}>{word.word}</p>
                <div className={styles.translations}>
                    {word.translations.map((el, index) => <div key={index} className={styles.translation}>{el}</div>)}
                </div>
            </div>
            <div className={styles.date}>{`${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`}</div>
        </div>
    )
}