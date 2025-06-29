'use client'

import { useState, ChangeEvent } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { GenreSelector } from './GenreSelector'

interface FormData {
    title: string
    genres: string[]
    imageFile?: FileList | null
    audioFile: FileList | null
}

const AddSongForm = () => {
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<FormData>({
        defaultValues: {
            title: '',
            genres: [],
        },
    })

    const [selectedImageFileName, setSelectedImageFileName] = useState<string | null>(null)
    const [selectedAudioFileName, setSelectedAudioFileName] = useState<string | null>(null)
    const [selectedGenres, setSelectedGenres] = useState<string[]>([])
    const [audioError, setAudioError] = useState<string | null>(null)
    const [genreError, setGenreError] = useState<string | null>(null)

    const onSubmit: SubmitHandler<FormData> = async (data) => {
        console.log('Форма отправлена:', data)

        // Проверка на наличие аудио
        if (!data.audioFile || !data.audioFile[0]) {
            setAudioError('Аудиофайл обязателен.')
            return
        }

        // Проверка на наличие жанра
        if (data.genres.length === 0) {
            setGenreError('Выберите хотя бы один жанр.')
            return
        }

        const formData = new FormData()
        formData.append('title', data.title)
        formData.append('genres', data.genres.join(', '))

        if (data.imageFile && data.imageFile[0]) {
            formData.append('image', data.imageFile[0])
        }

        if (data.audioFile && data.audioFile[0]) {
            formData.append('audio', data.audioFile[0])
        }

        try {
            const response = await fetch('/api/upload-song', {
                method: 'POST',
                body: formData,
            })

            if (response.ok) {
                console.log('Песня добавлена')
                setSelectedImageFileName(null)
                setSelectedAudioFileName(null)
                setSelectedGenres([])
                setAudioError(null)
                setGenreError(null)
            } else {
                console.error('Ошибка при добавлении песни')
            }
        } catch (error) {
            console.error('Ошибка сети:', error)
        }
    }
	 //  Выбор обложки
    const handleImageFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0]
            setSelectedImageFileName(file.name)
            setValue('imageFile', e.target.files)
        } else {
            setSelectedImageFileName(null)
            setValue('imageFile', null)
        }
    }
	//  Выбор аудио
    const handleAudioFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0]

            // Проверка формата файла
            if (
                !file.type.startsWith('audio/mp3') &&
                !file.type.startsWith('audio/mpeg')
            ) {
                setAudioError('Выберите файл формата mp3.')
                e.target.value = ''
                return
            }

            // Проверка размера файла (не больше 15 MB)
            const MAX_FILE_SIZE = 15 * 1024 * 1024
            if (file.size > MAX_FILE_SIZE) {
                setAudioError('Максимальный размер — 15 МБ.')
                e.target.value = ''
                return
            }

            setSelectedAudioFileName(file.name)
            setValue('audioFile', e.target.files)
            setAudioError(null)
        } else {
            setSelectedAudioFileName(null)
            setValue('audioFile', null)
            setAudioError('Аудиофайл обязателен.')
        }
    }
	//  Выбор жанра
    const toggleGenre = (genre: string) => {
        if (selectedGenres.includes(genre)) {
            // Удалить жанр
            const updated = selectedGenres.filter((g) => g !== genre)
            setSelectedGenres(updated)
            setValue('genres', updated)
            if (updated.length === 0) {
                setGenreError('Выберите хотя бы один жанр.')
            } else {
                setGenreError(null)
            }
        } else if (selectedGenres.length < 3) {
            // Добавить жанр
            const updated = [...selectedGenres, genre]
            setSelectedGenres(updated)
            setValue('genres', updated)
            setGenreError(null)
        }
    }

	 const fileInputClass = 'cursor-pointer inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 w-full'

    return (
        <form
            id='add-song-form'
            onSubmit={handleSubmit(onSubmit)}
            className='space-y-6 p-6 border rounded shadow-md max-w-lg mx-auto'>
            {/* Поле "Название" */}
            <fieldset>
                <Label htmlFor='title' className='mb-1 text-sm font-medium text-gray-700'>
                    Название: *
                </Label>
                <Input
                    type='text'
                    id='title'
                    {...register('title', { required: 'Название обязательно' })}
                    className='w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
                />
                {errors.title && (
                    <p className='mt-1 text-sm text-red-600'>{errors.title.message}</p>
                )}
            </fieldset>

            {/* Выбор жанров */}
            <fieldset>
                <Label htmlFor='genres' className='mb-2 text-sm font-medium text-gray-700'>
                    Жанр (максимум 3) *
                </Label>
                <GenreSelector selectedGenres={selectedGenres} onSelect={toggleGenre} />
                {genreError && (
                    <p className='mt-1 text-sm text-red-600'>{genreError}</p>
                )}
            </fieldset>

            {/* Загрузка обложки */}
            <fieldset>
                <Label htmlFor='imageFile' className='mb-1 text-sm font-medium text-gray-700'>
                    Обложка (необязательно):
                </Label>
                <input
                    type='file'
                    id='imageFile'
                    accept='image/*'
                    onChange={handleImageFileChange}
                    className='sr-only'
                />
                <Label
                    htmlFor='imageFile'
                    className={fileInputClass}>
                    {selectedImageFileName ? selectedImageFileName : 'Выберите файл'}
                </Label>
            </fieldset>

            {/* Загрузка аудиофайла */}
            <fieldset>
                <Label htmlFor='audioFile' className='mb-1 text-sm font-medium text-gray-700'>
                    Аудиофайл (mp3, до 15 МБ) *
                </Label>
                <input
                    type='file'
                    id='audioFile'
                    accept='.mp3'
                    onChange={handleAudioFileChange}
                    className='sr-only'
                />
                <Label
                    htmlFor='audioFile'
                    className={fileInputClass}>
                    {selectedAudioFileName ? selectedAudioFileName : 'Выберите mp3'}
                </Label>
                {audioError && (
                    <p className='mt-1 text-sm text-red-600'>{audioError}</p>
                )}
            </fieldset>
        </form>
    )
}

export default AddSongForm