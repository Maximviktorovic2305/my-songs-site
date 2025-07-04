import React from 'react'
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'
import CloseButton from '../base/CloseButton'
import BaseModal from '../base/BaseModal'
import { Title } from '../ui/title'

interface AuthModalProps {
	isOpen: boolean
	onClose: () => void
	setAuthType: React.Dispatch<React.SetStateAction<'login' | 'register'>>
	setIsAuthModalOpen: React.Dispatch<React.SetStateAction<boolean>>
	authType: 'login' | 'register'
}

const AuthModal = ({
	isOpen,
	authType = 'register',
	setAuthType,
	onClose,
	setIsAuthModalOpen
}: AuthModalProps) => {
	return (
		<BaseModal isOpen={isOpen} onClose={onClose}>
			<CloseButton onClose={onClose} />

			<Title as='h2' className='text-2xl font-bold text-primary/90 mb-4'>
				{authType === 'login' ? 'Вход' : 'Регистрация'}
			</Title>

			{authType === 'login' ? <LoginForm setIsAuthModalOpen={setIsAuthModalOpen} /> : <RegisterForm setIsAuthModalOpen={setIsAuthModalOpen} />}

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
		</BaseModal>
	)
}

export default AuthModal
