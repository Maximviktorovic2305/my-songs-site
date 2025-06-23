export interface Track {
	id: number
	title: string
	artist: string
	src: string
	endlessTime?: string
	rayting?: number
	img?: string
	comments?: Comment[]
	isNew: boolean
}

export interface User {
	id: number
	name: string
	avatar?: string
	email: string
}

export interface Comment {
	id: number
	createdAt: string
	text: string
	user?: User
}
