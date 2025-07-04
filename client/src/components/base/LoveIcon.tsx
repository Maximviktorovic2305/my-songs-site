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
            const result = await toggleFavoriteMutation(songId);
            console.log('Toggle favorite result:', result);
        } catch (error) {
            console.error('Error toggling favorite:', error);
        }
    }

    return (
        <div className='relative'>
            <Heart
                className={`${size === 'sm' ? 'size-4' : 'size-6'} cursor-pointer transition-colors ${
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