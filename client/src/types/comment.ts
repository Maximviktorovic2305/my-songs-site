import { Artist } from './artist'
import { Track } from './track'

export interface Comment {
	id: number
	createdAt: string
	text: string
	artist?: Artist
	track?: Track
	like?: number
	dislike?: number
}

export interface CreateCommentDto {
  text: string;
  trackId?: number | string; 
}