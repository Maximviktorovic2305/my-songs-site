'use client'

import { useDispatch } from 'react-redux'
import { Track } from '@/types'
import { Download, MessageSquare } from 'lucide-react'
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
				<div className='flex cursor-pointer items-center gap-3 max-sm:h-10'>
					<span className='cursor-pointer'>
						<Image
							src={isActive && isPlaying ? '/rocker.gif' : '/rocker.png'}
							width={isActive && isPlaying ? 40 : 30}
							height={40}
							alt='song'
							className='opacity-80 hover:opacity-100 duration-200'
							onClick={isActive && isPlaying ? handlePause : handlePlay}
						/>
					</span>
					<div className='flex flex-col justify-between max-sm:hidden'>
						<span className='font-bold'>{song.title}</span>
						<span className='text-sm text-muted-foreground/80 font-semibold'>
							{song.artist.name}
						</span>
					</div>
				</div>
				<div className='flex items-center gap-3'>
					<div className='relative'>
						<MessageSquare className='size-4 text-primary/90 w-4 h-auto cursor-pointer hover:text-muted-foreground duration-200 z-10' />
						<span className='absolute -top-1.5 -right-1.5 text-[0.5rem] text-primary'>
							{song.comments?.length ?? 12}
						</span>
					</div>
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
