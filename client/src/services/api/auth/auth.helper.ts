import { ACCESS_TOKEN, REFRESH_TOKEN } from '@/constants/token.constants'
import { IAuthResponse, TokensProps } from '@/types/auth'

export const saveTokensStorage = (data: TokensProps) => {
	localStorage.setItem(ACCESS_TOKEN, data.accessToken)
	localStorage.setItem(REFRESH_TOKEN, data.refreshToken)
}

export const removeFromStorage = () => {
	localStorage.removeItem(ACCESS_TOKEN)
	localStorage.removeItem(REFRESH_TOKEN)
	localStorage.removeItem('artist')
}

export const getAccessToken = () => {
	const accessToken = localStorage.getItem(ACCESS_TOKEN)
	return accessToken || null
}

export const getRefreshToken = () => {
	const refreshToken = localStorage.getItem(REFRESH_TOKEN)
	return refreshToken || null
}

export const getArtistFromStorage = () => {
	const artist = localStorage.getItem('artist')
	return artist ? JSON.parse(artist) : {}
}

export const saveToStorage = (data: IAuthResponse) => {
	saveTokensStorage(data)
	localStorage.setItem('artist', JSON.stringify(data.artist))
}
