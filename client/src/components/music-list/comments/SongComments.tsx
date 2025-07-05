'use client'

import Comment from './Comment'
import { MusicAddComment } from '../add-comment/MusicAddComment'
import { useGetAllCommentsByTrack } from '@/services/queries/comment'
import { useParams } from 'next/navigation'
import SkeletonCommentItem from '@/components/skeletons/SkeletonCommentItem'
import { useLikeOrDislikeComment } from '@/services/queries/comment'

const SongComments = () => {

  const { songId } = useParams<{ songId: string }>()
  const { data: comments, status } = useGetAllCommentsByTrack(songId)
  const { mutateAsync: likeOrDislikeComment } = useLikeOrDislikeComment()

  const handleToggleLike = async (commentId: number, type: 'like' | 'dislike') => { 
    try {
      await likeOrDislikeComment({ commentId, type })
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
        return (
          <Comment
            key={comment.id}
            comment={comment}
            onToggleLike={handleToggleLike} 
            isLast={index === comments.length - 1}
          />
        )
      })}
    </div>
  )
}

export default SongComments