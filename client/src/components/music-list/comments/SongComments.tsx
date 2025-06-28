import { useState } from "react"
import Comment from "./Comment"
import { Track } from "@/types"

const SongComments = ({ song }: { song: Track }) => {
    const [likes, setLikes] = useState<Record<number, 'like' | 'dislike' | null>>({})

    if (!song || !song.comments || song.comments.length === 0) {
        return <div>Оставь первый комментарий к песне...</div>
    }

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
            {song.comments.map((comment) => {
                const status = likes[comment.id] || null
                return (
                    <Comment
                        key={comment.id}
                        comment={comment}
                        onToggleLike={toggleLike}
                        likeStatus={status}
                    />
                )
            })}
        </div>
    )
}

export default SongComments