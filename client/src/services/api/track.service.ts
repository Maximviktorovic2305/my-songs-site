import { instanse } from '@/api/api.interceptor'
import { SortType } from '@/types'
import { GenresEnum } from '@/types/enums'
import { CreateTrackDto, FilterOptions, Track } from '@/types/track'

const TRACK_ADDRESS = 'tracks'

export const TrackService = {
	// Создать трек
	async createTrack(data: CreateTrackDto, audioFile: File, imageFile?: File) {
		const formData = new FormData()
		formData.append('title', data.title)
		formData.append('genres', data.genres.join(','))
		formData.append('audio', audioFile)
		if (imageFile) {
			formData.append('image', imageFile)
		}

		return instanse<Track>({
			url: TRACK_ADDRESS,
			method: 'POST',
			data: formData,
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		})
	},

	// Получить все треки
	async getAllTracks() {
		return instanse<Track[]>({
			url: TRACK_ADDRESS,
			method: 'GET',
		})
	},

	// Получить все треки с фильтрами
	async getFilteredTracks(options: FilterOptions) {
		const params = new URLSearchParams()

		if (options.genres && options.genres.length > 0) {
			params.append('genres', options.genres.join(','))
		}
		if (options.title) {
			params.append('title', options.title)
		}
		if (options.artistId) {
			params.append('artistId', options.artistId.toString())
		}
		if (options.artistNickname) {
			params.append('artistNickname', options.artistNickname)
		}
		if (options.sortRating) {
			params.append('sortRating', options.sortRating)
		}
		if (options.sortByDate) {
			params.append('sortByDate', options.sortByDate)
		}

		return instanse<Track[]>({
			url: `${TRACK_ADDRESS}/filter`,
			method: 'GET',
			params,
		})
	},

	// Поиск треков по названию
	async searchTracksByTitle(title: string) {
		return instanse<Track[]>({
			url: `${TRACK_ADDRESS}/search`,
			method: 'GET',
			params: { title },
		})
	},

	// Поиск треков по жанру
	async getTracksByGenres(genres: GenresEnum[]) {
		const genresString = genres.join(',')
		return instanse<Track[]>({
			url: `${TRACK_ADDRESS}/genres`,
			method: 'GET',
			params: { genres: genresString },
		})
	},

	// Получить треки, отсортированные по рейтингу
	async getTracksByRating(order: SortType = 'desc') {
		return instanse<Track[]>({
			url: `${TRACK_ADDRESS}/rating`,
			method: 'GET',
			params: { order },
		})
	},

	// Получить треки, сортировка по дате добавления
	async getTracksByDate(order: SortType = 'desc') {
		return instanse<Track[]>({
			url: `${TRACK_ADDRESS}/date`,
			method: 'GET',
			params: { order },
		})
	},

	// Получить треки, по id или имени артиста
	async getTracksByArtist(artistId?: number | string, artistNickname?: string) {
		const params = new URLSearchParams()
		if (artistId) {
			params.append('artistId', artistId.toString())
		}
		if (artistNickname) {
			params.append('artistNickname', artistNickname)
		}
		return instanse<Track[]>({
			url: `${TRACK_ADDRESS}/artist`,
			method: 'GET',
			params,
		})
	},

	// Добавить трек в избранное
	async addTrackToFavorites(trackId: number | string) {
		return instanse<Track>({
			url: `${TRACK_ADDRESS}/${trackId}/favorite`,
			method: 'POST',
		})
	},

	// Удалить трек из избранного
	async removeTrackFromFavorites(trackId: number | string) {
		return instanse<void>({
			url: `${TRACK_ADDRESS}/${trackId}/favorite`,
			method: 'DELETE',
		})
	},

	// Получить все избранные треки
	async getFavoriteTracks() {
		return instanse<Track[]>({
			url: `${TRACK_ADDRESS}/favorites`,
			method: 'GET',
		})
	},

	// Установить рейтинг для трека
	async setTrackRating(trackId: number | string, rating: number | string) {
		return instanse<Track>({
			url: `${TRACK_ADDRESS}/${trackId}/rating/${rating}`,
			method: 'PATCH',
		})
	},

	// Получить трек по id
	async getTrackById(id: number | string) {
		return instanse<Track>({
			url: `${TRACK_ADDRESS}/${id}`,
			method: 'GET',
		})
	},

	// Удалить трек
	async deleteTrack(id: number | string) {
		return instanse<void>({
			url: `${TRACK_ADDRESS}/${id}`,
			method: 'DELETE',
		})
	},
}
