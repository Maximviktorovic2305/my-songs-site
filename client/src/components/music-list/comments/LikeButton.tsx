import { ThumbsDown, ThumbsUp } from 'lucide-react'
import { useState } from 'react'; 

const LikeButton = ({
  type,
  onClick,
  count,
}: {
  type: 'like' | 'dislike'
  onClick: () => void
  count?: number
  commentId: number 
}) => {
  const Icon = type === 'like' ? ThumbsUp : ThumbsDown

  const [localActive, setLocalActive] = useState(false);

  const handleClick = () => {
    onClick(); 
    setLocalActive(prev => !prev); 
  };

  return (
    <div className='relative'>
      <Icon
        className={`rounded border shadow-sm p-1 size-6 cursor-pointer duration-200 ${
          localActive ? 'border-accent' : '' 
        }`}
        stroke={localActive ? '#73dde3' : '#c7c4c4'} 
        onClick={handleClick} 
      />
      {count ? (
        <span className='absolute -top-1 -right-1 text-[0.5rem] bg-red-400 rounded-full px-1 text-white flex items-center justify-center w-3 h-3'>
          {count}
        </span>
      ) : null}
    </div>
  )
}

export default LikeButton
