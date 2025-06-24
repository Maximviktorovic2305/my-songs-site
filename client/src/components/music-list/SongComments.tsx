import { Track } from '@/types'
import Image from 'next/image'

interface Props {
	song: Track
}

const SongComments = ({ song }: Props) => {
	if (!song || !song.comments || song.comments.length === 0) {
		return <div>Оставь первый комментарий к песне...</div>
	}

	return (
		<div className='flex flex-col gap-3'>
			{song.comments.map((comment) => (
				<div key={comment.id} className='flex gap-3'>
					<div>
						<Image
							width={100}
							height={100}
							src={comment.user?.avatar ?? ''}
							alt={comment.user?.name ?? ''}
							className='rounded overflow-hidden'
						/>
					</div>
					<div className='-mt-1 flex flex-col w-full'>
						<div className='flex items-center gap-3 justify-between'>
							<span className='font-bold text-primary/90'>{comment.user?.name}</span>
							<span className='text-sm text-muted-foreground'>
								{comment.createdAt}
							</span>
						</div>
						<p className='text-muted-foreground'>{comment.text}</p>
					</div>
				</div>
			))}
		</div>
	)
}

export default SongComments
