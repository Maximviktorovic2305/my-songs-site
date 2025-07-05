'use client'

import Image from 'next/image'
import { Card } from '../ui/card'
import MusicItemExtended from './MusicItemExtended'
import { useEffect } from 'react'
import { usePlayer } from '@/hooks/useSelectors'
import { play } from '@/store/playerSlice/player.slice'
import { useDispatch } from 'react-redux'
import SongComments from './comments/SongComments'
import LoveIcon from '../base/LoveIcon'
import { Track } from '@/types/track'
import MusicSongDatailInfo from './MusicSongDatailInfo'
import { useGetFavoriteTracks } from '@/services/queries/track'

interface Props {
	song: Track
}

const MusicSongDatail = ({ song }: Props) => {
	const { currentTrack } = usePlayer()
	const dispatch = useDispatch()
	const { data: favoriteTracks } = useGetFavoriteTracks()         

	// Определяем, является ли текущий трек избранным для пользователя
    const isFavorite = favoriteTracks?.some(favTrack => favTrack.id === song.id) || false;

	const tracImg = song.img
		? `${process.env.NEXT_PUBLIC_SERVER_URL}/${song.img.replace(/^\/+/, '')}`
		: '/no-image.png'

	useEffect(() => {
		if (currentTrack.title === song.title) {
			dispatch(play())
		}
	}, [currentTrack.title, dispatch, song.title])

	return (
		<Card>
			<div className='relative mb-4 flex items-center gap-3 max-sm:flex max-sm:flex-col'>
				<Image
					src={tracImg}
					width={200}
					height={200}
					alt={song.title}
					className={`sm:max-h-[15.7rem] rounded-lg max-sm:justify-self-center shadow-md shadow-primary`}
				/>
				<MusicSongDatailInfo song={song} />

				<div className='absolute top-0 right-0'>
					<LoveIcon songId={song.id} initialIsFavorite={isFavorite} size='md' />
				</div>
			</div>

			<div className='mb-3'>
				<MusicItemExtended song={song} />
			</div>

			<SongComments />
		</Card>
	)
}

export default MusicSongDatail
