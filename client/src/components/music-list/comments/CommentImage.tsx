import { Comment } from '@/types/comment'
import Image from 'next/image'
import React from 'react'

interface Props {
	comment: Comment
}

const CommentImage = ({ comment }: Props) => {
	return (
		<section>
			<div className='float-left mr-3 mb-3 hidden sm:block'>
				<Image
					width={100}
					height={100}
					src={
						comment.artist?.avatar
							? comment.artist?.avatar
							: '/no-image-avatar.png'
					}
					alt={comment.artist?.name ?? ''}
					className='rounded overflow-hidden shadow-md shadow-primary w-[4.375rem] h-[4.375rem]'
				/>
			</div>

			{/* Мобильный аватар + обтекание */}
			<div className='sm:hidden mb-2'>
				<Image
					width={100}
					height={100}
					src={
						comment.artist?.avatar
							? comment.artist?.avatar
							: '/no-image-avatar.png'
					}
					alt={comment.artist?.name ?? ''}
					className='rounded overflow-hidden shadow-md shadow-primary w-[4.375rem] h-[4.375rem] float-left mr-3'
				/>
			</div>
		</section>
	)
}

export default CommentImage
