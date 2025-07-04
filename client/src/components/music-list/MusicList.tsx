'use client'

import { useGetAllTracks } from '@/services/queries/track'
import MusicItem from './MusicItem'
import SkeletonMusicItem from '../skeletons/SkeletonMusicItem'

const MusicList = () => {
	const { data } = useGetAllTracks()

	return (
		<ul>
			{data ? (
				data.map((song, i) => <MusicItem song={song} key={i} />)
			) : (
				<ul>
					{Array.from({ length: 12 }).map((_, i) => (
						<SkeletonMusicItem key={i} />
					))}
				</ul>
			)}
		</ul>
	)
}
export default MusicList
