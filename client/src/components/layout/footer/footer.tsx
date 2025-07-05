'use client'

import MusicPlayer from '@/components/player/MusicPlayer'
import { usePlayer } from '@/hooks/useSelectors'
import React from 'react'

const Footer = () => {
	const { currentTrack } = usePlayer()
	const trackUrl = `${process.env.NEXT_PUBLIC_SERVER_URL}${currentTrack?.src}`

	return (
		<footer className='fixed bottom-0 z-50 left-0 right-0'>
			{currentTrack && (
				<MusicPlayer src={trackUrl ?? undefined} title={currentTrack.title} />
			)}
		</footer>
	)
}

export default Footer
