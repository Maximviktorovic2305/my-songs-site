import { configureStore } from '@reduxjs/toolkit';
import playerSlice from './playerSlice/player.slice';
import { artistSlice } from './artist/artist.slice';


const store = configureStore({
  reducer: {
    player: playerSlice.reducer,
    artist: artistSlice.reducer
  },
});   

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;