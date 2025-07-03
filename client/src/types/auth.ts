import { Artist } from "./artist"

export interface TokensProps {
	accessToken: string
	refreshToken: string
}

export interface IAuthResponse extends TokensProps {
	artist: Artist
}

export interface RegisterForm {
	nickname: string
	name: string
	email: string
	password: string
	avatar: string
}

export interface LoginForm {
	password: string
	email: string
}