'use client'

import { useDispatch } from 'react-redux'
import { Track } from '@/types'
import { Download, MessageSquare } from 'lucide-react'
import Image from 'next/image'
import { usePlayer } from '@/hooks/useSelectors'
import { pause, play, setCurrentTrack } from '@/store/playerSlice/player.slice'
import StarRating from '../StarRating'
import { useRouter } from 'next/navigation'

interface Props {
	song: Track
}

const MusicItem = ({ song }: Props) => {
	const router = useRouter()
	const { currentTrack, isPlaying } = usePlayer()
	const dispatch = useDispatch()
	const isActive = currentTrack.title === song.title

	type InteractionEvent = React.MouseEvent | React.TouchEvent | Event

	const handlePlay = (e: InteractionEvent) => {
		e.stopPropagation()
		dispatch(setCurrentTrack(song))
		dispatch(play())
	}

	const handlePause = (e: InteractionEvent) => {
		e.stopPropagation()
		dispatch(pause())
	}

	const handleDownload = (e: InteractionEvent) => {
		e.stopPropagation()
		console.log('download', song)
	}

	const handleRedirect = () => {
		router.push(`/music/${song.id}`)
	}
	return (
		<li className='py-2 flex gap-3 justify-between items-center w-full min-w-full border-t'>
			<div
				className='flex cursor-pointer items-center gap-3'
				onClick={handleRedirect}>
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
				<Image
					src={song.img ?? '/no-image.png'}
					width={40}
					height={40}
					alt='song'
					className={`rounded overflow-hidden opacity-80 ${
						isActive && 'opacity-100'
					}`}
				/>
				<div className='flex flex-col justify-between'>
					<span className='font-bold'>{song.title}</span>
					<span className='text-sm text-muted-foreground/80 font-semibold'>
						{song.artist}
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

				<div className='z-50'>
					<StarRating type='popup' />
				</div>
			</div>
		</li>
	)
}

export default MusicItem
