'use client'

import { Rating } from 'react-simple-star-rating'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import { Star } from 'lucide-react'

interface Props {
	type?: 'normal' | 'popup'
	rating?: number
	setRating?: (value: number) => void
	readonly?: boolean
}

export default function StarRating({
	type = 'normal',
	rating = 4,
	setRating,
	readonly = false,
}: Props) {
	const handleRating = (rating: number) => {
		if (setRating && readonly) {
			setRating(rating)
		}
		console.log(rating)
	}

	return (
		<section>
			{type === 'normal' ? (
				<Rating
					onClick={readonly ? handleRating : undefined}
					initialValue={rating}
					SVGstyle={{ display: 'inline-block' }}
					size={20}
					allowFraction
					transition
					fillColor='#73dde3'
					readonly={readonly}
				/>
			) : (
				<Popover>
					<PopoverTrigger asChild>
						<Star className='w-4.5 h-auto text-gray-400 cursor-pointer' />
					</PopoverTrigger>
					<PopoverContent className='w-fit h-fit'>
						<Rating
							onClick={readonly ? handleRating : undefined}
							initialValue={rating}
							SVGstyle={{ display: 'inline-block' }}
							size={20}
							allowFraction
							transition
							fillColor='#73dde3'
							readonly={readonly}
						/>
					</PopoverContent>
				</Popover>
			)}
		</section>
	)
}
