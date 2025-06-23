import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion'
import { genres } from '@/data/playlist'

const Genres = () => {
	return (
		<section>
			<Accordion
				type='single'
				collapsible
				className='w-full'
				defaultValue='item-1'>
				<AccordionItem value='item-1'>
					<AccordionTrigger>Жанры</AccordionTrigger>
					<AccordionContent className='flex flex-col gap-1'>
						{genres.map((genre, i) => (
							<p key={i}>{genre}</p>
						))}
					</AccordionContent>
				</AccordionItem>
			</Accordion>
		</section>
	)
}

export default Genres
