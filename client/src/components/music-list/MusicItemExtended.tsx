'use client'

import { useDispatch } from 'react-redux'
import { Track } from '@/types'
import { Download } from 'lucide-react'
import Image from 'next/image'

import { pause, play, setCurrentTrack } from '@/store/playerSlice/player.slice'
import StarRating from '../StarRating'
import { usePlayer } from '@/hooks/useSelectors'

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
				<div className='flex cursor-pointer items-center gap-3'>
					<span className='cursor-pointer'>
						{isActive && isPlaying ? (
							<Image
								src={'/rocker.gif'}
								width={40}
								height={40}
								alt='song'
								onClick={handlePause}
							/>
						) : (
							<Image
								onClick={handlePlay}
								src={'/rocker.png'}
								width={30}
								height={30}
								alt='song'
								className='opacity-80 hover:opacity-100 duration-200'
							/>
						)}
					</span>
					<div className='flex flex-col justify-between'>
						<span className='font-bold'>{song.title}</span>
						<span className='text-sm text-muted-foreground/80 font-semibold'>
							{song.artist}
						</span>
					</div>
				</div>
				<div className='flex items-center gap-3'>
					<span className='text-muted-foreground/80 font-semibold'>
						{song.endlessTime ?? 0}
					</span>
					<Download
						className='text-primary/90 w-4 h-auto cursor-pointer hover:text-muted-foreground duration-200 z-10'
						onClick={handleDownload}
					/>

					<div className='z-50'>
						<StarRating />
					</div>
				</div>
			</div>
		</section>
	)
}

export default MusicItemExtended
