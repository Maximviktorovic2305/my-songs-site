import { Track } from '@/types'

export const playlist: Track[] = [
	{
		id: 1,
		title: 'Анаконда',
		artist: 'Максим Переверзев',
		src: '/music/song1.mp3',
	},
	{
		id: 2,
		title: 'Турецкая',
		artist: 'Максим Переверзев',
		src: '/music/song2.mp3',
	},
	{
		id: 3,
		title: 'Do not know',
		artist: 'Максим Переверзев',
		src: '/music/song3.mp3',
	},
	{
		id: 4,
		title: '5',
		artist: 'Максим Переверзев',
		src: '/music/5.wav',
	},
	{
		id: 5,
		title: 'Do not know original',
		artist: 'Максим Переверзев',
		src: '/music/song3.mp3',
	},
	{
		id: 6,
		title: 'Песня6',
		artist: 'Максим Переверзев',
		src: '/music/song2.mp3',
	},
	{
		id: 7,
		title: 'Песня7',
		artist: 'Максим Переверзев',
		src: '/music/song3.mp3',
	},
]

export const albums: string[] = ['Анаконда', 'Mother Russia']
export const genres: string[] = ['rock', 'metall', 'alternative', 'soft rock']
export const topCharts: Track[] = playlist.slice(0, 3)
export const newSongs: Track[] = playlist.slice(0, 3)
