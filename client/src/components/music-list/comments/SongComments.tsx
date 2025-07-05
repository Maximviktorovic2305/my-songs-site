'use client'

import { useState } from 'react'
import Comment from './Comment'
import { MusicAddComment } from '../add-comment/MusicAddComment'
import { useGetAllCommentsByTrack } from '@/services/queries/comment'
import { useParams } from 'next/navigation'
import SkeletonCommentItem from '@/components/skeletons/SkeletonCommentItem'
import { useLikeOrDislikeComment } from '@/services/queries/comment'

const SongComments = () => {
    const [likes, setLikes] = useState<Record<number, 'like' | 'dislike' | null>>(
        {},
    )

    const { songId } = useParams<{ songId: string }>()
    const { data: comments, status } = useGetAllCommentsByTrack(songId)
    const { mutateAsync: likeOrDislikeComment, status: likeOrDislikeStatus } = useLikeOrDislikeComment()

    const handleToggleLike = async (
        commentId: number,
        type: 'like' | 'dislike',
    ) => {
        // Сначала обновляем UI — мгновенный эффект
        setLikes((prev) => {
            const current = prev[commentId]
            if (current === type) {
                return { ...prev, [commentId]: null }
            } else {
                return { ...prev, [commentId]: type }
            }
        })

        // Затем вызываем мутацию на сервере
        try {
            await likeOrDislikeComment({ commentId, type })
            if (likeOrDislikeStatus === 'success') {
                
            }
        } catch (error) {
            console.error('Ошибка при установке оценки', error)
        }
    }

    if (status === 'pending') {
        return (
            <div className='flex flex-col gap-3'>
                {Array.from({ length: 4 }).map((_, index) => (
                    <SkeletonCommentItem key={index} />
                ))}
            </div>
        )
    }

    return (
        <div className='flex flex-col gap-3'>
            <MusicAddComment />
            {comments?.map((comment, index) => {
                const status = likes[comment.id] || null
                return (
                    <Comment
                        key={comment.id}
                        comment={comment}
                        onToggleLike={handleToggleLike}
                        likeStatus={status}
                        isLast={index === comments.length - 1}
                    />
                )
            })}
        </div>
    )
}

export default SongComments