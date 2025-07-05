'use client'

import { InteractionEvent } from '@/types'
import { useDispatch } from 'react-redux'
import { play, pause, setCurrentTrack } from '@/store/playerSlice/player.slice'
import { Pause, Play } from 'lucide-react'
import { usePlayer } from '@/hooks/useSelectors'
import Image from 'next/image'
import { Track } from '@/types/track'

interface Props {
	song: Track
}

const PlayingImage = ({ song }: Props) => {
	const { currentTrack, isPlaying } = usePlayer()
	const dispatch = useDispatch()

	const tracImg = song.img
		? `${process.env.NEXT_PUBLIC_SERVER_URL}/${song.img.replace(/^\/+/, '')}`
		: '/no-image.png'

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
				src={tracImg}
				width={48}
				height={48}
				alt='song'
				className={`rounded overflow-hidden transition-all shadow-md shadow-primary duration-200 min-h-12 max-h-11 max-w-12 object-cover ${
					isActive ? 'ring-2 ring-accent' : ''
				}`}
			/>
			{isActive && isPlaying ? (
				<div className='absolute inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 rounded opacity-70 transition-opacity duration-200'>
					<Pause className='text-accent' onClick={handlePause} />
				</div>
			) : (
				<div className='absolute inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 rounded opacity-0 group-hover:opacity-90 transition-opacity duration-200'>
					<Play className='text-accent' onClick={handlePlay} />
				</div>
			)}
		</div>
	)
}

export default PlayingImage
