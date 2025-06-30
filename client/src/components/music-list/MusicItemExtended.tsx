'use client'

import { useDispatch } from 'react-redux'
import { Track } from '@/types'
import { Download } from 'lucide-react'
import Image from 'next/image'

import { pause, play, setCurrentTrack } from '@/store/playerSlice/player.slice'
import { usePlayer } from '@/hooks/useSelectors'
import StarRating from '../base/StarRating'
import MessageIcon from '../base/MessageIcon'
import PlayingIcon from '../base/PlayingIcon'

interface Props {
	song: Track
}

const MusicItemExtended = ({ song }: Props) => {
	const dispatch = useDispatch()
	const { currentTrack, isPlaying } = usePlayer()
	const isActive = currentTrack.title === song.title

	const handlePlay = (e: React.MouseEvent) => {
		e.stopPropagation()
		dispatch(setCurrentTrack(song))
		dispatch(play())
	}

	const handlePause = (e: React.MouseEvent) => {
		e.stopPropagation()
		dispatch(pause())
	}

	const handleDownload = (e: React.MouseEvent) => {
		e.stopPropagation()
		console.log('download', song)
	}

	return (
		<section>
			<div className='py-2 flex gap-3 justify-between items-center w-full min-w-full border-y'>
				<div className='flex cursor-pointer items-center gap-3 max-sm:h-10'>
					<PlayingIcon song={song} />
					<div className='flex flex-col justify-between max-sm:hidden'>
						<span className='font-bold'>{song.title}</span>
						<span className='text-sm text-muted-foreground/80 font-semibold'>
							{song.artist.name}
						</span>
					</div>
				</div>
				<div className='flex items-center gap-3'>
					<MessageIcon song={song} />
					<Download
						className='text-primary/90 w-4 h-auto cursor-pointer hover:text-muted-foreground duration-200 z-10'
						onClick={handleDownload}
					/>

					<div className='z-50 mb-2'>
						<StarRating rating={song.rayting ?? 0} />
					</div>
				</div>
			</div>
		</section>
	)
}

export default MusicItemExtended
