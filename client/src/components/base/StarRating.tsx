'use client'

import { Rating } from 'react-simple-star-rating'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { useSetTrackRating } from '@/services/queries/track'
import StarIconWithRating from './StarWithRating'

interface Props {
	trackId?: number
	type?: 'normal' | 'popup'
	rating?: number
	setRating?: (value: number) => void
	readonly?: boolean
}

export default function StarRating({
	trackId,
	type = 'normal',
	rating,
	setRating,
	readonly = false,
}: Props) {
	const { mutateAsync: setTrackRatingMutation } = useSetTrackRating()

	const handleRating = async (newRating: number) => {
		if (setRating) {
			setRating(newRating)
		}

		if (trackId && !readonly) {
			try {
				await setTrackRatingMutation({ trackId, rating: newRating })
			} catch (error) {
				console.error(
					`Ошибка при установке рейтинга для трека ${trackId}:`,
					error,
				)
			}
		}
	}

	return (
		<section>
			{type === 'normal' ? (
				<Rating
					onClick={!readonly ? handleRating : undefined}
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
						 <StarIconWithRating rating={rating ?? 0} />
					</PopoverTrigger>
					<PopoverContent className='w-fit h-fit'>
						<Rating
							onClick={!readonly ? handleRating : undefined}
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
