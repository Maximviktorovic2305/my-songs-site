'use client'

import { InteractionEvent, Track } from '@/types'
import { Download, MessageSquare } from 'lucide-react'
import { useRouter } from 'next/navigation'
import StarRating from '../base/StarRating'
import PlayingImage from '../base/PlayingImage'

interface Props {
	song: Track
}

const MusicItem = ({ song }: Props) => {
	const router = useRouter()

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
				<PlayingImage song={song} />

				<div className='flex flex-col justify-between'>
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

				<div className='z-50'>
					<StarRating type='popup' />
				</div>
			</div>
		</li>
	)
}

export default MusicItem
