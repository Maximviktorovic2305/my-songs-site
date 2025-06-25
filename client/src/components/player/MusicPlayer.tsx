// MusicPlayer.tsx
'use client'

import { FC, useEffect, useRef } from 'react'
import AudioPlayer from 'react-h5-audio-player'
import type H5AudioPlayer from 'react-h5-audio-player'
import 'react-h5-audio-player/lib/styles.css'
import styles from './MusicPlayer.module.css'
import SVGPlay from '../svg/play'
import SVGPause from '../svg/pause'
import { pause, play } from '@/store/playerSlice/player.slice'
import { useDispatch } from 'react-redux'
import { usePlayer } from '@/hooks/useSelectors'
import EqualizerWave from './EqualizerWave'

interface MusicPlayerProps {
	src?: string
	title?: string | null
	artist?: string | null
	onEnded?: () => void
}

const MusicPlayer: FC<MusicPlayerProps> = ({ src, onEnded }) => {
	const dispatch = useDispatch()
	const playerRef = useRef<H5AudioPlayer | null>(null)
	const { isPlaying } = usePlayer()

	useEffect(() => {
		if (playerRef.current && playerRef.current.audio.current) {
			if (isPlaying) {
				playerRef.current.audio.current.play()
			} else {
				playerRef.current.audio.current.pause()
			}
		}
	}, [isPlaying])

	const customIcons = {
		play: <SVGPlay />,
		pause: <SVGPause />,
	}

	return (
		<div className={styles.playerContainer}>
			<EqualizerWave isPlaying={isPlaying} />

			<AudioPlayer
				autoPlay
				src={src}
				onPlay={() => dispatch(play())}
				onPause={() => dispatch(pause())}
				onEnded={onEnded}
				customAdditionalControls={[]}
				customIcons={customIcons}
				className={styles.audioPlayer}
				showSkipControls={true}
				showJumpControls={false}
				ref={playerRef}
			/>
		</div>
	)
}

export default MusicPlayer
