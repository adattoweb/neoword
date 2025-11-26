import Modal from "../../../components/Modal/Modal"

export default function DeleteModal({ isOpen, setIsOpen, remove }) {
    const isEn = localStorage.getItem("neoword-lang") === "en"
    return (
        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
            <div className="modal__header">{isEn ? "Are you sure?" : "Ви впевнені?"}</div>
            <div className="modal__buttons">
                <div className="modal__button modal__delete text-small" onClick={remove}>{isEn ? "Yes, remove it" : "Так, видаліть"}</div>
                <div className="modal__button gradient text-small" onClick={() => setIsOpen(false)}>{isEn ? "No, keep it" : "Ні, залиште"}</div>
            </div>
        </Modal>
    )
}