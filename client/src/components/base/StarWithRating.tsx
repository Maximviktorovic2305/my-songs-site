import { Star } from 'lucide-react'

const StarIconWithRating = ({ rating }: { rating: number }) => {
	const normalizedRating = Math.min(Math.max(rating / 5, 0), 1)

	return (
		<div className='relative w-4.5 h-4.5'>
			<Star className='w-full h-full text-gray-300' />

			<Star
				className='absolute top-0 left-0 w-full h-full'
				style={{
					maskImage: `linear-gradient(to right, black ${
						normalizedRating * 100
					}%, transparent ${normalizedRating * 100}%)`,
					WebkitMaskImage: `linear-gradient(to right, black ${
						normalizedRating * 100
					}%, transparent ${normalizedRating * 100}%)`,
					color: '#73dde3',
					fill: 'currentColor',
				}}
			/>
		</div>
	)
}

export default StarIconWithRating
