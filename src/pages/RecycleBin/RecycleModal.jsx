import Modal from "../../components/Modal/Modal"

export default function RecycleModal({ name, isOpen, setIsOpen, setIsDeleteOpen, restore }) {
    const isEn = localStorage.getItem("neoword-lang") === "en"
    return (
        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
            <div className="modal__header">{name}</div>
            <div className="modal__buttons">
                <div className="modal__button modal__delete" onClick={() => setIsDeleteOpen(true)}>{isEn ? "Delete" : "Видалити"}</div>
                <div className="modal__button gradient" onClick={restore}>{isEn ? "Restore" : "Відновити"}</div>
            </div>
        </Modal>
    )
}