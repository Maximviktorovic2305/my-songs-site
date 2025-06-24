import { Comment, Track } from '@/types'

export const playlist: Track[] = [
	{
		id: 1,
		title: 'Анаконда',
		artist: 'Максим Переверзев',
		src: '/music/song1.mp3',
		isNew: false,
	},
	{
		id: 2,
		title: 'Турецкая',
		artist: 'Максим Переверзев',
		src: '/music/song2.mp3',
		isNew: false,
	},
	{
		id: 3,
		title: 'Do not know',
		artist: 'Максим Переверзев',
		src: '/music/song3.mp3',
		comments: [
			{
				id: 1,
				createdAt: '10.03.1998',
				text: 'Отличная песня',
				user: {
					id: 1,
					name: 'Иван',
					email: 'ivan@gmail.com',
					avatar: 'https://github.com/leerob.png',
				},
			},
			{
				id: 2,
				createdAt: '10.03.1998',
				text: 'Отличная песня',
				user: {
					id: 2,
					name: 'Гришка',
					email: 'grishka@gmail.com',
					avatar: 'https://github.com/shadcn.png',
				},
			},
			{
				id: 3,
				createdAt: '10.03.1987',
				text: 'Отличная песня',
				user: {
					id: 3,
					name: 'Никитка',
					email: 'nikitka@gmail.com',
					avatar: 'https://github.com/evilrabbit.png',
				},
			},
		],

		isNew: true,
	},
	{
		id: 4,
		title: '5',
		artist: 'Максим Переверзев',
		src: '/music/5.wav',
		isNew: true,
	},
	{
		id: 5,
		title: 'Do not know original',
		artist: 'Максим Переверзев',
		src: '/music/song3.mp3',
		isNew: false,
	},
	{
		id: 6,
		title: 'Песня6',
		artist: 'Максим Переверзев',
		src: '/music/song2.mp3',
		comments: [
			{
				id: 1,
				createdAt: '10.03.1998',
				text: 'Отличная песня',
				user: {
					id: 1,
					name: 'Иван',
					email: 'ivan@gmail.com',
					avatar: 'https://github.com/leerob.png',
				},
			},
			{
				id: 2,
				createdAt: '10.03.1998',
				text: 'Отличная песня',
				user: {
					id: 2,
					name: 'Гришка',
					email: 'grishka@gmail.com',
					avatar: 'https://github.com/shadcn.png',
				},
			},
			{
				id: 3,
				createdAt: '10.03.1987',
				text: 'Отличная песня',
				user: {
					id: 3,
					name: 'Никитка',
					email: 'nikitka@gmail.com',
					avatar: 'https://github.com/evilrabbit.png',
				},
			},
			{
				id: 4,
				createdAt: '10.03.1987',
				text: 'Отличная песня',
				user: {
					id: 3,
					name: 'Никитка',
					email: 'nikitka@gmail.com',
					avatar: 'https://github.com/evilrabbit.png',
				},
			},
			{
				id: 5,
				createdAt: '10.03.1987',
				text: 'Отличная песня',
				user: {
					id: 3,
					name: 'Никитка',
					email: 'nikitka@gmail.com',
					avatar: 'https://github.com/evilrabbit.png',
				},
			},
			{
				id: 6,
				createdAt: '10.03.1987',
				text: 'Отличная песня uyrtweyrewurtweuyr weurytweurytwe ruwteruwetruewyrtweuyrtwe uyweytruwertweuyrtwe uwteruweturwe uwteruwetruewrtwe  uywetruwertweurt weuywetruwertweurt uwyetruwertweurtweurt uwertuwertuwert uwetruwert uweytrwe ruywetrwe rweuryt weurytweutrtweur weurtweuryweurtwe rw uwertuwer tweury weur weruywetr uwetrweu',
				user: {
					id: 3,
					name: 'Никитка',
					email: 'nikitka@gmail.com',
					avatar: 'https://github.com/evilrabbit.png',
				},
			},
		],

		isNew: false,
	},
	{
		id: 7,
		title: 'Песня7',
		artist: 'Максим Переверзев',
		src: '/music/song3.mp3',
		comments: [
			{
				id: 1,
				createdAt: '10.03.1998',
				text: 'Отличная песня',
				user: {
					id: 1,
					name: 'Иван',
					email: 'ivan@gmail.com',
					avatar: 'https://github.com/leerob.png',
				},
			},
			{
				id: 2,
				createdAt: '10.03.1998',
				text: 'Отличная песня',
				user: {
					id: 2,
					name: 'Гришка',
					email: 'grishka@gmail.com',
					avatar: 'https://github.com/shadcn.png',
				},
			},
			{
				id: 3,
				createdAt: '10.03.1987',
				text: 'Отличная песня',
				user: {
					id: 3,
					name: 'Никитка',
					email: 'nikitka@gmail.com',
					avatar: 'https://github.com/evilrabbit.png',
				},
			},
		],

		isNew: false,
	},
]

export const comments: Comment[] = [
	{
		id: 1,
		createdAt: '10.03.1998',
		text: 'Отличная песня',
		user: {
			id: 1,
			name: 'Иван',
			email: 'ivan@gmail.com',
			avatar: 'https://github.com/leerob.png',
		},
	},
	{
		id: 2,
		createdAt: '10.03.1998',
		text: 'Отличная песня',
		user: {
			id: 2,
			name: 'Гришка',
			email: 'grishka@gmail.com',
			avatar: 'https://github.com/shadcn.png',
		},
	},
	{
		id: 3,
		createdAt: '10.03.1987',
		text: 'Отличная песня',
		user: {
			id: 3,
			name: 'Никитка',
			email: 'nikitka@gmail.com',
			avatar: 'https://github.com/evilrabbit.png',
		},
	},
]

export const albums: string[] = ['Анаконда', 'Mother Russia']
export const genres: string[] = ['rock', 'metall', 'alternative', 'soft rock']
export const topCharts: Track[] = playlist.slice(0, 3)
export const newSongs: Track[] = playlist.slice(0, 3)
