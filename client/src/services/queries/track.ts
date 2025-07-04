'use client'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { CreateTrackDto, FilterOptions } from '@/types/track'
import { TrackService } from '../api/track.service'
import { GenresEnum } from '@/types/enums'
import { SortType } from '@/types'

// Получение всех треков
export const useGetAllTracks = () => {
	const { data, status, error } = useQuery({
		queryKey: ['tracks'],
		queryFn: async () => TrackService.getAllTracks(),
		select: ({ data }) => data,
	})

	return { data, status, error }
}

// Получение фильтрованных треков
export const useGetFilteredTracks = (options: FilterOptions) => {
	const { data, status, error } = useQuery({
		queryKey: ['tracks', 'filtered', options],
		queryFn: async () => TrackService.getFilteredTracks(options),
		select: ({ data }) => data,
	})

	return { data, status, error }
}

// Поиск треков по названию
export const useSearchTracksByTitle = (title: string) => {
	const { data, status, error } = useQuery({
		queryKey: ['tracks', 'search', title],
		queryFn: async () => TrackService.searchTracksByTitle(title),
		select: ({ data }) => data,
	})

	return { data, status, error }
}

// Получение треков по жанру
export const useGetTracksByGenres = (genres: GenresEnum[]) => {
	const { data, status, error } = useQuery({
		queryKey: ['tracks', 'genres', genres.join(',')],
		queryFn: () => TrackService.getTracksByGenres(genres),
		select: ({ data }) => data,
	})

	return { data, status, error }
}

// Получение треков по рейтингу
export const useGetTracksByRating = (order: SortType = 'desc') => {
	const { data, status, error } = useQuery({
		queryKey: ['tracks', 'rating', order],
		queryFn: async () => TrackService.getTracksByRating(order),
		select: ({ data }) => data,
	})

	return { data, status, error }
}

// Получение треков по дате
export const useGetTracksByDate = (order: SortType = 'desc') => {
	const { data, status, error } = useQuery({
		queryKey: ['tracks', 'date', order],
		queryFn: async () => TrackService.getTracksByDate(order),
		select: ({ data }) => data,
	})

	return { data, status, error }
}

// Получение треков по артисту
export const useGetTracksByArtist = (
	artistId?: number | string,
	artistNickname?: string,
) => {
	const { data, status, error } = useQuery({
		queryKey: ['tracks', 'artist', artistId, artistNickname],
		queryFn: async () =>
			TrackService.getTracksByArtist(artistId, artistNickname),
		select: ({ data }) => data,
	})

	return { data, status, error }
}

// Получение избранных треков
export const useGetFavoriteTracks = () => {
    const { data, status, error } = useQuery({
      queryKey: ['tracks', 'favorites'],
      queryFn: async () => TrackService.getFavoriteTracks(),
      select: ({ data }) => data,
    })

    return { data, status, error }
}

// Получение трека по ID
export const useGetTrackById = (id: number | string) => {
	const { data, status, error } = useQuery({
		queryKey: ['tracks', id],
		queryFn: async () => TrackService.getTrackById(id),
		select: ({ data }) => data,
	})

	return { data, status, error }
}

// Создание трека
export const useCreateTrack = () => {
	const queryClient = useQueryClient()

	const { mutateAsync, status, error } = useMutation({
		mutationFn: async ({
			data,
			audioFile,
			imageFile,
		}: {
			data: CreateTrackDto
			audioFile: File
			imageFile?: File
		}) => {
			return TrackService.createTrack(data, audioFile, imageFile)
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['tracks'] })
		},
	})

	return { mutateAsync, status, error }
}

// Переключение состояния избранного трека         
export const useToggleFavorite = () => {
    const queryClient = useQueryClient()

    const { mutateAsync, status, error } = useMutation({
      mutationFn: async (trackId: number | string) =>
          TrackService.toggleFavorite(trackId),
      onSuccess: (response, trackId) => {
        queryClient.invalidateQueries({ queryKey: ['tracks', 'favorites'] })
        queryClient.invalidateQueries({ queryKey: ['tracks', trackId] })
        queryClient.invalidateQueries({ queryKey: ['tracks'] })
      },
    })

    return { mutateAsync, status, error }
}

// Установка рейтинга трека
export const useSetTrackRating = () => {
	const queryClient = useQueryClient()

	const { mutateAsync, status, error } = useMutation({
		mutationFn: ({
			trackId,
			rating,
		}: {
			trackId: number | string
			rating: number | string
		}) => TrackService.setTrackRating(trackId, rating),
		onSuccess: async (updatedTrack) => {
			queryClient.invalidateQueries({ queryKey: ['tracks', updatedTrack.data.id] })
			queryClient.invalidateQueries({ queryKey: ['tracks', 'favorites'] })
		},
	})

   return { mutateAsync, status, error }
}

// Удаление трека
export const useDeleteTrack = () => {
	const queryClient = useQueryClient()

	const { mutateAsync, status, error } = useMutation({
		mutationFn: async (id: number | string) => TrackService.deleteTrack(id),
		onSuccess: (data, id) => {
			queryClient.invalidateQueries({ queryKey: ['tracks'] })
			queryClient.invalidateQueries({ queryKey: ['tracks', id] })
			queryClient.invalidateQueries({ queryKey: ['tracks', 'favorites'] })
		},
	})   

   return { mutateAsync, status, error }         
}
