'use client'

import { FC } from 'react'
import AudioPlayer from 'react-h5-audio-player'
import 'react-h5-audio-player/lib/styles.css'

interface MusicPlayerProps {
	src?: string
	title?: string | null
	artist?: string | null
	onEnded?: () => void
}

const MusicPlayer: FC<MusicPlayerProps> = ({ src, title, artist, onEnded }) => {
	return (
		<div>
			<h2>{title}</h2>
			<p>{artist}</p>
			<AudioPlayer
				autoPlay
				src={src}
				onPlay={(e) => console.log('onPlay')}
				onEnded={onEnded}
			/>
		</div>
	)
}

export default MusicPlayer
