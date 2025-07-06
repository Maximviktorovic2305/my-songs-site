'use client'

import { useToggleFavorite } from '@/services/queries/track'
import { Heart } from 'lucide-react'

interface Props {
    initialIsFavorite?: boolean         
    songId: number
    size?: 'sm' | 'md'
}

const LoveIcon = ({ initialIsFavorite = false, songId, size = 'sm' }: Props) => {
    const { mutateAsync: toggleFavoriteMutation } = useToggleFavorite();

    const handleToggleFavorite = async () => {
        try {
            toggleFavoriteMutation(songId);
        } catch (error) {
            console.error('Error toggling favorite:', error);
        }
    }

    return (
        <div className='relative'>
            <Heart
                className={`${size === 'sm' ? 'size-4' : 'size-6'} cursor-pointer transition-colors text-shadow ${
                    initialIsFavorite 
                        ? 'text-red-500 hover:text-red-500'
                        : 'text-gray-400 hover:text-gray-700'
                }`}
                fill={initialIsFavorite ? '#ff6467' : '#fff'}
                onClick={handleToggleFavorite}
            />
        </div>
    )
}

export default LoveIcon