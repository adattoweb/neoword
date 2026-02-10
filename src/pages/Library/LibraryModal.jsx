import Modal from "@/components/Modal/Modal"
import { useState } from "react"
import { AnimatePresence } from "framer-motion"

import { readLocal } from "@/helpers/readLocal"
import { useLangStore } from "@/stores/useLangStore"
import { useBooksStore } from "@/stores/useBooksStore"

import { Button, ButtonWrapper, Error, Input, InputWrapper, Header } from "@/components/Modal/Constructor"

import styles from "@/components/Modal/Modal.module.css"

export default function LibraryModal({ isOpen, setIsOpen }) {
    const isEn = useLangStore(state => state.isEn)
    const setBooks = useBooksStore(state => state.setBooks)

    const [name, setName] = useState("")
    const [error, setError] = useState(false)
    function disableError(){
        if(!error){
            setTimeout(() => {
                setError(false)
            }, 6000)
        }
    }
    function addElement() {
        const forbidden = /[\^@$[\]{}"]/;
        if (forbidden.test(name)) {
            disableError();
            setError(isEn ? "Remove forbidden characters (^@$[]{}\")" : "Приберіть заборонені символи (^@$[]{}\")");
            return;
        }
        if(name.length === 0){
            disableError()
            setError(isEn ? "Enter the field" : "Заповніть поле")
            return
        }

        const id = +localStorage.getItem("neoword-index")
        localStorage.setItem("neoword-index", id+1)

        const books = readLocal("neoword-books")
        books.push(id)
        localStorage.setItem("neoword-books", JSON.stringify(books))

        const now = Date.now()

        const data = {
            name,
            timestamp: now,
            words: {}
          }
        localStorage.setItem(`neoword-item-${id}`, JSON.stringify(data))

        setBooks([...books])
        setError(false)
        setName("")
        setIsOpen(false)
    }
    return (
        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
            <Header>{isEn ? "Creating a dictionary" : "Створення словника"}</Header>
            <InputWrapper>
                <Input type="text" placeholder={isEn ? "Name" : "Назва"} hasError={!!error} value={name} onChange={(e) => setName(e.target.value)} />
            </InputWrapper>
            <AnimatePresence mode="wait">
                <Error hasError={!!error} message={error} />
            </AnimatePresence>
            <ButtonWrapper className={styles.one}>
                <Button className="gradient" onClick={addElement}>{isEn ? "Create" : "Створити"}</Button>
            </ButtonWrapper>
        </Modal>
    )
    
}