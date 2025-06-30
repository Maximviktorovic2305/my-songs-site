import { Artist, Track } from '@/types'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface PlayerState {
	currentTrack: {
		src: string | null
		title: string | null
		artist: Artist | null
		id: number | null
		endlessTime?: string | null
		rayting?: number | null
		img?: string | null
	},
	isPlaying: boolean
}

const initialState: PlayerState = {
	currentTrack: {
		src: null,
		title: null,
		artist: null,
		id: null,
		endlessTime: null,
		rayting: null,
		img: null,
	},
	isPlaying: false
}

const playerSlice = createSlice({
	name: 'player-slice',
	initialState,
	reducers: {
		setCurrentTrack: (state, action: PayloadAction<Track>) => {
			state.currentTrack.src = action.payload.src
			state.currentTrack.title = action.payload.title
			state.currentTrack.artist = action.payload.artist
			state.currentTrack.endlessTime = action.payload.endlessTime
			state.currentTrack.rayting = action.payload.rayting
			state.currentTrack.img = action.payload.img
		},
		clearTrack: (state) => {
			state.currentTrack.artist = null
			state.currentTrack.title = null
			state.currentTrack.src = null
			state.currentTrack.endlessTime = null
			state.currentTrack.rayting = null
			state.currentTrack.img = null
			state.isPlaying = false
		},
		play: (state) => {
			state.isPlaying = true
		},
		pause: (state) => {
			state.isPlaying = false
		}
	},
})

export const { setCurrentTrack, clearTrack, play, pause } = playerSlice.actions
export default playerSlice
