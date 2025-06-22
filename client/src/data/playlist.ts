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
];