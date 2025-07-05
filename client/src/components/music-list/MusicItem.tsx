'use client'

import { Download } from 'lucide-react'
import { useRouter } from 'next/navigation'
import StarRating from '../base/StarRating'
import PlayingImage from '../base/PlayingImage'
import LoveIcon from '../base/LoveIcon'
import { Track } from '@/types/track'
import { useGetFavoriteTracks } from '@/services/queries/track'
import Link from 'next/link'

interface Props {
	song: Track
}

const MusicItem = ({ song }: Props) => {
	const router = useRouter()
	const { data: favoriteTracks } = useGetFavoriteTracks()

	// Определяем, является ли текущий трек избранным для пользователя
	const isFavorite =
		favoriteTracks?.some((favTrack) => favTrack.id === song.id) || false

	const handleRedirect = () => {
		router.push(`/music/${song.id}`)
	}

	return (
		<li className='py-2 flex gap-3 justify-between items-center border-b border-gray-100 last:border-b-0 w-full min-w-full'>
			<div
				className='flex cursor-pointer items-center gap-3'
				onClick={handleRedirect}>
				<PlayingImage song={song} />

				<div className='flex flex-col justify-between'>
					<span className='font-bold text-primary/90 text-shadow'>
						{song.title}
					</span>
					<span className='text-sm text-muted-foreground/80 font-semibold'>
						{song.artist?.name ? song.artist?.name : 'Неизвестный артист'}
					</span>
				</div>
			</div>
			<div className='flex items-center gap-3'>
				<LoveIcon songId={song.id} initialIsFavorite={isFavorite} />

				<Link
					href={`${process.env.NEXT_PUBLIC_SERVER_URL}${song.src}`}
					target='_blank'>
					<Download className='text-primary/90 w-4 h-auto cursor-pointer hover:text-muted-foreground duration-200 z-10' />
				</Link>

				<div className='z-50'>
					<StarRating type='popup' rating={song.rayting} />
				</div>
			</div>
		</li>
	)
}

export default MusicItem
