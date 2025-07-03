import { GenresEnum } from './enums'

export interface Track {
	id: number
	title: string
	src: string
	endlessTime?: string
	rayting?: number
	img?: string
	comments?: Comment[]
	genres: GenresEnum
	isNew: boolean
	artist: Artist
}

export interface Comment {
	id: number
	createdAt: string
	text: string
	artist?: Artist
	track?: Track
	like?: number
	dislike?: number
}

export interface Artist {
	id: number
	nickname: string
	name: string
	avatar?: string
	email: string
	favorites?: Track[]
	tracks?: Track[]
	comments?: Comment[]
}

export type InteractionEvent = React.MouseEvent | React.TouchEvent