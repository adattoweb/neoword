import Dropdown from "../Dropdown/Dropdown"
import { useState } from "react"
import "./Header.css"

export default function Header({ isEn, setIsEn, bookName }){
    function changeLang(){
        localStorage.setItem("neoword-lang", !isEn ? "en" : "ua")
        setIsEn(!isEn)
        console.log(!isEn)
    }
    const localTheme = localStorage.getItem("neoword-theme")
    const [selected, setSelected] = useState(localTheme)
    function selectTheme(theme){
        const root = document.getElementById("root")
        root.className = ""
        root.classList.add(theme)
        setSelected(theme)
        localStorage.setItem("neoword-theme", theme)
    }
    function translate(theme) {
        const words = [
          { word: "blue", translate: "синій" },
          { word: "red", translate: "червоний" },
          { word: "orange", translate: "помаранчевий" },
          { word: "green", translate: "зелений" },
          { word: "purple", translate: "фіолетовий" },
        ]
      
        return words.find(item => item.word === theme).translate
      }
    return (
        <header className="header slide">
            <h2 className="header__name"><p>NeoWord</p><span>{bookName}</span></h2>
            <div className="header__right">
                <p onClick={changeLang} className="header__lang">{isEn ? "UA" : "EN"}</p>
                <Dropdown name={isEn ? selected : translate(selected)}>
                    <div className="header__theme red" onClick={() => selectTheme("red")}></div>
                    <div className="header__theme orange" onClick={() => selectTheme("orange")}></div>
                    <div className="header__theme green" onClick={() => selectTheme("green")}></div>
                    <div className="header__theme blue" onClick={() => selectTheme("blue")}></div>
                    <div className="header__theme purple" onClick={() => selectTheme("purple")}></div>
                </Dropdown>
            </div>
        </header>
    )
}