'use client'

import AuthModal from '@/components/auth/AuthModal'
import BackButton from '@/components/base/BackButton'
import Logo from '@/components/base/Logo'
import { MusicAddSong } from '@/components/music-list/add-song/MusicAddSong'
import { useArtist, useLogout } from '@/services/queries/auth'
import { useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

const Header = () => {
	const { data: artist } = useArtist()
	const { mutateAsync: logoutAsync } = useLogout()
	const queryClient = useQueryClient()
	const router = useRouter()
	const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
	const [authType, setAuthType] = useState<'login' | 'register'>('register')
	const [isClient, setIsClient] = useState(false)

	useEffect(() => {
		setIsClient(true)
	}, [])

	const handleLoginClick = () => {
		setIsAuthModalOpen(true)
	}

	const handleLogotClick = async () => {
		setIsAuthModalOpen(false)

		try {
			await logoutAsync()
			queryClient.clear()
			router.replace('/')
		} catch (error) {
			console.log(error)
		}
	}

	const handleCloseModal = () => {
		setIsAuthModalOpen(false)
	}

	return (
		<>
			<header className='sm:px-[5%] z-50 fixed top-0 right-0 left-0 p-3 shadow-md hover:shadow-lg duration-200 bg-white w-full min-w-full flex items-center gap-2 justify-between max-h-[54px]'>
				<div className='flex items-center gap-2'>
					<BackButton />
					<Logo />
				</div>

				<div>{isClient && artist?.artist.nickname}</div>

				<div className='flex items-center gap-4'>
					<MusicAddSong />
					<div className='text-lg font-bold hover:opacity-80 cursor-pointer duration-200'>
						{isClient && artist ? (
							<span onClick={handleLogotClick}>Выйти</span>
						) : (
							<span onClick={handleLoginClick}>Войти</span>
						)}
					</div>
				</div>
			</header>

			<AuthModal
				isOpen={isAuthModalOpen}
				setIsAuthModalOpen={setIsAuthModalOpen}
				onClose={handleCloseModal}
				authType={authType}
				setAuthType={setAuthType}
			/>
		</>
	)
}

export default Header
