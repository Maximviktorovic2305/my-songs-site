'use client'

import { Rating } from 'react-simple-star-rating'
import { Star } from 'lucide-react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { useSetTrackRating } from '@/services/queries/track'

interface Props {
	type?: 'normal' | 'popup'
	rating?: number
	setRating?: (value: number) => void
	readonly?: boolean
	trackId?: number | string
}

export default function StarRating({
	type = 'normal',
	rating = 0,
	setRating,
	readonly = false,
	trackId,
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
		} else {
			console.log(
				`[StarRating] Условие trackId && !readonly ЛОЖНО. trackId: ${trackId}, readonly: ${readonly}`,
			)
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
						<Star className='w-4.5 h-auto text-gray-400 cursor-pointer' />
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
