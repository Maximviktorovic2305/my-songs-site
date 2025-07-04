import { Track } from '@/types/track'
import StarRating from '../base/StarRating'
import { Title } from '../ui/title'
import SongDetailItem from './SongDetailItem'

interface Props {
	song: Track
}

const MusicSongDatailInfo = ({ song }: Props) => {
	return (
		<section>
			<div className='max-sm:self-start'>
				<Title as='h1' className='mb-1 text-shadow text-primary/90'>
					{song.title}
				</Title>
				<SongDetailItem
					title='Артист'
					value={song.artist.name ? song.artist.name : '--'}
					redirectId={song.artist.id}
				/>
				<div className='flex items-center gap-2'>
					<span className='mt-1 font-semibold'>Рейтинг:</span>
					<StarRating rating={song.rayting ?? 4} readonly />
				</div>

				<div className='max-sm:hidden'>
					<SongDetailItem title='Новинка' value={song.rayting ?? false} />
					<SongDetailItem title='Дата размещения' value={song.isNew ?? '--'} />
				</div>
			</div>
		</section>
	)
}

export default MusicSongDatailInfo
