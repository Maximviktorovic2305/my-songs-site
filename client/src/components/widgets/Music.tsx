'use client'

import React from 'react'
import { playlist } from '@/data/playlist'
import { Card } from '../ui/card'

import MusicList from '../music-list/MusicList'

const Music = () => {
	return (
		<Card>
			<div>
				<h3>Плейлист:</h3>
				<MusicList list={playlist} />
			</div>
		</Card>
	)
}

export default Music
