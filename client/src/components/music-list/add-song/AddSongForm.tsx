'use client'

import { useState, ChangeEvent } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { GenreSelector } from './GenreSelector'
import { useCreateTrack } from '@/services/queries/track'
import { GenresEnum } from '@/types/enums'
import BaseLoader from '@/components/base/loader/BaseLoader'

interface FormData {
	title: string
	genres: GenresEnum[]
	imageFile?: FileList | null
	audioFile: FileList | null
}

interface Props {
	setOpen: (value: boolean) => void
}

const AddSongForm = ({ setOpen }: Props) => {
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

	const [selectedImageFileName, setSelectedImageFileName] = useState<
		string | null
	>(null)
	const [selectedAudioFileName, setSelectedAudioFileName] = useState<
		string | null
	>(null)
	const [selectedGenres, setSelectedGenres] = useState<GenresEnum[]>([])
	const [audioError, setAudioError] = useState<string | null>(null)
	const [genreError, setGenreError] = useState<string | null>(null)

	const { mutateAsync: createTrack, status, error } = useCreateTrack()

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
	const toggleGenre = (genre: GenresEnum) => {
		if (selectedGenres.includes(genre)) {
			const updated = selectedGenres.filter((g) => g !== genre)
			setSelectedGenres(updated)
			setValue('genres', updated)
			if (updated.length === 0) {
				setGenreError('Выберите хотя бы один жанр.')
			} else {
				setGenreError(null)
			}
		} else if (selectedGenres.length < 3) {
			const updated = [...selectedGenres, genre]
			setSelectedGenres(updated)
			setValue('genres', updated)
			setGenreError(null)
		}
	}

	const fileInputClass =
		'cursor-pointer inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 w-full'

	const onSubmit: SubmitHandler<FormData> = async (formData) => {
		console.log('Форма отправлена:', formData)

		// Проверка на наличие аудио
		if (!formData.audioFile || !formData.audioFile[0]) {
			setAudioError('Аудиофайл обязателен.')
			return
		}

		// Проверка на наличие жанра
		if (formData.genres.length === 0) {
			setGenreError('Выберите хотя бы один жанр.')
			return
		}

		const data = {
			title: formData.title,
			genres: formData.genres,
		}

		const audioFile = formData.audioFile[0]
		const imageFile = formData.imageFile?.[0]

		try {
			await createTrack({ data, audioFile, imageFile })
			setOpen(false)
		} catch (err) {
			console.error('Ошибка загрузки трека:', err)
			alert('Не удалось добавить трек')
		}
	}

	return (
		<form
			id='add-song-form'
			onSubmit={handleSubmit(onSubmit)}
			className='space-y-6 p-6 border rounded shadow-md max-w-lg mx-auto'>
			{/* Поле "Название" */}
			<fieldset>
				<Label
					htmlFor='title'
					className='mb-1 text-sm font-medium text-gray-700'>
					Название: *
				</Label>
				<Input
					type='text'
					id='title'
					{...register('title', { required: 'Название обязательно' })}
				/>
				{errors.title && (
					<p className='mt-1 text-sm text-red-600'>{errors.title.message}</p>
				)}
			</fieldset>

			{/* Выбор жанров */}
			<fieldset>
				<Label
					htmlFor='genres'
					className='mb-2 text-sm font-medium text-gray-700'>
					Жанр (максимум 3) *
				</Label>
				<GenreSelector selectedGenres={selectedGenres} onSelect={toggleGenre} />
				{genreError && (
					<p className='mt-1 text-sm text-red-600'>{genreError}</p>
				)}
			</fieldset>

			{/* Загрузка обложки */}
			<fieldset>
				<Label
					htmlFor='imageFile'
					className='mb-1 text-sm font-medium text-gray-700'>
					Обложка (необязательно):
				</Label>
				<input
					type='file'
					id='imageFile'
					accept='image/*'
					onChange={handleImageFileChange}
					className='sr-only'
				/>
				<Label htmlFor='imageFile' className={fileInputClass}>
					{selectedImageFileName ? selectedImageFileName : 'Выберите файл'}
				</Label>
			</fieldset>

			{/* Загрузка аудиофайла */}
			<fieldset>
				<Label
					htmlFor='audioFile'
					className='mb-1 text-sm font-medium text-gray-700'>
					Аудиофайл (mp3, до 15 МБ) *
				</Label>
				<input
					type='file'
					id='audioFile'
					accept='.mp3'
					onChange={handleAudioFileChange}
					className='sr-only'
				/>
				<Label htmlFor='audioFile' className={fileInputClass}>
					{selectedAudioFileName ? selectedAudioFileName : 'Выберите mp3'}
				</Label>
				{audioError && (
					<p className='mt-1 text-sm text-red-600'>{audioError}</p>
				)}
			</fieldset>

			{/* Статусы */}
			{status === 'pending' && <BaseLoader variant='fullscreen' />}
			{error && <p>Ошибка: {error.message}</p>}
		</form>
	)
}

export default AddSongForm
