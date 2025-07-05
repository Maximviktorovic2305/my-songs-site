import { ThumbsDown, ThumbsUp } from 'lucide-react'

const LikeButton = ({
    type,
    onClick,
    active,
    count,
}: {
    type: 'like' | 'dislike'
    onClick: () => void
    active: boolean
    count?: number
    commentId?: number
}) => {
    const Icon = type === 'like' ? ThumbsUp : ThumbsDown

    const handleClick = () => {
        onClick()
    }

    return (
        <div className='relative'>
            <Icon
                className={`rounded border shadow-sm p-1 size-6 cursor-pointer duration-200 ${
                    active ? 'border-accent' : ''
                }`}
                stroke={active ? '#73dde3' : '#c7c4c4'}
                onClick={handleClick}
            />
            {count !== null && count !== undefined && count > 0 ? (
                <span className='absolute -top-1 -right-1 text-[0.5rem] bg-red-400 rounded-full px-1 text-white flex items-center justify-center w-3 h-3'>
                    {count}
                </span>
            ) : null}
        </div>
    )
}

export default LikeButton