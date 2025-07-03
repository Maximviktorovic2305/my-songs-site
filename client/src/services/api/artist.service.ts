import { instanse } from '@/api/api.interceptor'
import { Artist } from '@/types/artist'

const ARTIST_ADDRESS = 'artists'

export const ArtistService = {
	// Получение всех артистов
	async getAllArtists() {
		return instanse<Artist[]>({
			url: ARTIST_ADDRESS,
			method: 'GET',
		})
	},

	// Получение артиста по ID
	async getArtistById(id: number | string) {
		return instanse<Artist>({
			url: `${ARTIST_ADDRESS}/${id}`,
			method: 'GET',
		})
	},

	// Удаление артиста
	async deleteArtist(id: number | string) {
		return instanse({
			url: `${ARTIST_ADDRESS}/${id}`,
			method: 'DELETE',
		})
	},
}
