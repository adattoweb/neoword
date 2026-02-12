import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion"

import styles from "./Modal.module.css"

export default function Modal({ isOpen, onClose, children, className = "", withClose = true}){
    return createPortal(
      <AnimatePresence mode="wait">
        {isOpen && <motion.div key="overlay" initial={{background: "rgba(0,0,0,0.0)", backdropFilter: "blur(0px)"}} animate={{background: "rgba(0,0,0,0.5)", backdropFilter: "blur(1px)"}} exit={{background: "rgba(0,0,0,0.0)", backdropFilter: "blur(0px)"}} className={styles.modal__overlay} onClick={(e) => {e.stopPropagation();onClose()}}>
          <motion.div className={`${styles.modal} ${className}`} onClick={(e) => e.stopPropagation()} initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}} key="modal">
            {withClose && <div className={styles.cross}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className={styles.cross__item} onClick={onClose}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            </div>}
            {children}
          </motion.div>
        </motion.div>}
        </AnimatePresence>,
        document.getElementById("root")
      );
}