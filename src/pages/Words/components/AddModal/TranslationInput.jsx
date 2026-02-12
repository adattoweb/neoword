import { useState } from "react"
import { useLangStore } from "@/stores/useLangStore";
import { Input } from "@/components/Modal/Constructor";

import styles from "./TranslationInput.module.css"


export default function TranslationInput({ value, index, error, setError, translations, setTranslations, forbidden, }){
    const [translation, setTranslation] = useState(value)
    const isEn = useLangStore(state => state.isEn)
    function editTranslation(value){
        if (forbidden.test(value)) {
            setError({ text: isEn ? 'Remove forbidden characters (^@$[]{}")' : 'Приберіть заборонені символи (^@$[]{}")', id: 2 });
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
        <div className={styles.translation}>
            <Input type="text" placeholder={isEn ? "Translatation" : "Переклад"} hasError={error.id > 0 && error.id === 2} value={translation} onChange={(e) => editTranslation(e.target.value)}/>
            {index > 0 && <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className={styles.cross} onClick={removeTranslation}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>}
        </div>
    )
}