'use client'

import { Track } from '@/types'
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

	return (
		<Card className=''>
			<Image
				src={artist.avatar ?? '/no-image-avatar.png'}
				width={200}
				height={200}
				alt={song.title}
				className={`mb-3 sm:max-h-[15.7rem] max-sm:justify-self-center shadow-md ${
					artist.avatar ? 'rounded-lg' : 'rounded-full  overflow-hidden'
				}`}
			/>
			<SongDetailItem title='Артист' value={artist.name ?? '--'} />
			<div className='mb-3'>
				<SongDetailItem title='Кол-во песен' value={songs.length ?? '--'} />
			</div>

			<MusicList list={songs} />
		</Card>
	)
}

export default MusicArtist
