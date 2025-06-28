'use client'

import Image from 'next/image'
import LikeButton from './LikeButton'
import type { Comment } from '@/types'

interface CommentProps {
	comment: Comment
	onToggleLike: (commentId: number, type: 'like' | 'dislike') => void
	likeStatus: 'like' | 'dislike' | null
}

const Comment = ({ comment, onToggleLike, likeStatus }: CommentProps) => {
	return (
		<div key={comment.id} className='flex gap-3 border-b py-3'>
			<div>
				<Image
					width={100}
					height={100}
					src={comment.user?.avatar ?? ''}
					alt={comment.user?.name ?? ''}
					className='rounded overflow-hidden max-sm:min-h-[4.375rem] max-sm:min-w-[4.375rem]'
				/>
			</div>
			<div className='flex flex-col w-full'>
				<div className='flex justify-between items-start'>
					<div>
						<span className='font-bold text-primary/90'>
							{comment.user?.name}
						</span>
						<p className='text-muted-foreground font-normal text-sm mt-1'>
							{comment.text}
						</p>
					</div>
					<div className='text-sm text-muted-foreground self-end'>
						<span>{comment.createdAt}</span>
					</div>
				</div>

				<div className='mt-3 flex items-center gap-2 self-end'>
					<LikeButton
						type='like'
						onClick={() => onToggleLike(comment.id, 'like')}
						active={likeStatus === 'like'}
						count={comment.like}
					/>
					<LikeButton
						type='dislike'
						onClick={() => onToggleLike(comment.id, 'dislike')}
						active={likeStatus === 'dislike'}
						count={comment.dislike}
					/>
				</div>
			</div>
		</div>
	)
}

export default Comment
