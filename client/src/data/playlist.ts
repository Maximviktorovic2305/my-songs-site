import { Comment, Track } from '@/types'
import { GenresEnum } from '@/types/enums'

export const playlist: Track[] = [
	{
		id: 1,
		title: 'Анаконда',
		artist: {
			id: 4,
			name: 'Максим Викторович',
			email: 'maxim@gmail.com',
		},
		src: '/music/song1.mp3',
		isNew: false,
		genre: GenresEnum.rock,
	},
	{
		id: 2,
		title: 'Турецкая',
		artist: {
			id: 4,
			name: 'Максим Викторович',
			email: 'maxim@gmail.com',
		},
		src: '/music/song2.mp3',
		isNew: false,
		genre: GenresEnum.reggae,
	},
	{
		id: 3,
		title: 'Do not know',
		artist: {
			id: 4,
			name: 'Максим Викторович',
			email: 'maxim@gmail.com',
		},
		src: '/music/song3.mp3',
		comments: [
			{
				id: 1,
				createdAt: '10.03.1998',
				text: 'Отличная песня',
				like: 5,
				dislike: 5,
				artist: {
					id: 1,
					name: 'Иван',
					email: 'ivan@gmail.com',
					avatar: 'https://github.com/leerob.png',
				},
			},
			{
				id: 2,
				createdAt: '10.03.1998',
				text: 'Отличная песня skjhakjdhask aodhjasodjas aosjdsaodjasoiidj oadjasodjasoid joasidjasodjsoadj oasijdoasdjasoiid joasijdasodjaos oasjdoasdaa doasjdaso asdsad asdaasdasd 23qwasdasasdasd qweqwe qw asd asasd asasd asas ',
				like: 5,
				dislike: 7,
				artist: {
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
				like: 12,
				dislike: 32,
				artist: {
					id: 3,

					name: 'Никитка',
					email: 'nikitka@gmail.com',
					avatar: 'https://github.com/evilrabbit.png',
				},
			},
		],

		isNew: true,
		genre: GenresEnum.soul,
	},
	{
		id: 4,
		title: '5',
		artist: {
			id: 3,
			name: 'Максим',
			email: 'maxim@gmail.com',
		},
		src: '/music/5.wav',
		isNew: true,
		genre: GenresEnum.classical,
	},
	{
		id: 5,
		title: 'Do not know original',
		artist: {
			id: 2,
			name: 'Максим Переверзев',
			email: 'maxim@gmail.com',
		},
		src: '/music/song3.mp3',
		isNew: false,
		genre: GenresEnum.classical,
	},
	{
		id: 6,
		title: 'Песня6',
		artist: {
			id: 1,
			name: 'Максим',
			email: 'maxim@gmail.com',
		},
		src: '/music/song2.mp3',
		comments: [
			{
				id: 1,
				createdAt: '10.03.1998',
				text: 'Отличная песня',
				artist: {
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
				artist: {
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
				artist: {
					id: 3,
					name: 'Никитка',
					email: 'nikitka@gmail.com',
				},
			},
			{
				id: 4,
				createdAt: '10.03.1987',
				text: 'Отличная песня',
				artist: {
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
				artist: {
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
				artist: {
					id: 3,
					name: 'Никитка',
					email: 'nikitka@gmail.com',
				},
			},
		],

		isNew: false,
		genre: GenresEnum.blues,
	},
	{
		id: 7,
		title: 'Песня7',
		artist: {
			id: 1,
			name: 'Максим',
			email: 'maxim@gmail.com',
		},
		src: '/music/song3.mp3',
		comments: [
			{
				id: 1,
				createdAt: '10.03.1998',
				text: 'Отличная песня',
				artist: {
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
				artist: {
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
				artist: {
					id: 3,
					name: 'Никитка',
					email: 'nikitka@gmail.com',
					avatar: 'https://github.com/evilrabbit.png',
				},
			},
		],

		isNew: false,
		genre: GenresEnum.funk,
	},
]

export const comments: Comment[] = [
	{
		id: 1,
		createdAt: '10.03.1998',
		text: 'Отличная песня',
		artist: {
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
		artist: {
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
		artist: {
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
