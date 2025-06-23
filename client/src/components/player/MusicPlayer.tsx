'use client'

import { FC } from 'react'
import AudioPlayer from 'react-h5-audio-player'
import 'react-h5-audio-player/lib/styles.css'
import styles from './MusicPlayer.module.css'
import SVGPlay from '../svg/play'
import SVGPause from '../svg/pause'

interface MusicPlayerProps {
	src?: string
	title?: string | null
	artist?: string | null
	onEnded?: () => void
}

const MusicPlayer: FC<MusicPlayerProps> = ({ src, onEnded }) => {
	const customIcons = {
		play: <SVGPlay />,
		pause: <SVGPause />,
	}

	return (
		<div className={styles.playerContainer}>
			{/* <div className={styles.trackInfoInside}>
				<h2 className={styles.title}>{title || 'Unknown Track'}</h2>
				<p className={styles.artist}>{artist || 'Unknown Artist'}</p>
			</div> */}

			<AudioPlayer
				autoPlay
				src={src}
				onPlay={(e) => console.log('onPlay', e)}
				onEnded={onEnded}
				customAdditionalControls={[]}
				customIcons={customIcons}
				className={styles.audioPlayer}
				style={{
					backgroundColor: '#222',
				}}
				showSkipControls={true}
				showJumpControls={false}
			/>
		</div>
	)
}

export default MusicPlayer
