import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { ArtistService } from '../api/artist.service'

// Получение всех артистов
export const useGetAllArtists = () => {
	const { data, status, error } = useQuery({
		queryKey: ['artists'],
		queryFn: async () => ArtistService.getAllArtists(),
		select: ({ data }) => data,
	})

	return { data, status, error }
}

// Получение артиста по d
export const useGetArtistById = (id: number | string) => {
	const { data, status, error } = useQuery({
		queryKey: ['artists', id],
		queryFn: async () => ArtistService.getArtistById(id),
		select: ({ data }) => data,
	})

	return { data, status, error }
}

// Хук для удаления артиста
export const useDeleteArtist = () => {
	const queryClient = useQueryClient()

	const { mutateAsync, status, error } = useMutation({
		mutationFn: async (id: string | number) => ArtistService.deleteArtist(id),
		onSuccess: () => {
			// Инвалидируем список артистов
			queryClient.invalidateQueries({ queryKey: ['artists'] })
		},
	})

	return { mutateAsync, status, error }
}
