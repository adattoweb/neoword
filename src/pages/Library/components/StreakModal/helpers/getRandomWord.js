import { random } from "@/helpers/random"
import { readLocal } from "@/helpers/readLocal"

export function getRandomWord(books){
    const len = books.length
    if(len === 0) return false

    const index = random(len, 0)

    console.log("-------------")
    let book = readLocal(`neoword-item-${books[index]}`)
    console.log(book)

    if(Object.keys(book.words).length === 0){
        console.log("Словник зі словами не знайдено. Шукаю...")
        let passed = 0
        let isFinded = false
        while(passed < len){
            let i = (index + passed) % len
            const tempBook = readLocal(`neoword-item-${books[i]}`)
            console.log(tempBook)
            if(Object.keys(tempBook.words).length > 0){
                isFinded = true
                book = tempBook
                break
            }
            passed++
        }
        if(!isFinded){
            return false
        }
    }

    console.log(book)

    const letterID = random(Object.keys(book.words).length, 0)
    const letter = Object.keys(book.words)[letterID]

    const wordID = random(Object.keys(book.words[letter]).length, 0)
    const wordKey = Object.keys(book.words[letter])[wordID]
    const word = book.words[letter][wordKey]

    return word
}