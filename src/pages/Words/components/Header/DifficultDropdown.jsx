import Dropdown from "../../../../components/Dropdown/Dropdown"
import { useLangStore } from "../../../../stores/useLangStore"

export default function DifficultDropdown({ selected, setSelected, }){
    const isEn = useLangStore(state => state.isEn)
    return (
        <div className="wordsfilter">
        <Dropdown name={!isEn ? ((selected === "All" && "Всі") || (selected === "Difficult" && "Складні") || (selected === "Easy" && "Легкі")) : selected}>
            <p onClick={() => setSelected("All")}>{isEn ? "All" : "Всі"}</p>
            <p onClick={() => setSelected("Difficult")}>{isEn ? "Difficult" : "Складні"}</p>
            <p onClick={() => setSelected("Easy")}>{isEn ? "Easy" : "Легкі"}</p>
        </Dropdown>
    </div>
    )
}