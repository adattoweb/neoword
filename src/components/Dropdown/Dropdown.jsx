import { motion, AnimatePresence } from "framer-motion"

import { createContext, useCallback, useContext, useState } from "react";
import './Dropdown.css'

const DropdownContext = createContext(null);

function useDropdown() {
    const ctx = useContext(DropdownContext);
    if (!ctx) {
        throw new Error("Dropdown components must be used inside <Dropdown>");
    }
    return ctx;
}

function Dropdown({ children, className = "" }) {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = useCallback(() => {
        setIsOpen(prev => !prev)
    }, [])

    const value = {
        toggle,
        isOpen
    }

    return (
        <DropdownContext.Provider value={value}>
            <motion.div whileHover={{scale: 1.03}} whileTap={{scale: 0.97}} className={`dropdown ${className}`} onClick={() => setIsOpen(!isOpen)}>
                {children}
            </motion.div>
        </DropdownContext.Provider>
    );
}

function DropdownButton({ children, className = "" }){
    return (
        <button className={`dropdown-btn ${className}`}>{children}</button>
    )
}

function DropdownContent({ children, className = "" }){
    const { isOpen } = useDropdown()
    return (
        <AnimatePresence mode="wait">
        {isOpen && <motion.div initial={{opacity: 0, scale: 0.7}} animate={{opacity: 1, scale: 1}} exit={{opacity: 0, scale: 0.7}} className={`dropdown-content ${className}`}>
            {children}
        </motion.div>}
    </AnimatePresence>
    )
}

Dropdown.Button = DropdownButton;
Dropdown.Content = DropdownContent;

export default Dropdown;