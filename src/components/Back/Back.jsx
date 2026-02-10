import styles from "./Back.module.css"

export default function Back({ onClick }){
    const isEn = localStorage.getItem("neoword-lang") === "en"
    return (
        <div className={`${styles.back} slide`} onClick={onClick}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
        </svg>
        <p>{isEn ? "Go back" : "Повернутися назад"}</p>
    </div>
    )
}