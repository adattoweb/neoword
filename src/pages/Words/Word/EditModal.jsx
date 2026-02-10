import Modal from "@/components/Modal/Modal"
import { useEffect, useRef, useState } from "react"
import { AnimatePresence } from "framer-motion"

import DeleteModal from "@/pages/Library/Dictionary/DeleteModal"
import TranslationInput from "../components/AddModal/TranslationInput"
import { useLangStore } from "@/stores/useLangStore"

import { Button, ButtonWrapper, Error, Input, InputWrapper, Header } from "@/components/Modal/Constructor"

import styles from "@/components/Modal/Modal.module.css"

export default function EditModal({ words, isOpen, setIsOpen, editWord, oldWord, oldTranslations, oldIsDifficult, remove }) {

    const isEn = useLangStore(state => state.isEn)

    const [isDeleteOpen, setIsDeleteOpen] = useState(false)

    const [word, setWord] = useState(oldWord)
    const [translations, setTranslations] = useState(oldTranslations)
    const [error, setError] = useState({text: "", id: -1})

    const forbidden = /[\^@$[\]{}"]/;

    const errorTimeout = useRef(null);

    useEffect(() => {
        if (errorTimeout.current) {
            clearTimeout(errorTimeout.current);
        }
        errorTimeout.current = setTimeout(() => {
            setError({ text: "", id: -1 });
            errorTimeout.current = null;
        }, 5000);
    }, [error])

    function editElement() {
        if(word.length === 0 || translations.length === 0){
            setError({ text: isEn ? "Enter the field" : "Заповніть поле", id: word.length === 0 ? 1 : 2 });
            return
        }

        if (forbidden.test(word) || forbidden.test(translations)) {;
            setError(isEn ? "Remove forbidden characters (^ @ $ [ ] { } \")" : "Приберіть заборонені символи (^ @ $ [ ] { } \")");
            return;
        }
        if(Object.keys(words).find(key => words[key].word === word && words[key].word !== oldWord)){
            setError({ text: isEn ? "This word already exists" : "Таке слово вже існує", id: 1 });
            return
        }
        if(translations.some((el, index) => translations.indexOf(el) !== index)){
            setError({ text: isEn ? "This translation already exists" : "Такий переклад вже існує", id: 2 });
            return
        }
        if(translations.some(el => el.length === 0)){
            setError({ text: isEn ? "Enter the translation" : "Заповніть переклад", id: 2 });
            return
        }

        editWord(word, translations, oldIsDifficult)
        setError({text: "", id: -1})
        setIsOpen(false)
    }

    function addTranslation(){
        if(translations.length > 9) {
            setError({ text: isEn ? "Maximum 10 translations!" : "Максимум 10 перекладів!", id: 2 });
            return
        }
        const newTranslations = [...translations]
        newTranslations.push("")
        setTranslations(newTranslations)
    }
    
    return (
        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
            <Header>{isEn ? "Editing a word" : "Редагування слова"}</Header>
            <InputWrapper>
                <Input type="text" placeholder={isEn ? "Word" : "Слово"} hasError={error.id === 1} value={word} onChange={(e) => setWord(e.target.value)} />
                {translations.map((el, index) => <TranslationInput key={index} value={el} index={index} error={error.text} setError={setError} translations={translations} setTranslations={setTranslations} forbidden={forbidden} />)}
                <p className={`${styles.add} gradient`} onClick={addTranslation}>{isEn ? "Add new translation" : "Додати новий переклад"}</p>
            </InputWrapper>
            <DeleteModal isOpen={isDeleteOpen} setIsOpen={setIsDeleteOpen} remove={remove} />
            <AnimatePresence mode="wait">
                <Error hasError={error.id > 0} message={error.text} />
            </AnimatePresence>
            <ButtonWrapper>
                <Button className={styles.modal__delete} onClick={() => setIsDeleteOpen(true)}>{isEn ? "Delete" : "Видалити"}</Button>
                <Button className="gradient" onClick={editElement}>{isEn ? "Save" : "Зберегти"}</Button>
            </ButtonWrapper>
        </Modal>
    )
}