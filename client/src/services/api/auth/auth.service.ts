import { IAuthResponse, LoginForm } from '@/types/auth'
import { getRefreshToken, saveToStorage } from './auth.helper'
import { axiosClassic } from '@/api/api.interceptor'

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

		const response = await axiosClassic.post<string, { data: IAuthResponse }>(
			`${AUTH_ADDRESS}/login/access-token`,
			{ refreshToken },
		)
		if (response.data.accessToken) saveToStorage(response.data)

		return response
	},
}         
