import Image from 'next/image'
import LikeButton from './LikeButton'
import type { Comment } from '@/types'

interface CommentProps {
    comment: Comment
    onToggleLike: (commentId: number, type: 'like' | 'dislike') => void
    likeStatus: 'like' | 'dislike' | null
    isLast?: boolean
}

const Comment = ({ comment, onToggleLike, likeStatus, isLast }: CommentProps) => {
    return (
        <div key={comment.id} className={`pb-3 ${!isLast ? 'border-b' : ''}`}>
            <div className='relative'>
                <div className='float-left mr-3 mb-3 hidden sm:block'>
                    <Image
                        width={100}
                        height={100}
                        src={comment.user?.avatar ?? ''}
                        alt={comment.user?.name ?? ''}
                        className='rounded overflow-hidden w-[4.375rem] h-[4.375rem]'
                    />
                </div>

                {/* Мобильный аватар + обтекание */}
                <div className='sm:hidden mb-2'>
                    <Image
                        width={100}
                        height={100}
                        src={comment.user?.avatar ?? ''}
                        alt={comment.user?.name ?? ''}
                        className='rounded overflow-hidden w-[4.375rem] h-[4.375rem] float-left mr-3'
                    />
                </div>

                {/* Основной контент */}
                <div className='w-full'>
                    <div className='flex justify-between items-start'>
                        <span className='font-bold text-primary/90'>
                            {comment.user?.name}
                        </span>
                        <div className='text-sm text-muted-foreground'>
                            <span>{comment.createdAt}</span>
                        </div>
                    </div>

                    <p className='text-muted-foreground font-normal text-sm mt-1 whitespace-pre-wrap'>
                        {comment.text}
                    </p>

                    <div className='mt-3 flex items-center gap-2 justify-self-end'>
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
        </div>
    )
}

export default Comment