import MusicSongDatail from '@/components/music-list/MusicSongDatail'
import { TrackService } from '@/services/api/track.service'

interface SongDetailPageProps {
	params: Promise<{
		songId: string
	}>
}

// Заглушка для получения данных о песне
async function getSongDetails(songId: number) {
	try {
		const response = await TrackService.getTrackById(songId)
		return response.data
	} catch (e) {
		console.log(e)
	}
}

export default async function SongDetailPage({ params }: SongDetailPageProps) {
	const { songId } = await params
	const song = await getSongDetails(+songId)

	if (!song) {
		return (
			<div className='flex flex-col items-center justify-center min-h-screen text-red-500'>
				<h1>Песня не найдена</h1>
				<p>К сожалению, песня не существует.</p>
			</div>
		)
	}

	return <MusicSongDatail song={song} />
}
