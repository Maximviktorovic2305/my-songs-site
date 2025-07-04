import { GenresEnum } from '@/types/enums'

interface GenreSelectorProps {
	selectedGenres: string[]
	onSelect: (genre: GenresEnum) => void
}

export const GenreSelector: React.FC<GenreSelectorProps> = ({
	selectedGenres,
	onSelect,
}) => {
	return (
		<div className='flex flex-wrap gap-2'>
			{Object.values(GenresEnum).map((genre) => (
				<button
					key={genre}
					type='button'
					onClick={() => onSelect(genre)}
					className={`px-3 py-1 rounded-md text-sm cursor-pointer transition-colors ${
						selectedGenres.includes(genre)
							? 'bg-accent text-white'
							: 'bg-gray-200 text-gray-800 hover:bg-gray-300'
					}`}
					disabled={false}>
					{genre}
				</button>
			))}
		</div>
	)
}
