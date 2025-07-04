'use client'

import { Track } from '@/types/track'
import { Card } from '../ui/card'
import MusicList from './MusicList'
import SongDetailItem from './SongDetailItem'
import Image from 'next/image'

interface Props {
	songs: Track[]
}

const MusicArtist = ({ songs }: Props) => {
	const song = songs[0]
	const { artist } = song

	const avatarImg = artist.avatar
		? `${process.env.NEXT_PUBLIC_SERVER_URL}/${artist.avatar.replace(/^\/+/, '')}`
		: '/no-image-avatar.png'

	return (
		<Card className=''>
			<Image
				src={avatarImg}
				width={200}
				height={200}
				alt={song.title}
				className={`mb-3 sm:max-h-[15.7rem] max-sm:justify-self-center shadow-lg ${
					artist.avatar ? 'rounded-lg' : 'rounded-full  overflow-hidden'
				}`}
			/>
			<SongDetailItem title='Артист' value={artist.name ?? '--'} />
			<div className='mb-3 border-b pb-3'>
				<SongDetailItem title='Кол-во песен' value={songs.length ?? '--'} />
			</div>

			<MusicList songs={songs} />
		</Card>
	)
}

export default MusicArtist
