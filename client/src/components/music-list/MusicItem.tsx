import { useDispatch } from 'react-redux'
import { Track } from '@/types'
import { Download, Star } from 'lucide-react'
import Image from 'next/image'
import { usePlayer } from '@/hooks/useSelectors'
import { setCurrentTrack } from '@/store/playerSlice/player.slice'

interface Props {
	song: Track
}

const MusicItem = ({ song }: Props) => {
	const { currentTrack } = usePlayer()
	const dispatch = useDispatch()
	const isActive = currentTrack.title === song.title

	const handleClick = () => {
		dispatch(setCurrentTrack(song))
	}

	const handleDownload = (e: React.MouseEvent) => {
		e.stopPropagation()
		console.log('download', song)
	}

	return (
		<li
			className='px-3 py-2 flex gap-3 justify-between items-center w-full min-w-full border-t'
			onClick={handleClick}>
			<div className='flex items-center gap-3'>
				<span className='cursor-pointer'>
					{isActive ? (
						<Image src={'/rocker.gif'} width={40} height={40} alt='song' />
					) : (
						<Image src={'/rocker.png'} width={30} height={30} alt='song' />
					)}
				</span>
				<Image
					src={song.img ?? '/no-image.png'}
					width={40}
					height={40}
					alt='song'
					className='rounded overflow-hidden'
				/>
				<div className='flex flex-col justify-between'>
					<span className='font-bold'>{song.title}</span>
					<span className='text-sm text-muted-foreground/80 font-semibold'>
						{song.artist}
					</span>
				</div>
			</div>
			<div className='flex items-center gap-3'>
				<span className='text-muted-foreground/80 font-semibold'>
					{song.endlessTime ?? 0}
				</span>
				<Download
					className='text-primary/90 w-4 h-auto cursor-pointer hover:text-muted-foreground duration-200 z-10'
					onClick={handleDownload}
				/>
				<Star fill='#D3D3D3' className='text-gray-300' width={20} />
			</div>
		</li>
	)
}

export default MusicItem
