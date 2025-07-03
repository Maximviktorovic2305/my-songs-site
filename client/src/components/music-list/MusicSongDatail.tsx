'use client'

import Image from 'next/image'
import { Card } from '../ui/card'
import { Title } from '../ui/title'
import SongDetailItem from './SongDetailItem'
import MusicItemExtended from './MusicItemExtended'
import { useEffect } from 'react'
import { usePlayer } from '@/hooks/useSelectors'
import { play } from '@/store/playerSlice/player.slice'
import { useDispatch } from 'react-redux'
import SongComments from './comments/SongComments'
import StarRating from '../base/StarRating'
import LoveIcon from '../base/LoveIcon'
import { Track } from '@/types/track'

interface Props {
	song: Track
}

const MusicSongDatail = ({ song }: Props) => {
	const { currentTrack } = usePlayer()
	const dispatch = useDispatch()
	const isFavorite = false

	useEffect(() => {
		if (currentTrack.title === song.title) {
			dispatch(play())
		}
	}, [currentTrack.title, dispatch, song.title])

	return (
		<Card className=''>
			<div className='relative mb-4 flex items-center gap-3 max-sm:flex max-sm:flex-col'>
				<Image
					src={song.img ? song.img : '/no-image.png'}
					width={200}
					height={200}
					alt={song.title}
					className={`sm:max-h-[15.7rem] rounded-lg max-sm:justify-self-center shadow-md shadow-primary`}
				/>
				<div className='max-sm:self-start'>
					<Title as='h1' className='mb-1 text-shadow text-primary/90'>
						{song.title}
					</Title>
					<SongDetailItem
						title='Артист'
						value={song.artist.name ?? '--'}
						redirectId={song.artist.id}
					/>
					<div className='flex items-center gap-2'>
						<span className='mt-1 font-semibold'>Рейтинг:</span>
						<StarRating rating={song.rayting ?? 4} readonly />
					</div>

					<div className='max-sm:hidden'>
						<SongDetailItem title='Новинка' value={song.rayting ?? false} />
						<SongDetailItem
							title='Дата размещения'
							value={song.isNew ?? '--'}
						/>
					</div>
				</div>

				<div className='absolute top-0 right-0'>
					<LoveIcon songId={song.id} initialIsFavorite={isFavorite} size='md' />
				</div>
			</div>

			<div className='mb-3'>
				<MusicItemExtended song={song} />
			</div>

			<SongComments song={song} />
		</Card>
	)
}

export default MusicSongDatail
