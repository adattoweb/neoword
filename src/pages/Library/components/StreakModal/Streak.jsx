import styles from "./StreakModal.module.css"

import icon from "@/assets/vector/flame.svg"

import { Button } from "@/components/Modal/Constructor"
import { useRef } from "react"
import { getStreak } from "./helpers/getStreak"

export default function Streak(){
    const streak = useRef(getStreak())
    return (
        <Button className={`${styles.flame} without-cursor`}>
            <img className={styles.flame__icon} src={icon} alt="flame" draggable={false}/>
            <p className={styles.flame__text}>{streak.current}</p>
        </Button>
    )
}