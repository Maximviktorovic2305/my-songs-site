import { ThumbsDown, ThumbsUp } from "lucide-react"

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
}) => {
    const Icon = type === 'like' ? ThumbsUp : ThumbsDown

    return (
        <div className='relative'>
            <Icon
                className={`rounded border p-1 size-6 cursor-pointer duration-200 ${
                    active ? 'border-accent' : ''
                }`}
                stroke={active ? '#73dde3' : '#c7c4c4'}
                onClick={onClick}
            />
            {count && (
                <span className='absolute -top-2 -right-1 text-[0.5rem] bg-red-400 rounded-full px-1 text-white'>
                    {count}
                </span>
            )}
        </div>
    )
}

export default LikeButton