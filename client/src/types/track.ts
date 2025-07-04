import { SortType } from '.'
import { Artist } from './artist'
import { Comment } from './comment'
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
	favoriteArtistId?: number
	isFavoriteArtistId?: number
}

export interface CreateTrackDto {
	title: string
	genres: GenresEnum[]
	// img?: string
	// src: string
}

export interface FilterOptions {
	genres?: GenresEnum[]
	title?: string
	artistId?: number | string
	artistNickname?: string
	sortRating?: SortType
	sortByDate?: SortType
}
