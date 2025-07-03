import { axiosClassic, instanse } from '@/api/api.interceptor'
import { Comment, CreateCommentDto } from '@/types/comment'

const COMMENT_ADDRESS = 'comments'

export const CommentService = {
	// Создать комментарий
	async createComment(data: CreateCommentDto) {
		return instanse<Comment>({
			url: COMMENT_ADDRESS,
			method: 'POST',
			data,
		})
	},

	// Поставить лайк или дизлайк
	async likeOrDislikeComment(
		commentId: number | string,
		type: 'like' | 'dislike',
	) {
		return instanse<Comment>({
			url: `${COMMENT_ADDRESS}/${commentId}/${type}`,
			method: 'PATCH',
		})
	},

	//   Удалить комментарий
	async deleteComment(commentId: number | string) {
		return instanse({
			url: `${COMMENT_ADDRESS}/${commentId}`,
			method: 'DELETE',
		})
	},

	// Получить все комментарии по треку
	async getAllCommentsByTrack(trackId: number | string) {
		return axiosClassic<Comment[]>({
			url: `${COMMENT_ADDRESS}/track/${trackId}`,
			method: 'GET',
		})
	},
}
