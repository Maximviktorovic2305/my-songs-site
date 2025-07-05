import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion'

const Albums = () => {
	return (
		<section>
			<Accordion
				type='single'
				collapsible
				className='w-full'
				defaultValue='item-1'>
				<AccordionItem value='item-1'>
					<AccordionTrigger className='text-shadow'>Albums</AccordionTrigger>
					<AccordionContent className='flex flex-col gap-1'>
						adasd
					</AccordionContent>
				</AccordionItem>
			</Accordion>
		</section>
	)
}

export default Albums
