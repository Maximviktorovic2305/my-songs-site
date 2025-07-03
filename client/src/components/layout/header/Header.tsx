'use client'

import AuthModal from '@/components/auth/AuthModal'
import BackButton from '@/components/base/BackButton'
import Logo from '@/components/base/Logo'
import { MusicAddSong } from '@/components/music-list/add-song/MusicAddSong'
import { useState } from 'react'

const Header = () => {
	const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
	const [authType, setAuthType] = useState<'login' | 'register'>('register')

	const handleLoginClick = () => {
		setIsAuthModalOpen(true)
	}

	const handleCloseModal = () => {
		setIsAuthModalOpen(false)
	}

	return (
		<>
			<header className='sm:px-[5%] fixed top-0 right-0 left-0 p-3 shadow-md hover:shadow-lg duration-200 bg-white w-full min-w-full flex items-center gap-2 justify-between max-h-[54px]'>
				<div className='flex items-center gap-2'>
					<BackButton />
					<Logo />
				</div>

				<div className='flex items-center gap-4'>
					<MusicAddSong />
					<span
						className='text-lg font-bold hover:opacity-80 cursor-pointer duration-200'
						onClick={handleLoginClick}>
						Войти
					</span>
				</div>
			</header>

			<AuthModal
				isOpen={isAuthModalOpen}
				onClose={handleCloseModal}
				authType={authType}
				setAuthType={setAuthType}
			/>
		</>
	)
}

export default Header
