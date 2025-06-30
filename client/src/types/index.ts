import { GenresEnum } from './enums'

export interface Track {
	id: number
	title: string
	src: string
	endlessTime?: string
	rayting?: number
	img?: string
	comments?: Comment[]
	genre?: GenresEnum
	isNew: boolean
	artist: Artist
}

export interface Comment {
	id: number
	createdAt: string
	text: string
	artist?: Artist
	like?: number
	dislike?: number
}

export interface Artist {
	id: number
	name: string
	avatar?: string
	email: string
}

export type InteractionEvent = React.MouseEvent | React.TouchEvent