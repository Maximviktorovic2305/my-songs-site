'use client'

import MusicPlayer from '@/components/player/MusicPlayer'
import { usePlayer } from '@/hooks/useSelectors'
import React from 'react'

const Footer = () => {
	const { currentTrack } = usePlayer()
	return (
		<footer className='fixed bottom-0 left-0 right-0'>
			{currentTrack && (
				<MusicPlayer
					src={currentTrack.src ?? undefined}
					title={currentTrack.title}
					artist={currentTrack.artist}
				/>
			)}
		</footer>
	)
}

export default Footer
