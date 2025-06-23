import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion'
import { topCharts } from '@/data/playlist'

const TopCharts = () => {
	return (
		<section>
			<Accordion
				type='single'
				collapsible
				className='w-full'
				defaultValue='item-1'>
				<AccordionItem value='item-1'>
					<AccordionTrigger>Топ чарты</AccordionTrigger>
					<AccordionContent className='flex flex-col gap-1'>
						{topCharts.map((song, i) => (
							<p key={i}>{song.title}</p>
						))}
					</AccordionContent>
				</AccordionItem>
			</Accordion>
		</section>
	)
}

export default TopCharts
