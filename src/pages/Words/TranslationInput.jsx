import { useState } from "react"
import { useLangStore } from "../../stores/useLangStore";


export default function TranslationInput({ value, index, disableError, error, setError, errorID, setErrorID, translations, setTranslations, forbidden, }){
    const [translation, setTranslation] = useState(value)
    const isEn = useLangStore(state => state.isEn)
    function editTranslation(value){
        if (forbidden.test(value)) {
            disableError();
            setError(isEn ? "Remove forbidden characters (^@$[]{}\")" : "Приберіть заборонені символи (^@$[]{}\")");
            setErrorID(2)
            return;
        }
        translations[index] = value // (!) Не використовую setTranslations, тому що вже рендерю це в setTranslation

        setTranslation(value)
    }
    function removeTranslation(){
        const newTranslations = [...translations]
        newTranslations.splice(index, 1)
        setTranslations(newTranslations)
    }
    return (
        <div className="translation">
            <input type="text" placeholder={isEn ? "Translatation" : "Переклад"} className={error && errorID === 2 ? "modal__input error" : "modal__input"} value={translation} onChange={(e) => editTranslation(e.target.value)} />
            {index > 0 &&<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="translation__cross" onClick={removeTranslation}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>}
        </div>
    )
}