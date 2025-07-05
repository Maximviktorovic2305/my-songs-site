import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion'

const NewSongs = () => {
	return (
		<section>
			<Accordion
				type='single'
				collapsible
				className='w-full'
				defaultValue='item-1'>
				<AccordionItem value='item-1'>
					<AccordionTrigger className='text-shadow'>Новинки</AccordionTrigger>
					<AccordionContent className='flex flex-col gap-1'>
						asdasda
					</AccordionContent>
				</AccordionItem>
			</Accordion>
		</section>
	)
}

export default NewSongs
