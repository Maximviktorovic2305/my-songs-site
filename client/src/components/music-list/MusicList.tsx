'use client'

import { useGetAllTracks } from '@/services/queries/track'
import MusicItem from './MusicItem'
import SkeletonMusicItem from '../skeletons/SkeletonMusicItem'
import { Track } from '@/types/track'

interface Props {
	songs?: Track[]
}

const MusicList = ({ songs }: Props) => {
	const { data } = useGetAllTracks()

	const tracksToRender = songs || data

	return (
		<ul>
			{tracksToRender ? (
				tracksToRender.map((song, i) => <MusicItem song={song} key={i} />)
			) : (
				<ul>
					{Array.from({ length: 10 }).map((_, i) => (
						<SkeletonMusicItem key={i} />
					))}
				</ul>
			)}
		</ul>
	)
}
export default MusicList
