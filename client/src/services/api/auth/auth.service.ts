import { axiosClassic } from '@/api/api.interceptor'
import { IAuthResponse, LoginForm } from '@/types/auth'
import { getAccessToken, getRefreshToken, removeFromStorage, saveToStorage } from './auth.helper'

const AUTH_ADDRESS = '/auth'

export const AuthService = {
	async register(data: FormData) {
		const response = await axiosClassic<IAuthResponse>({
			url: `${AUTH_ADDRESS}/register`,
			method: 'POST',
			data,
		})
		if (response.data.accessToken) saveToStorage(response.data)
		return response.data
	},

	async login(data: LoginForm) {
		const response = await axiosClassic<IAuthResponse>({
			url: `${AUTH_ADDRESS}/login`,
			method: 'POST',
			data,
		})
		if (response.data.accessToken) saveToStorage(response.data)
		return response.data
	},

	async getNewTokens() {
		const refreshToken = getRefreshToken()
		const response = await axiosClassic.post<IAuthResponse>(
			`${AUTH_ADDRESS}/login/access-token`,
			{ refreshToken },
		)
		if (response.data.accessToken) saveToStorage(response.data)
		return response.data
	},

	async getProfile() {
		const accessToken = getAccessToken()
		if (!accessToken) throw new Error('Access token not found')

		const response = await axiosClassic.get<IAuthResponse>(
			`${AUTH_ADDRESS}/me`,
			{
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			},
		)
		return response.data
	},

	async logout() {
		removeFromStorage()
	},
}
