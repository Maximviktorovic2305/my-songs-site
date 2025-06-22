'use client'

import React from 'react'
import { Track } from '@/types'
import { playlist } from '@/data/playlist'
import { useDispatch } from 'react-redux'
import { Card } from '../ui/card'
import { setCurrentTrack } from '@/store/playerSlice/player.slice'

const Music = () => {
	const dispatch = useDispatch()

	return (
		<Card>
			<div>
				<h3>Плейлист:</h3>
				<ul>
					{playlist.map((track: Track) => (
						<li key={track.id} onClick={() => dispatch(setCurrentTrack(track))}>
							{track.title} - {track.artist}
						</li>
					))}
				</ul>
			</div>
		</Card>
	)
}

export default Music
