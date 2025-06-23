import MusicSongDatail from '@/components/music-list/MusicSongDatail'
import { playlist } from '@/data/playlist'
import { Track } from '@/types'

interface SongDetailPageProps {
	params: {
		songId: string
	}
}

// Заглушка для получения данных о песне
async function getSongDetails(songId: number): Promise<Track | null> {
	// Имитация задержки сети

	return playlist.find((song) => song.id === songId) || null
}

// Статически генерировать маршруты во время сборки (SSG)
// export async function generateStaticParams() {
//   const songs = await getAllSongsFromAPI(); // Ваша функция для получения всех песен
//   return songs.map((song) => ({
//     songId: song.id,
//   }));
// }

export default async function SongDetailPage({ params }: SongDetailPageProps) {
	const { songId } = params

	const song = await getSongDetails(+songId)

	if (!song) {
		return (
			<div className='flex flex-col items-center justify-center min-h-screen text-red-500'>
				<h1>Песня не найдена</h1>
				<p>К сожалению, песня с ID ${songId} не существует.</p>
			</div>
		)
	}

	return <MusicSongDatail song={song} />
}
