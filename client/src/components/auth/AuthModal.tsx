'use client'

import React, { useEffect } from 'react'
import { motion } from 'framer-motion'
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'
import CloseButton from '../base/CloseButton'

interface AuthModalProps {
    isOpen: boolean
    onClose: () => void
    setAuthType: React.Dispatch<React.SetStateAction<'login' | 'register'>>
    authType: 'login' | 'register'
}

const AuthModal = ({
    isOpen,
    authType = 'register',
    setAuthType,
    onClose,
}: AuthModalProps) => {
    
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
                
                <CloseButton onClose={onClose} />

                <h2 className='text-2xl font-bold text-primary/90 mb-4'>
                    {authType === 'login' ? 'Вход' : 'Регистрация'}
                </h2>

                {authType === 'login' ? <LoginForm /> : <RegisterForm />}

                <p className='mt-4 text-center text-sm text-gray-500'>
                    {authType === 'login' ? 'Нет аккаунта? ' : 'Уже есть аккаунт? '}
                    <button
                        onClick={() =>
                            setAuthType(authType === 'login' ? 'register' : 'login')
                        }
                        className='text-blue-600 hover:underline cursor-pointer'>
                        {authType === 'login' ? 'Зарегистрироваться' : 'Войти'}
                    </button>
                </p>
            </motion.div>
        </motion.section>
    )
}

export default AuthModal