import MusicArtist from '@/components/music-list/MusicArtist'
import { playlist } from '@/data/playlist'
import { Track } from '@/types'

interface SongDetailPageProps {
	params: {
		title: string
	}
}

// Заглушка для получения данных о песне
async function getSongs(title: string): Promise<Track[] | null> {
	return playlist.filter((song) => song.title === title) || null
}

// Статически генерировать маршруты во время сборки (SSG)
// export async function generateStaticParams() {
//   const songs = await getAllSongsFromAPI(); // Ваша функция для получения всех песен
//   return songs.map((song) => ({
//     songId: song.id,
//   }));
// }

export default async function SongArtistPage({ params }: SongDetailPageProps) {
	const { title } = params

	const songs = await getSongs(title)

	console.log(title)
	console.log(songs)

	if (!songs) {
		return (
			<div className='flex flex-col items-center justify-center min-h-screen text-red-500'>
				<h1>Песен исполнителя нет</h1>
				<p>К сожалению, песен не существует.</p>
			</div>
		)
	}

	return <MusicArtist songs={songs} />
}
