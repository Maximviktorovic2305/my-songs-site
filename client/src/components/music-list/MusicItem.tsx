'use client'

import { useDispatch } from 'react-redux'
import { Track } from '@/types'
import { Download } from 'lucide-react'
import Image from 'next/image'
import { usePlayer } from '@/hooks/useSelectors'
import { setCurrentTrack } from '@/store/playerSlice/player.slice'
import StarRating from '../StarRating'
import { useRouter } from 'next/navigation'

interface Props {
	song: Track
}

const MusicItem = ({ song }: Props) => {
	const router = useRouter()
	const { currentTrack } = usePlayer()
	const dispatch = useDispatch()
	const isActive = currentTrack.title === song.title

	const handleClick = (e: React.MouseEvent) => {
		e.stopPropagation()
		dispatch(setCurrentTrack(song))
	}

	const handleDownload = (e: React.MouseEvent) => {
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
				<span className='cursor-pointer' onClick={handleClick}>
					{isActive ? (
						<Image src={'/rocker.gif'} width={40} height={40} alt='song' />
					) : (
						<Image
							src={'/rocker.png'}
							width={30}
							height={30}
							alt='song'
							className='opacity-80 hover:opacity-100 duration-200'
						/>
					)}
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
				<span className='text-muted-foreground/80 font-semibold'>
					{song.endlessTime ?? 0}
				</span>
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
