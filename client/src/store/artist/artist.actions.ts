import { errorCatch } from '@/api/api.helper'
import { removeFromStorage } from '@/services/api/auth/auth.helper'
import { AuthService } from '@/services/api/auth/auth.service'
import { IAuthResponse, LoginForm } from '@/types/auth'
import { createAsyncThunk } from '@reduxjs/toolkit'

export const register = createAsyncThunk<IAuthResponse, FormData>(
	'auth/register',
	async (data, thunkApi) => {
		try {
			const response = await AuthService.register(data)
			return response
		} catch (error) {
			return thunkApi.rejectWithValue(error)
		}
	},
)

export const login = createAsyncThunk<IAuthResponse, LoginForm>(
	'auth/login',
	async (data, thunkApi) => {
		try {
			const response = await AuthService.login(data)

			return response
		} catch (error) {
			return thunkApi.rejectWithValue(error)
		}
	},
)

export const logout = createAsyncThunk('auth/logout', async () => {
	removeFromStorage()
})

export const checkAuth = createAsyncThunk<IAuthResponse>(
	'auth/checkAuth',
	async (_, thunkApi) => {
		try {
			const response = await AuthService.getNewTokens()
			return response.data
		} catch (error) {
			if (errorCatch(error) === 'jwt expired') {
				thunkApi.dispatch(logout())
			}

			return thunkApi.rejectWithValue(error)
		}
	},
)
