import Modal from "@/components/Modal/Modal"
import { useEffect, useRef, useState } from "react"
import { AnimatePresence } from "framer-motion"
import { readLocal } from "@/helpers/readLocal"
import { useLangStore } from "@/stores/useLangStore"

import { Button, ButtonWrapper, Error, Input, InputWrapper, Header } from "@/components/Modal/Constructor"

import styles from "@/components/Modal/Modal.module.css"

export default function DictionaryModal({ bookID, oldName, setOldName, isOpen, setIsOpen, setIsDeleteOpen }) {
    const isEn = useLangStore(state => state.isEn)
    const [name, setName] = useState(oldName)
    const [error, setError] = useState({ text: "", id: -1})
    const books = readLocal("neoword-books")
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

    function updateElement() {
        const forbidden = /[\^@$[\]{}"]/;
        if (forbidden.test(name)){
            setError({ text: isEn ? 'Remove forbidden characters (^ @ $ [ ] { } ")' : 'Приберіть заборонені символи (^ @ $ [ ] { } ")', id: 1 });
            return;
        }
        if(name.length === 0){
            setError({ text: isEn ? "Enter the field" : "Заповніть поле", id: 1 });
            return
        }
        if(books.includes(name) && name !== oldName){
            setError({ text: isEn ? "This name already exists" : "Така назва вже існує", id: 1 });
            return 
        }

        const book = readLocal(`neoword-item-${bookID}`)
        book.name = name
        localStorage.setItem(`neoword-item-${bookID}`, JSON.stringify(book))

        setOldName(name)
        setError(false)
        setIsOpen(false)
    }
    return (
        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
            <Header>{isEn ? "Editing a dictionary" : "Редагування словника"}</Header>
            <InputWrapper>
                <Input type="text" placeholder={isEn ? "Name" : "Назва"} hasError={error.id > 0} value={name} onChange={(e) => setName(e.target.value)}/>
            </InputWrapper>
            <AnimatePresence mode="wait">
                <Error hasError={error.id > 0} message={error.text} />
            </AnimatePresence>
            <ButtonWrapper>
                <Button onClick={() => setIsDeleteOpen(true)} className={styles.modal__delete}>
                    {isEn ? "Delete" : "Видалити"}
                </Button>
                <Button className="gradient" onClick={updateElement}>
                    {isEn ? "Save" : "Зберегти"}
                </Button>
            </ButtonWrapper>
        </Modal>
    )
    
}