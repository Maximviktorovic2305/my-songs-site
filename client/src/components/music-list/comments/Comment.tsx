import LikeButton from './LikeButton'
import type { Comment } from '@/types/comment'
import CommentImage from './CommentImage'

interface CommentProps {
  comment: Comment
  onToggleLike: (commentId: number, type: 'like' | 'dislike') => void
  isLast?: boolean
}

const Comment = ({
  comment,
  onToggleLike,
  isLast,
}: CommentProps) => {
  return (
    <div key={comment.id} className={`pb-3 ${!isLast ? 'border-b' : ''}`}>
      <div className='relative'>
        <CommentImage comment={comment} />

        <div className='w-full'>
          <div className='flex justify-between items-start'>
            <span className='font-bold text-primary/90'>
              {comment.artist?.name}
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
              count={comment.like}
              commentId={comment.id}
            />
            <LikeButton
              type='dislike'
              onClick={() => onToggleLike(comment.id, 'dislike')}
              count={comment.dislike}
              commentId={comment.id}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Comment