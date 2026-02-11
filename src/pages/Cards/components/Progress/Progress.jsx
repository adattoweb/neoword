import styles from "./Progress.module.css"
import "@/styles/back-gradient.css"

import { motion } from "framer-motion";

export default function Progress({ len, rand, id }) {
    const screenWidth = window.innerWidth
    const maxWidth = screenWidth > 230 && screenWidth > 700 ?  400 : screenWidth > 350 ? 300 : 230;
    let width = maxWidth * ((len - rand.current + id) % len / len)
    return (
        <div className={`${styles.progress} back-gradient`}>
            <motion.div initial={{ width: 0 }} animate={{ width: width }} className={`${styles.filled} gradient`} id="progress"></motion.div>
        </div>
    )
}