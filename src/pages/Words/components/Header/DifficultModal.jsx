import Modal from "@/components/Modal/Modal"
import { Button, ButtonWrapper, Header } from "@/components/Modal/Constructor"

import { useGameStore } from "@/stores/useGameStore"
import { useLangStore } from "@/stores/useLangStore"
import { useWordsStore } from "@/stores/useWordsStore"

export default function DifficultModal({ modal, setModal }){
    const isEn = useLangStore(state => state.isEn)
    const setGame = useGameStore(state => state.setGame)
    const words = useWordsStore(state => state.words)

    function startGame(game, mode){
        if(Object.keys(words).length === 0) return
        setGame({game: game, mode: mode})
    }

    return (
        <Modal isOpen={modal.isOpen} onClose={() => setModal({isOpen: false, game: "any"})}>
            <Header>{isEn ? "Editing a word" : "Оберіть складність"}</Header>
            <ButtonWrapper>
                <Button className="gradient" onClick={() => startGame(modal.game, "all")}>{isEn ? "All" : "Усі"}</Button>
                <Button className="gradient" onClick={() => startGame(modal.game, "hard")}>{isEn ? "Hard" : "Складна"}</Button>
                <Button className="gradient" onClick={() => startGame(modal.game, "easy")}>{isEn ? "Easy" : "Легка"}</Button>
            </ButtonWrapper>
        </Modal>
    )
}