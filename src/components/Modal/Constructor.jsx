import { motion } from "framer-motion"
import styles from "./Modal.module.css"

export function ButtonWrapper({ className = "", children }){
    return <div className={`${styles.modal__buttons} ${className}`}>{children}</div>
}

export function Button({ className = "", onClick, children }){
    return <div className={`${className} gradient ${styles.modal__button}`} onClick={onClick}>{children}</div>
}

export function Error({ hasError, message }) {
    return hasError && <motion.div className={styles.modal__error} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>{message}</motion.div>
}

export function InputWrapper({ className = "", children }){
    return <div className={`${styles.modal__inputs} ${className}`}>{children}</div>
}

export function Input({ type, placeholder, hasError, value, onChange, max }){
    return <input type={type} maxLength={max} placeholder={placeholder} className={`${styles.modal__input} ${hasError ? styles.error : ""}`} value={value} onChange={onChange} />
}

export function Header({ children }){
    return <div className={styles.modal__header}>{children}</div>
}
  