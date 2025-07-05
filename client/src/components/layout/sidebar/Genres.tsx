import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion'
import { GenresEnum } from '@/types/enums'

const Genres = () => {
	return (
		<section>
			<Accordion
				type='single'
				collapsible
				className='w-full'
				defaultValue='item-1'>
				<AccordionItem value='item-1'>
					<AccordionTrigger className='text-shadow'>Жанры</AccordionTrigger>
					<AccordionContent className='flex flex-col gap-1'>
						{Object.values(GenresEnum).map((genre) => (
							<button
								key={genre}
								type='button'
								className='px-3 py-1 rounded-md text-left uppercase hover:underline hover:font-semibold duration-200 text-sm cursor-pointer transition-all'
								disabled={false}>
								{genre}
							</button>
						))}
					</AccordionContent>
				</AccordionItem>
			</Accordion>
		</section>
	)
}

export default Genres
