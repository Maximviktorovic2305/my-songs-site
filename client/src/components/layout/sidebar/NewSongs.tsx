import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion'
import { newSongs } from '@/data/playlist'

const NewSongs = () => {
	return (
		<section>
			<Accordion
				type='single'
				collapsible
				className='w-full'
				defaultValue='item-1'>
				<AccordionItem value='item-1'>
					<AccordionTrigger>Новинки</AccordionTrigger>
					<AccordionContent className='flex flex-col gap-1'>
						{newSongs.map((song, i) => (
							<p key={i}>{song.title}</p>
						))}
					</AccordionContent>
				</AccordionItem>
			</Accordion>
		</section>
	)
}

export default NewSongs
