import { Comment } from "./comment"
import { Track } from "./track"

export interface Artist {
	id: number
	nickname: string
	name: string
	avatar: string
	email: string
	favorites?: Track[]
	tracks?: Track[]
	comments?: Comment[]
}