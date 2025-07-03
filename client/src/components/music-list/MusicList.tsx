import { Track } from '@/types/track'
import MusicItem from './MusicItem'

interface Props {
	list: Track[]
}

const MusicList = ({ list }: Props) => {
	return (
		<ul>
			{list.map((song, i) => (
				<MusicItem song={song} key={i} />
			))}
		</ul>
	)
}
export default MusicList
