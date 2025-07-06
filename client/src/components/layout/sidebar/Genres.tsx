import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion'
import { GenresEnum } from '@/types/enums'
import { Disc, Milestone } from 'lucide-react'

interface GenresProps {
	activeTab: string | null
	onGenreSelect: (genre: string) => void
}

const Genres = ({ activeTab, onGenreSelect }: GenresProps) => {
	return (
		<section>
			<Accordion
				type='single'
				collapsible
				className='w-full'
				defaultValue='item-1'>
				<AccordionItem value='item-1'>
					<AccordionTrigger className='text-shadow'>
						<div className='flex items-center gap-2'>
							<Disc className='size-4' />
							<span>Жанры</span>
						</div>
					</AccordionTrigger>
					<AccordionContent className='flex flex-col gap-1'>
						{Object.values(GenresEnum).map((genre) => (
							<button
								key={genre}
								type='button'
								onClick={() => onGenreSelect(genre)}
								className={`px-3 py-1 rounded-md text-left uppercase text-sm transition-all duration-200 cursor-pointer ${
									activeTab === genre ? 'underline font-bold' : ''
								}`}
								disabled={false}>
								<div className='flex items-center gap-2'>
									{activeTab === genre && <Milestone className='size-4' />}
									{genre}
								</div>
							</button>
						))}
					</AccordionContent>
				</AccordionItem>
			</Accordion>
		</section>
	)
}

export default Genres
