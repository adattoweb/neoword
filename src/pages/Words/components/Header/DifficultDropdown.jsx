import Dropdown from "@/components/Dropdown/Dropdown"
import { useLangStore } from "@/stores/useLangStore"

export default function DifficultDropdown({ selected, setSelected, }){
    const isEn = useLangStore(state => state.isEn)
    return (
        <Dropdown>
            <Dropdown.Button>
                <p>{!isEn ? ((selected === "All" && "Всі") || (selected === "Difficult" && "Складні") || (selected === "Easy" && "Легкі")) : selected}</p>
            </Dropdown.Button>
            <Dropdown.Content>
                <p onClick={() => setSelected("All")}>{isEn ? "All" : "Всі"}</p>
                <p onClick={() => setSelected("Difficult")}>{isEn ? "Difficult" : "Складні"}</p>
                <p onClick={() => setSelected("Easy")}>{isEn ? "Easy" : "Легкі"}</p>
            </Dropdown.Content>
        </Dropdown>
    )
}