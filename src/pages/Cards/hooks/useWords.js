import { useBookStore } from "@/stores/useBookStore"
import { readLocal } from "@/helpers/readLocal"

export function useWords(){
    const bookID = useBookStore(state => state.bookID)
    const book = readLocal(`neoword-item-${bookID}`)
    const words = book.words
    const sortedKeys = Object.keys(words).sort()
    const wordsKeys = []
    sortedKeys.map(letter => Object.keys(words[letter]).map(key => wordsKeys.push(key)))
    const onlyWords = {}
    sortedKeys.map(letter => Object.keys(words[letter]).map(key => onlyWords[key] = words[letter][key]))

    return { wordsKeys, onlyWords }
}