import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion'

const TopCharts = () => {
	return (
		<section>
			<Accordion
				type='single'
				collapsible
				className='w-full'
				defaultValue='item-1'>
				<AccordionItem value='item-1'>
					<AccordionTrigger><span className='text-shadow'>Топ чарты</span></AccordionTrigger>
					<AccordionContent className='flex flex-col gap-1'>
						asdasdas
					</AccordionContent>
				</AccordionItem>
			</Accordion>
		</section>
	)
}

export default TopCharts
