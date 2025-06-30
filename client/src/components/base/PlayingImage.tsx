'use client'

import { InteractionEvent, Track } from '@/types'
import Image from 'next/image'
import { useDispatch } from 'react-redux'
import { play, pause, setCurrentTrack } from '@/store/playerSlice/player.slice'
import { Pause, Play } from 'lucide-react'
import { usePlayer } from '@/hooks/useSelectors'

interface Props {
	song: Track
}

const PlayingImage = ({ song }: Props) => {
	const { currentTrack, isPlaying } = usePlayer()
	const dispatch = useDispatch()

	// Проверяем, является ли этот трек текущим
	const isActive = currentTrack?.id === song.id

	const handlePlay = (e: InteractionEvent) => {
		e.stopPropagation()
		dispatch(setCurrentTrack(song))
		dispatch(play())
	}

	const handlePause = (e: InteractionEvent) => {
		e.stopPropagation()
		dispatch(pause())
	}

	return (
		<div className='relative cursor-pointer group'>
			<Image
				src={song.img ?? '/no-image.png'}
				width={40}
				height={40}
				alt='song'
				className={`rounded overflow-hidden transition-all duration-200 ${
					isActive ? 'ring-2 ring-primary' : ''
				}`}
			/>
			{isActive && isPlaying ? (
				// Если трек активен и играет, показываем иконку паузы всегда
				<div className='absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded opacity-100 transition-opacity duration-200'>
					<Pause className='text-accent' onClick={handlePause} />
				</div>
			) : (
				// Иначе, показываем иконку воспроизведения только при наведении
				<div className='absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200'>
					<Play className='text-accent' onClick={handlePlay} />
				</div>
			)}
		</div>
	)
}

export default PlayingImage
