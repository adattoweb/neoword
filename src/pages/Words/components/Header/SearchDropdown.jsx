import Dropdown from "@/components/Dropdown/Dropdown"
import { useLangStore } from "@/stores/useLangStore"

export default function SearchDropdown({ searchBy, setSearchBy }) {
    const isEn = useLangStore(state => state.isEn)
    return (
        <Dropdown>
            <Dropdown.Button>
                <p>{searchBy === "unknown" ? isEn ? "Search by" : "Шукати за" : !isEn ? ((searchBy === "original" && "Оригінал") || (searchBy === "translation" && "Переклад")) : searchBy === "original" ? "Original" : "Translation"}</p>
            </Dropdown.Button>
            <Dropdown.Content>
                <p onClick={() => setSearchBy("original")}>{isEn ? "Original" : "Оригінал"}</p>
                <p onClick={() => setSearchBy("translation")}>{isEn ? "Translation" : "Переклад"}</p>
            </Dropdown.Content>
        </Dropdown>
    )
}