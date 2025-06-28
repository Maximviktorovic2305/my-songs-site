'use client'

import { Track } from '@/types'
// import Image from 'next/image'
import { Card } from '../ui/card'
// import { Title } from '../ui/title'
// import SongDetailItem from './SongDetailItem'
// import MusicItemExtended from './MusicItemExtended'
// import { useEffect } from 'react'
// import { usePlayer } from '@/hooks/useSelectors'
// import { play } from '@/store/playerSlice/player.slice'
// import { useDispatch } from 'react-redux'
// import StarRating from '../StarRating'
import MusicList from './MusicList'

interface Props {
	songs: Track[]
}

const MusicArtist = ({ songs }: Props) => {
	// const { currentTrack, isPlaying } = usePlayer()
	// const dispatch = useDispatch()

	// useEffect(() => {
	// 	if (currentTrack.title === song.title) {
	// 		dispatch(play())
	// 	}
	// }, [currentTrack.title, dispatch, song.title])

	return (
		<Card className=''>
			{/* <div className='mb-4 flex items-center gap-3 max-sm:flex max-sm:flex-col'>
				<Image
					src={song.img ?? '/no-image.png'}
					width={200}
					height={200}
					alt={song.title}
					className={`sm:max-h-[15.7rem] rounded-lg max-sm:justify-self-center shadow-md ${
						isPlaying ? 'pulse-animation' : ''
					}`}
				/>
				<div className='max-sm:self-start'>
					<Title as='h1' className='mb-1 text-primary/90'>
						{song.title}
					</Title>
					<SongDetailItem title='Артист' value={song.artist ?? '--'} />
					<div className='flex items-center gap-2'>
						<span className='mt-1'>Рейтинг песни:</span>
						<StarRating rating={song.rayting ?? 4} readonly />
					</div>

					<div className='max-sm:hidden'>
						<SongDetailItem title='Рейтинг' value={song.rayting ?? '--'} />
						<SongDetailItem title='Новинка' value={song.rayting ?? false} />
						<SongDetailItem
							title='Дата размещения'
							value={song.isNew ?? '--'}
						/>
					</div>
				</div>
			</div> */}

			{/* <div className='mb-3'>
				<MusicItemExtended song={song} />
			</div> */}

			<MusicList list={songs} />
		</Card>
	)
}

export default MusicArtist
