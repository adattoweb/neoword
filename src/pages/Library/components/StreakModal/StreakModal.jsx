import { useLangStore } from "@/stores/useLangStore"

import Modal from "@/components/Modal/Modal"
import { Button, ButtonWrapper, Header } from "@/components/Modal/Constructor"

import Word from "./Word"
import Streak from "./Streak"

import styles from "./StreakModal.module.css"
import { getRandomWord } from "./helpers/getRandomWord"

export default function StreakModal({ isOpen, setIsOpen, books }) {
    const isEn = useLangStore(state => state.isEn)

    const word = getRandomWord(books)
    if(!word) return false

    return (
        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} withClose={false}>
            <Header className={styles.header}>{isEn ? "Word of the day" : "Слово дня"}</Header>
            <div className={styles.wrapper}>
                <Word word={word}/>
            </div>
            <ButtonWrapper>
                <Streak/>
                <Button className={`${styles.okay} gradient`} onClick={() => setIsOpen(false)}>{isEn ? "Okay" : "Добре"}</Button>
            </ButtonWrapper>
        </Modal>
    )
}