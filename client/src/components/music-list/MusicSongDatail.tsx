'use client'

import { Track } from '@/types'
import Image from 'next/image'
import { Card } from '../ui/card'
import { Title } from '../ui/title'
import SongDetailItem from './SongDetailItem'
import MusicItemExtended from './MusicItemExtended'
import { useEffect, useState } from 'react'
import { usePlayer } from '@/hooks/useSelectors'

interface Props {
	song: Track
}

const MusicSongDatail = ({ song }: Props) => {
	const { currentTrack } = usePlayer()
	const [isActive, setIsActive] = useState(false)

	useEffect(() => {
		if (currentTrack.title === song.title) {
			setIsActive(true)
		}
	}, [currentTrack.title, song.title])

	return (
		<Card className=''>
			<Title as='h1' className='mb-1 text-center text-primary/90'>
				{song.title}
			</Title>
			<div className='mb-4'>
				<SongDetailItem title='Артист' value={song.artist ?? '--'} />
				<SongDetailItem title='Рейтинг' value={song.rayting ?? '--'} />
				<SongDetailItem title='Новинка' value={song.rayting ?? false} />
				<SongDetailItem title='Дата размещения' value={song.isNew ?? '--'} />
			</div>
			<Image
				src={song.img ?? '/no-image.png'}
				width={200}
				height={200}
				alt={song.title}
				className={`max-h-[15.7rem] rounded-lg shadow-md mb-4 mx-auto ${
					isActive ? 'pulse-animation' : ''
				}`}
			/>

			<MusicItemExtended
				song={song}
				isActive={isActive}
				setIsActive={setIsActive}
			/>
		</Card>
	)
}

export default MusicSongDatail
