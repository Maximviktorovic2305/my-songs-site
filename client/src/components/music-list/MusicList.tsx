import { Track } from '@/types'
import MusicItem from './MusicItem'

interface Props {
	list: Track[]
}

const MusicList = ({ list }: Props) => {
	return (
		<ol>
			{list.map((song, i) => (
				<MusicItem song={song} key={i} />
			))}
		</ol>
	)
}
export default MusicList
