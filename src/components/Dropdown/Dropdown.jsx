import { motion, AnimatePresence } from "framer-motion"

import { useState } from "react";
import './Dropdown.css'


export default function Dropdown({name, children}) {

    const [isOpen, setIsOpen] = useState(false);
    return (
        <motion.div whileHover={{scale: 1.03}} whileTap={{scale: 0.97}} className="dropdown" onClick={() => setIsOpen(!isOpen)}>
            <button className="dropdown-btn"><p>{name}</p></button>
            <AnimatePresence mode="wait">
                {isOpen && <motion.div initial={{opacity: 0, scale: 0.7}} animate={{opacity: 1, scale: 1}} exit={{opacity: 0, scale: 0.7}} className='dropdown-content'>
                    {children}
                </motion.div>}
            </AnimatePresence>
        </motion.div>
    );
}