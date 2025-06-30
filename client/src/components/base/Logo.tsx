'use client'

import Image from 'next/image'
import { usePlayer } from '@/hooks/useSelectors'
import { useDispatch } from 'react-redux'
import { pause, play } from '@/store/playerSlice/player.slice'
import { useRouter } from 'next/navigation'
import PlayingGuitarist from './PlayingGuitarist'
import { InteractionEvent } from '@/types'

const Logo = () => {
	const router = useRouter()
	const { isPlaying } = usePlayer()
	const dispatch = useDispatch()

	const handlePlay = (e: InteractionEvent) => {
		e.stopPropagation()
		dispatch(play())
	}

	const handlePause = (e: InteractionEvent) => {
		e.stopPropagation()
		dispatch(pause())
	}

	const handleRedirect = () => {
		router.push(`/`)
	}

	return (
		<section className='flex items-center'>
			<Image
				width={50}
				height={30}
				src='/maxmusic1.png'
				alt='music-logo-1'
				className='cursor-pointer'
				onClick={handleRedirect}
			/>

			<PlayingGuitarist
				isPlaying={isPlaying}
				handlePlay={handlePlay}
				handlePause={handlePause}
			/>

			<Image
				width={65}
				height={30}
				src='/maxmusic2.png'
				alt='music-logo-2'
				className='mt-0.5 cursor-pointer'
				onClick={handleRedirect}
			/>
		</section>
	)
}

export default Logo
