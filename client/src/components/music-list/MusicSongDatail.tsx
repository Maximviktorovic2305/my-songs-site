import { Track } from '@/types'
import Image from 'next/image'

interface Props {
   song: Track
}

const MusicSongDatail = ({ song }: Props) => {
  return (
    <section className='container mx-auto p-4 flex flex-col items-center'>
			<h1 className='text-3xl font-bold mb-4'>{song.title}</h1>
			<p className='text-xl text-gray-700 mb-2'>Исполнитель: {song.artist}</p>
			{song.img && (
				<Image
					src={song.img}
					width={250}
					height={250}
					alt={song.title}
					className='rounded-lg shadow-md mb-4'
				/>
			)}
			<p className='text-lg text-gray-600 mb-2'>
				Длительность: {song.endlessTime}
			</p>

			<div className='mt-4 p-4 border rounded-lg shadow-sm bg-white'>
				<h2 className='text-2xl font-semibold mb-2'>Подробности</h2>
				<p>Это страница с подробной информацией о песне.</p>
			</div>
		</section>
  )
}

export default MusicSongDatail