import { axiosClassic, instanse } from '@/api/api.interceptor'
import { Comment, CreateCommentDto } from '@/types/comment'

const COMMENT_ADDRESS = 'comments'

export const CommentService = {
	// Получает все комментарии для определенного трека.
	async getAllCommentsByTrack(
		trackId: number | string,
		currentArtistId?: number | string,
	) {
		if (currentArtistId) {
			return instanse<Comment[]>({
				url: `${COMMENT_ADDRESS}/track/${trackId}`,
				method: 'GET',
			})
		} else {
			return axiosClassic<Comment[]>({
				url: `${COMMENT_ADDRESS}/track/${trackId}`,
				method: 'GET',
			})
		}
	},

	// Создает новый комментарий.
	async createComment(data: CreateCommentDto) {
		return instanse<Comment>({
			url: COMMENT_ADDRESS,
			method: 'POST',
			data,
		})
	},

	// Like dislike comment
	async likeOrDislikeComment(
		commentId: number | string,
		type: 'like' | 'dislike',
	) {
		return instanse<Comment>({
			url: `${COMMENT_ADDRESS}/${commentId}/${type}`,
			method: 'PATCH',
		})
	},

	//   Delete comment
	async deleteComment(commentId: number | string) {
		return instanse<Comment>({
			url: `${COMMENT_ADDRESS}/${commentId}`,
			method: 'DELETE',
		})
	},
}
