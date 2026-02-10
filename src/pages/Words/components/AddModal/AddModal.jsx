import Modal from "@/components/Modal/Modal"
import { useEffect, useRef, useState } from "react"
import { AnimatePresence } from "framer-motion"
import { readLocal } from "@/helpers/readLocal"

import TranslationInput from "./TranslationInput"
import { useBookStore } from "@/stores/useBookStore"
import { useLangStore } from "@/stores/useLangStore"
import { useWordsStore } from "@/stores/useWordsStore"
import { Button, ButtonWrapper, Error, Input, InputWrapper, Header } from "@/components/Modal/Constructor"

import styles from "@/components/Modal/Modal.module.css"

export default function AddModal({ isOpen, setIsOpen }) {
    const bookID = useBookStore(state => state.bookID)
    const setWords = useWordsStore(state => state.setWords)

    const isEn = useLangStore(state => state.isEn)
    const [word, setWord] = useState("")
    const [translations, setTranslations] = useState([""])
    const [error, setError] = useState({text: "", id: -1})
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

    const forbidden = /[\^@$[\]{}"]/;
    
    function addElement() {
        if(word.length === 0 || translations.length === 0){
            setError({text: isEn ? "Enter the field" : "Заповніть поле", id: word.length === 0 ? 1 : 2});
            return
        }
        if(forbidden.test(word)) {
            setError({ text: isEn ? 'Remove forbidden characters (^@$[]{}")' : 'Приберіть заборонені символи (^@$[]{}")', id: 1 });
            return;
        }
        if(translations.some(el => el.length === 0)){
            setError({ text: isEn ? "Enter all fields" : "Заповніть усі поля", id: word.length === 0 ? 1 : 2 });
            return
        }
        if(translations.some((el, index) => translations.indexOf(el) !== index)){
            setError({ text: isEn ? "This translation already exists" : "Такий переклад вже існує", id: 2 });
            return
        }
        function endAdding(){
            const newWords = {...book.words}
            localStorage.setItem(`neoword-item-${bookID}`, JSON.stringify(book))
            setWords(newWords)
            setError({text: "", id: -1})
            setWord("")
            setTranslations([""])
            setIsOpen(false)
        }
        const book = readLocal(`neoword-item-${bookID}`)
        const words = book.words
        const firstLetter = word[0].toLowerCase()
        if(Object.keys(words).includes(firstLetter) && Object.values(words[firstLetter]).some(el => el.word === word) ){
            setError({ text: isEn ? "Adding a new translation" : "Додаю новий переклад", id: 3 });
            const key = Object.keys(words[firstLetter]).find(key => words[firstLetter][key].word === word)
            book.words[firstLetter][key].translations.push(...translations)
            setTimeout(() => endAdding(), 2000)
            return
        }
        const now = new Date()
        const id = +localStorage.getItem("neoword-index")
        localStorage.setItem("neoword-index", id+1)
        if(!book.words[firstLetter]) book.words[firstLetter] = {}
        book.words[firstLetter][id] = {
            word: word,
            translations: translations,
            time: now.getTime(),
            isDifficult: false,
            sentences: []
        }
        endAdding()
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
            <Header>{isEn ? "Creating a word" : "Створення слова"}</Header>
            <InputWrapper>
                <Input type="text" placeholder={isEn ? "Word" : "Слово"} hasError={error.id === 1} value={word} onChange={(e) => setWord(e.target.value)}/>
                {translations.map((el, index) => <TranslationInput key={index} value={el} index={index} error={error} setError={setError} translations={translations} setTranslations={setTranslations} forbidden={forbidden}/>)}
                <p className={`${styles.add} gradient`} onClick={addTranslation}>{isEn ? "Add a new translation" : "Додати новий переклад"}</p>
            </InputWrapper>
            <AnimatePresence mode="wait">
                <Error hasError={error.id > 0} message={error.text}/>
            </AnimatePresence>
            <ButtonWrapper className={styles.one}>
                <Button onClick={addElement}>{isEn ? "Create" : "Створити"}</Button>
            </ButtonWrapper>
        </Modal>
    )
}