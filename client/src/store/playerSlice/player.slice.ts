import { Track } from '@/types'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface PlayerState {
	currentTrack: {
		src: string | null
		title: string | null
		artist: string | null
		id: number | null
	}
}

const initialState: PlayerState = {
	currentTrack: {
		src: null,
		title: null,
		artist: null,
		id: null,
	},
}

const playerSlice = createSlice({
	name: 'player-slice',
	initialState,
	reducers: {
		setCurrentTrack: (state, action: PayloadAction<Track>) => {
			state.currentTrack ? (state.currentTrack.src = action.payload.src) : null
			state.currentTrack
				? (state.currentTrack.title = action.payload.title)
				: null
			state.currentTrack
				? (state.currentTrack.artist = action.payload.artist)
				: null
		},
		clearTrack: (state) => {
			state.currentTrack.artist = null
			state.currentTrack.title = null
			state.currentTrack.src = null
		},
	},
})

export const { setCurrentTrack, clearTrack } = playerSlice.actions
export default playerSlice
