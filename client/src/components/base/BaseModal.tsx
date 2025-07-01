'use client'

import React, { useEffect } from 'react'
import { motion } from 'framer-motion'

interface BaseModalProps {
    isOpen: boolean
    onClose: () => void
    children: React.ReactNode
}

const BaseModal = ({ isOpen, onClose, children }: BaseModalProps) => {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = ''
        }
    }, [isOpen])

    if (!isOpen) return null

    return (
        <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className='fixed inset-0 z-100 flex items-center justify-center bg-black/50 backdrop-blur-sm'
            onClick={onClose}>
            
            <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className='bg-white rounded-lg shadow-xl w-full max-w-md p-6 relative'
                onClick={(e) => e.stopPropagation()}>
                
                {children}
            </motion.div>
        </motion.section>
    )
}

export default BaseModal