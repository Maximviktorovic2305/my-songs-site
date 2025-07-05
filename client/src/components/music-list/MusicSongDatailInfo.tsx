import { Track } from '@/types/track'
import StarRating from '../base/StarRating'
import { Title } from '../ui/title'
import SongDetailItem from './SongDetailItem'
import { formateDate } from '@/utils/format-date'

interface Props {
	song: Track
}

const MusicSongDatailInfo = ({ song }: Props) => {
	return (
		<section className='overflow-hidden'>
			<div className='max-sm:self-start'>
				<Title as='h1' className='mb-1 text-shadow text-primary/90'>
					{song.title}
				</Title>
				<SongDetailItem
					title='Артист'
					value={song.artist.nickname ? song.artist.nickname : '--'}
					redirectId={song.artist.id}
				/>
				<div className='flex items-center gap-2'>
					<span className='mt-1 font-semibold'>Рейтинг:</span>
					<StarRating rating={song.rayting ? song.rayting : 0} readonly />
				</div>

				<div className='max-sm:hidden'>
					<SongDetailItem
						title='Дата размещения'
						value={formateDate(song.createdAt)}
					/>
					<div className='flex items-center gap-1'>
						<span className='font-semibold'>Жанры:</span>
						<span className='whitespace-nowrap overflow-hidden'>{song.genres.join(', ')}</span>
					</div>
				</div>
			</div>
		</section>
	)
}

export default MusicSongDatailInfo
