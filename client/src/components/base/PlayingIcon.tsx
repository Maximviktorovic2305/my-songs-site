'use client'

import { useDispatch } from 'react-redux'
import { Pause, Play } from 'lucide-react'
import { usePlayer } from '@/hooks/useSelectors'
import { play, pause, setCurrentTrack } from '@/store/playerSlice/player.slice'
import { Track } from '@/types'

interface Props {
	song: Track
}

const PlayingIcon = ({ song }: Props) => {
	const { currentTrack, isPlaying } = usePlayer()
	const dispatch = useDispatch()

	const isActive = currentTrack?.id === song.id

	const handlePlay = (e: React.MouseEvent) => {
		e.stopPropagation()
		dispatch(setCurrentTrack(song))
		dispatch(play())
	}

	const handlePause = (e: React.MouseEvent) => {
		e.stopPropagation()
		dispatch(pause())
	}

	return (
		<div className='relative cursor-pointer group'>
			<div
				className={`w-10 h-10 rounded-md border-1 flex items-center justify-center transition-colors duration-200 ${
					isActive
						? 'border-accent/90'
						: 'border-accent/90 hover:border-muted-foreground/50 '
				}`}>
				{isActive && isPlaying ? (
					<Pause
						size={24}
						color='#73dde3'
						onClick={handlePause}
						className='text-accent opacity-90 hover:opacity-100 transition-opacity'
					/> 
				) : (
					<Play
						size={24}
						color='#73dde3'
						onClick={handlePlay}
						className='text-accent opacity-70 group-hover:opacity-100 transition-opacity'
					/>
				)}
			</div>
		</div>
	)
}

export default PlayingIcon
