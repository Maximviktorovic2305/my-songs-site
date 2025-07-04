import React from 'react'
import { Card } from '../ui/card'
import MusicList from '../music-list/MusicList'
import { Title } from '../ui/title'

const Music = () => {
	return (
		<Card>
			<div>
				<Title className='mb-2 text-shadow opacity-80' as='h2'>
					Плейлист:
				</Title>
				<MusicList />
			</div>
		</Card>
	)
}

export default Music
