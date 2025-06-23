import { Track } from "@/types";

export const playlist: Track[] = [ // Используем тип Track[] для плейлиста
  {
    id: 1,
    title: 'Анаконда',
    artist: 'Максим Переверзев',
    src: '/music/song1.mp3', // Убедитесь, что у вас есть этот файл
  },
  {
    id: 2,
    title: 'Турецкая',
    artist: 'Максим Переверзев',
    src: '/music/song2.mp3', // Убедитесь, что у вас есть этот файл
  },
  {
    id: 3,
    title: 'Do not know',
    artist: 'Максим Переверзев',
    src: '/music/song3.mp3', // Убедитесь, что у вас есть этот файл
  },
  {
    id: 4,
    title: 'Песня4',
    artist: 'Максим Переверзев',
    src: '/music/song2.mp3', // Убедитесь, что у вас есть этот файл
  },
  {
    id: 5,
    title: 'Песня5',
    artist: 'Максим Переверзев',
    src: '/music/song3.mp3', // Убедитесь, что у вас есть этот файл
  },
  {
    id: 6,
    title: 'Песня6',
    artist: 'Максим Переверзев',
    src: '/music/song2.mp3', // Убедитесь, что у вас есть этот файл
  },
  {
    id: 7,
    title: 'Песня7',
    artist: 'Максим Переверзев',
    src: '/music/song3.mp3', // Убедитесь, что у вас есть этот файл
  },
];

export const albums: string[] = ['Анаконда', 'Mother Russia'];   
export const genres: string[] = ['rock', 'metall', 'alternative', 'soft rock'];   
export const topCharts: Track[] = playlist.slice(0, 3);
export const newSongs: Track[] = playlist.slice(0, 3); 