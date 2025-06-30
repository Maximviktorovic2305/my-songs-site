'use client'

import { Heart } from 'lucide-react'
import { useState } from 'react'

interface Props {
	initialIsFavorite?: boolean
	songId: number
	size?: 'sm' | 'md'
}

const LoveIcon = ({ initialIsFavorite=false, songId, size='sm' }: Props) => {
	const [isFavorite, setIsFavorite] = useState(initialIsFavorite)

	const handleToggleFavorite = async () => {
		const newStatus = !isFavorite

		// Оптимистично обновляем состояние
		setIsFavorite(newStatus)

		try {
			const res = await fetch('/api/favorites', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					songId,
					isFavorite: newStatus,
				}),
			})

			if (!res.ok) {
				throw new Error('Server response was not ok')
			}
		} catch (error) {
			console.error('Error toggling favorite:', error)

			// Откатываем изменение, если произошла ошибка
			setIsFavorite(!newStatus)
		}
	}

	return (
		<div className='relative'>
			<Heart
				className={`${size === 'sm' ? 'size-4' : 'size-6'} cursor-pointer transition-colors ${
					isFavorite
						? 'text-red-500 hover:text-red-500'
						: 'text-gray-400 hover:text-gray-700'
				}`}
				fill={isFavorite ? '#ff6467' : '#fff'}
				onClick={handleToggleFavorite}
			/>
		</div>
	)
}

export default LoveIcon
