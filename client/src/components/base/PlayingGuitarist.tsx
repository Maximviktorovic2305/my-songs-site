import { InteractionEvent } from '@/types'
import Image from 'next/image'

interface Props {
	isPlaying: boolean
	handlePause: (e: InteractionEvent) => void
	handlePlay: (e: InteractionEvent) => void
}

const PlayingGuitarist = ({ isPlaying, handlePause, handlePlay }: Props) => {
	return (
		<section className='cursor-pointer z-20'>
			<Image
				src={isPlaying ? '/rocker.gif' : '/rocker.png'}
				width={isPlaying ? 40 : 30}
				height={40}
				alt='song'
				className='opacity-80 hover:opacity-100 duration-200'
				onClick={isPlaying ? handlePause : handlePlay}
			/>
		</section>
	)
}

export default PlayingGuitarist
