import MusicArtist from '@/components/music-list/MusicArtist'
import { playlist } from '@/data/playlist'
import { Track } from '@/types'

interface SongArtistPageProps {
	params: Promise<{
		artistId: string
	}>
}

// Заглушка для получения данных о песне
async function getSongs(artistId: string): Promise<Track[] | null> {
	return playlist.filter((song) => song.artist.id === +artistId)
}

// Статически генерировать маршруты во время сборки (SSG)
// export async function generateStaticParams() {
//   const songs = await getAllSongsFromAPI(); // Ваша функция для получения всех песен
//   return songs.map((song) => ({
//     songId: song.id,
//   }));
// }

export default async function SongArtistPage({ params }: SongArtistPageProps) {
	const { artistId } = await params
	const songs = await getSongs(artistId)

	console.log(artistId)
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
