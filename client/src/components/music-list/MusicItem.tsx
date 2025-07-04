'use client'

import { InteractionEvent } from '@/types'
import { Download } from 'lucide-react'
import { useRouter } from 'next/navigation'
import StarRating from '../base/StarRating'
import PlayingImage from '../base/PlayingImage'
import LoveIcon from '../base/LoveIcon'
import { Track } from '@/types/track'
import { useGetFavoriteTracks } from '@/services/queries/track'

interface Props {
    song: Track
}

const MusicItem = ({ song }: Props) => {
    const router = useRouter()
    const { data: favoriteTracks } = useGetFavoriteTracks()         

    // Определяем, является ли текущий трек избранным для пользователя
    const isFavorite = favoriteTracks?.some(favTrack => favTrack.id === song.id) || false;

    const handleDownload = (e: InteractionEvent) => {
        e.stopPropagation()
        console.log('download', song)
    }

    const handleRedirect = () => {
        router.push(`/music/${song.id}`)
    }

    return (
        <li className='py-1.5 flex gap-3 justify-between items-center w-full min-w-full'>
            <div
                className='flex cursor-pointer items-center gap-3'
                onClick={handleRedirect}>
                <PlayingImage song={song} />

                <div className='flex flex-col justify-between'>
                    <span className='font-bold text-primary/90 text-shadow'>{song.title}</span>
                    <span className='text-sm text-muted-foreground/80 font-semibold'>
                        {song.artist?.name ? song.artist?.name : 'Неизвестный артист'}
                    </span>
                </div>
            </div>
            <div className='flex items-center gap-3'>
                <LoveIcon songId={song.id} initialIsFavorite={isFavorite} />
                <Download
                    className='text-primary/90 w-4 h-auto cursor-pointer hover:text-muted-foreground duration-200 z-10'
                    onClick={handleDownload}
                />

                <div className='z-50'>
                    <StarRating type='popup' />
                </div>
            </div>
        </li>
    )
}

export default MusicItem