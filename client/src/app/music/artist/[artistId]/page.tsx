import MusicArtist from '@/components/music-list/MusicArtist'
import { TrackService } from '@/services/api/track.service'

interface Props {
	params: Promise<{
		artistId: string
	}>
}

// Заглушка для получения данных о песне
async function getSongs(artistId: number | string) {
	try {
		const response = await TrackService.getTracksByArtist(artistId)
		return response.data
	} catch (e) {
		console.log(e)
	}
}

export default async function SongArtistPage({ params }: Props) {
	const { artistId } = await params
	const songs = await getSongs(artistId)

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
