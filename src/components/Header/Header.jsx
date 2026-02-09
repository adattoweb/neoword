import Dropdown from "@/components/Dropdown/Dropdown"
import "./Header.css"
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
    return (
        <header className="header slide">
            <h2 className="header__name"><p>NeoWord</p><span>{bookName}</span></h2>
            <div className="header__right">
                <p onClick={changeLang} className="header__lang">{isEn ? "UA" : "EN"}</p>
                <Dropdown>
                    <Dropdown.Button className="gradient"/>
                    <Dropdown.Content className="without-border">
                        <div className="header__theme red" onClick={() => selectTheme("red")}></div>
                        <div className="header__theme orange" onClick={() => selectTheme("orange")}></div>
                        <div className="header__theme green" onClick={() => selectTheme("green")}></div>
                        <div className="header__theme blue" onClick={() => selectTheme("blue")}></div>
                        <div className="header__theme purple" onClick={() => selectTheme("purple")}></div>
                    </Dropdown.Content>
                </Dropdown>
            </div>
        </header>
    )
}