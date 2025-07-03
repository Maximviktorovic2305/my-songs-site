'use client'

import { RootState } from '@/store/store'
import { useSelector } from 'react-redux'

export const usePlayer = () => useSelector((state: RootState) => state.player)
export const useArtist = () => useSelector((state: RootState) => state.artist)
