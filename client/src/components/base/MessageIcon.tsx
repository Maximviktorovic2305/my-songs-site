import { Track } from '@/types/track'
import { MessageSquare } from 'lucide-react'

interface Props {
	song: Track
}

const MessageIcon = ({ song }: Props) => {
	return (
		<div className='relative'>
			<MessageSquare className='size-4 text-primary/90 w-4 h-auto cursor-pointer hover:text-muted-foreground duration-200 z-10' />
			<span className='absolute -top-1.5 -right-1.5 text-[0.5rem] text-primary'>
				{song.comments?.length ?? 12}
			</span>
		</div>
	)
}

export default MessageIcon
