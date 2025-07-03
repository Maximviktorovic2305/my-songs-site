import { getStorageLocal } from "@/utils/local-storage";
import { createSlice } from "@reduxjs/toolkit";
import { checkAuth, login, logout, register } from "./artist.actions";
import { Artist } from "@/types/artist";

interface InitialState {
   artist: Artist | null
   isLoading: boolean
}

const initialState: InitialState = {
   artist: getStorageLocal("artist"),
   isLoading: false,
};

export const artistSlice = createSlice({
   name: "artist",
   initialState,
   reducers: {},
   extraReducers: (builder) => {
      builder
         .addCase(register.pending, (state) => {
            state.isLoading = true;
         })
         .addCase(register.fulfilled, (state, action) => {
            state.isLoading = false;
            state.artist = action.payload.artist;
         })
         .addCase(register.rejected, (state) => {
            state.isLoading = false;
            state.artist = null;
         })
         .addCase(login.pending, (state) => {
            state.isLoading = true;
         })
         .addCase(login.fulfilled, (state, action) => {
            state.isLoading = false;
            state.artist = action.payload.artist;
         })
         .addCase(login.rejected, (state) => {
            state.isLoading = false;
            state.artist = null;
         })
         .addCase(logout.fulfilled, (state) => {
            state.isLoading = false;
            state.artist = null;
         })
         .addCase(checkAuth.fulfilled, (state, { payload }) => {
            state.artist = payload.artist;
         });
   },
});