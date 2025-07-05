import { Comment, CreateCommentDto } from '@/types/comment'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { CommentService } from '../api/comment.service'

// Получить все комментарии по треку
export const useGetAllCommentsByTrack = (trackId: number | string) => {
	const { data, status, error } = useQuery({
		queryKey: ['comments', 'track', trackId],
		queryFn: async () => CommentService.getAllCommentsByTrack(trackId),
		select: ({ data }) => data,
		enabled: !!trackId,
	})

	return { data, status, error }
}

// Создать комментарий
export const useCreateComment = (trackId: number | string) => {
	const queryClient = useQueryClient()

	const { mutateAsync, status, error } = useMutation({
		mutationFn: async (data: CreateCommentDto) => {
			const response = await CommentService.createComment(data)
			return response.data
		},
		onSuccess: (newComment) => {
			queryClient.invalidateQueries({
				queryKey: ['comments', 'track', newComment.id],
			})
			queryClient.invalidateQueries({
				queryKey: ['comments', 'track', trackId],
			})
		},
	})

	return { mutateAsync, status, error }
}

// Поставить лайк или дизлайк
export const useLikeOrDislikeComment = () => {
	const queryClient = useQueryClient()

	const { mutateAsync, status, error } = useMutation({
		mutationFn: async ({
			commentId,
			type,
		}: {
			commentId: number | string
			type: 'like' | 'dislike'
		}) => {
			const response = await CommentService.likeOrDislikeComment(
				commentId,
				type,
			)
			return response.data as Comment
		},
		onSuccess: (updatedComment) => {
			queryClient.invalidateQueries({
				queryKey: ['comments', updatedComment.id],
			})

			queryClient.invalidateQueries({
				queryKey: ['comments', 'track'],
			})

			queryClient.invalidateQueries({
				queryKey: ['comments', 'track', updatedComment.track?.id],
			})
		},
	})

	return { mutateAsync, status, error }
}

//   Удалить комментарий
export const useDeleteComment = () => {
	const queryClient = useQueryClient()

	const { mutateAsync, status, error } = useMutation({
		mutationFn: async (commentId: number | string) =>
			CommentService.deleteComment(commentId),
		onSuccess: (commentId) => {
			// Инвалидируем кэш конкретного комментария
			queryClient.invalidateQueries({
				queryKey: ['comments', commentId],
			})
		},
	})

	return { mutateAsync, status, error }
}
