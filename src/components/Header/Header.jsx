import Dropdown from "@/components/Dropdown/Dropdown"
import styles from "./Header.module.css"
import { useLangStore } from "@/stores/useLangStore"

export default function Header({ bookName }){
    const isEn = useLangStore(state => state.isEn)
    const setIsEn = useLangStore(state => state.setIsEn)

    function changeLang(){
        setIsEn(!isEn)
    }
    function selectTheme(theme){
        const root = document.getElementById("root")
        root.className = ""
        root.classList.add(theme)
        localStorage.setItem("neoword-theme", theme)
    }
    const colours = ["red", "orange", "green", "blue", "purple", "sea"]
    return (
        <header className={`${styles.header} slide`}>
            <h2 className={styles.header__name}><p>Neoword</p><span>{bookName}</span></h2>
            <div className={styles.header__right}>
                <p onClick={changeLang} className={styles.header__lang}>{isEn ? "UA" : "EN"}</p>
                <Dropdown className={styles.dropdown}>
                    <Dropdown.Button className={`${styles.header__theme} gradient`}/>
                    <Dropdown.Content className={`${styles.dropdown__content} without-border`}>
                        {colours.map(el => {
                            return <div key={el} className={`${styles.header__theme} ${styles[el]}`} onClick={() => selectTheme(el)}></div>
                        })}
                    </Dropdown.Content>
                </Dropdown>
            </div>
        </header>
    )
}