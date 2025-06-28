import { useState } from 'react'
import Comment from './Comment'
import { Track } from '@/types'
import { MusicAddComment } from '../add-comment/MusicAddComment'

const SongComments = ({ song }: { song: Track }) => {
	const [likes, setLikes] = useState<Record<number, 'like' | 'dislike' | null>>(
		{},
	)

	const toggleLike = (commentId: number, type: 'like' | 'dislike') => {
		setLikes((prev) => {
			const current = prev[commentId]

			if (current === type) {
				return { ...prev, [commentId]: null }
			} else {
				return { ...prev, [commentId]: type }
			}
		})

		console.log(`Toggled ${type} for comment ID: ${commentId}`)
	}

	return (
		<div className='flex flex-col gap-3'>
			<MusicAddComment />         
			{song &&
				song?.comments?.map((comment, index) => {
					const status = likes[comment.id] || null
					return (
						<Comment
							key={comment.id}
							comment={comment}
							onToggleLike={toggleLike}
							likeStatus={status}
							isLast={index === (song.comments && song.comments.length - 1)}
						/>
					)
				})}
		</div>
	)
}

export default SongComments
