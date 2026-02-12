import styles from "./StreakModal.module.css"

import icon from "@/assets/vector/flame.svg"

import { Button } from "@/components/Modal/Constructor"

export default function Streak(){
    return (
        <Button className={`${styles.flame} without-cursor`}>
            <img className={styles.flame__icon} src={icon} alt="flame" draggable={false}/>
            <p className={styles.flame__text}>2</p>
        </Button>
    )
}