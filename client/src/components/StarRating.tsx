'use client'

import { Rating } from 'react-simple-star-rating'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import { Star } from 'lucide-react'

interface Props {
	type?: 'normal' | 'popup'
	rating?: number
	setRating?: (value: number) => void
}

export default function StarRating({ type = 'normal', rating, setRating }: Props) {
	const handleRating = (rating: number) => {
		if (setRating) {
			setRating(rating)
		}
		console.log(rating)
	}

	return (
		<section>
			{type === 'normal' ? (
				<Rating
					onClick={handleRating}
					initialValue={rating}
					SVGstyle={{ display: 'inline-block' }}
					size={20}
					allowFraction
					transition
					fillColor='#73dde3'
				/>
			) : (
				<Popover>
					<PopoverTrigger asChild>
						<Star className='w-4.5 h-auto text-gray-400 cursor-pointer' />
					</PopoverTrigger>
					<PopoverContent className='w-fit h-fit'>
						<Rating
							onClick={handleRating}
							initialValue={rating}
							SVGstyle={{ display: 'inline-block' }}
							size={20}
							allowFraction
							transition
							fillColor='#73dde3'
						/>
					</PopoverContent>
				</Popover>
			)}
		</section>
	)
}
