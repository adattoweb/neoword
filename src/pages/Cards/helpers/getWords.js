import { useBookStore } from "@/stores/useBookStore"
import { useGameStore } from "@/stores/useGameStore"
import { readLocal } from "@/helpers/readLocal"

export function getWords(mode){
    const storeMode = useGameStore(state => state.game.mode)
    const finalMode = mode ?? storeMode

    function filterByDifficult(word){
        if(finalMode === "all") return true
        else if(finalMode === "hard") return word.isDifficult
        else return !word.isDifficult
    }

    const bookID = useBookStore(state => state.bookID)
    const book = readLocal(`neoword-item-${bookID}`)
    const words = book.words
    const sortedKeys = Object.keys(words).sort()
    const wordsKeys = []
    sortedKeys.map(letter => Object.keys(words[letter]).filter(key => {
        const word = words[letter][key]
        return filterByDifficult(word)
    }).map(key => wordsKeys.push(key)))
    const onlyWords = {}
    sortedKeys.map(letter => Object.keys(words[letter]).filter(key => {
        const word = words[letter][key]
        return filterByDifficult(word)
    }).map(key => onlyWords[key] = words[letter][key]))

    return { wordsKeys, onlyWords }
}