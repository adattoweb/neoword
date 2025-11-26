import Dropdown from "../../components/Dropdown/Dropdown"

export default function WordsHeader({ setGame, selected, setSelected, searchBy, setSearchBy, search, setSearch, words }) {
    const isEn = localStorage.getItem("neoword-lang") === "en"
    function updateGame(game){
        if(Object.keys(words).length === 0) return
        setGame(game)
    }
    return (
        <div className="wordsheader slide">
            <div className="wordsheader__menu">
                <div className="wordsheader__game">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12H12m-8.25 5.25h16.5" />
                </svg>
                </div> 
            </div>
            <div className="words__games">
                <div className="wordsheader__game">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" onClick={() => updateGame("enter")}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 0 1 0 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 0 1 0-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375Z" />
                    </svg>
                </div>
                <div className="wordsheader__game">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" onClick={() => updateGame("know")}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 6.087c0-.355.186-.676.401-.959.221-.29.349-.634.349-1.003 0-1.036-1.007-1.875-2.25-1.875s-2.25.84-2.25 1.875c0 .369.128.713.349 1.003.215.283.401.604.401.959v0a.64.64 0 0 1-.657.643 48.39 48.39 0 0 1-4.163-.3c.186 1.613.293 3.25.315 4.907a.656.656 0 0 1-.658.663v0c-.355 0-.676-.186-.959-.401a1.647 1.647 0 0 0-1.003-.349c-1.036 0-1.875 1.007-1.875 2.25s.84 2.25 1.875 2.25c.369 0 .713-.128 1.003-.349.283-.215.604-.401.959-.401v0c.31 0 .555.26.532.57a48.039 48.039 0 0 1-.642 5.056c1.518.19 3.058.309 4.616.354a.64.64 0 0 0 .657-.643v0c0-.355-.186-.676-.401-.959a1.647 1.647 0 0 1-.349-1.003c0-1.035 1.008-1.875 2.25-1.875 1.243 0 2.25.84 2.25 1.875 0 .369-.128.713-.349 1.003-.215.283-.4.604-.4.959v0c0 .333.277.599.61.58a48.1 48.1 0 0 0 5.427-.63 48.05 48.05 0 0 0 .582-4.717.532.532 0 0 0-.533-.57v0c-.355 0-.676.186-.959.401-.29.221-.634.349-1.003.349-1.035 0-1.875-1.007-1.875-2.25s.84-2.25 1.875-2.25c.37 0 .713.128 1.003.349.283.215.604.401.96.401v0a.656.656 0 0 0 .658-.663 48.422 48.422 0 0 0-.37-5.36c-1.886.342-3.81.574-5.766.689a.578.578 0 0 1-.61-.58v0Z" />
                    </svg>
                </div>
                <div className="wordsfilter">
                    <Dropdown name={!isEn ? ((selected === "All" && "Всі") || (selected === "Difficult" && "Складні") || (selected === "Easy" && "Легкі")) : selected}>
                        <p onClick={() => setSelected("All")}>{isEn ? "All" : "Всі"}</p>
                        <p onClick={() => setSelected("Difficult")}>{isEn ? "Difficult" : "Складні"}</p>
                        <p onClick={() => setSelected("Easy")}>{isEn ? "Easy" : "Легкі"}</p>
                    </Dropdown>
                </div>
            </div>
            <div className="wordsfind__wrapper">
                <div className="wordsfind">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                    </svg>
                    <input type="text" className="wordsfind__input" placeholder={isEn ? "Search your word" : "Пошук слова"} value={search} onChange={(e) => setSearch(e.target.value)} />
                </div>
                <div className="wordsfilter">
                    <Dropdown name={searchBy === "unknown" ? isEn ? "Search by" : "Шукати за" : !isEn ? ((searchBy === "original" && "Оригінал") || (searchBy === "translation" && "Переклад")) : searchBy}>
                        <p onClick={() => setSearchBy("original")}>{isEn ? "Original" : "Оригінал"}</p>
                        <p onClick={() => setSearchBy("translation")}>{isEn ? "Translation" : "Переклад"}</p>
                    </Dropdown>
                </div>
            </div>
        </div>
    )
}