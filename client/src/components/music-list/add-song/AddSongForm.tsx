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

	const [selectedFileName, setSelectedFileName] = useState<string | null>(null)
	const [selectedGenres, setSelectedGenres] = useState<string[]>([])

	const onSubmit: SubmitHandler<FormData> = async (data) => {
		console.log('Форма отправлена:', data)

		const formData = new FormData()
		formData.append('title', data.title)

		// Добавляем жанры как строку через запятую
		formData.append('genres', data.genres.join(', '))

		if (data.imageFile && data.imageFile[0]) {
			formData.append('image', data.imageFile[0])
		}

		try {
			const response = await fetch('/api/upload-song', {
				method: 'POST',
				body: formData,
			})

			if (response.ok) {
				console.log('Песня добавлена')
				setSelectedFileName(null)
				setSelectedGenres([])
			} else {
				console.error('Ошибка при добавлении песни')
			}
		} catch (error) {
			console.error('Ошибка сети:', error)
		}
	}

	const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files.length > 0) {
			const file = e.target.files[0]
			setSelectedFileName(file.name)
			setValue('imageFile', e.target.files)
		} else {
			setSelectedFileName(null)
			setValue('imageFile', null)
		}
	}

	const toggleGenre = (genre: string) => {
		if (selectedGenres.includes(genre)) {
			// Удалить жанр
			const updated = selectedGenres.filter((g) => g !== genre)
			setSelectedGenres(updated)
			setValue('genres', updated)
		} else if (selectedGenres.length < 3) {
			// Добавить жанр
			const updated = [...selectedGenres, genre]
			setSelectedGenres(updated)
			setValue('genres', updated)
		}
	}

	return (
		<form
			id='add-song-form'
			onSubmit={handleSubmit(onSubmit)}
			className='space-y-4 p-4 border rounded shadow-md'>
			<div>
				<Label
					htmlFor='title'
					className='mb-1 text-sm font-medium text-gray-700'>
					Название:
				</Label>
				<Input
					type='text'
					id='title'
					{...register('title', { required: 'Название обязательно' })}
				/>
				{errors.title && (
					<p className='mt-1 text-sm text-red-600'>{errors.title.message}</p>
				)}
			</div>

			<div>
				<Label
					htmlFor='genres'
					className='mb-2 text-sm font-medium text-gray-700'>
					Жанр (максимум 3):
				</Label>
				<GenreSelector selectedGenres={selectedGenres} onSelect={toggleGenre} />
			</div>

			<div>
				<Label
					htmlFor='imageFile'
					className='mb-1 text-sm font-medium text-gray-700'>
					Обложка (необязательно):
				</Label>
				<input
					type='file'
					id='imageFile'
					accept='image/*'
					onChange={handleFileChange}
					className='sr-only'
				/>
				<Label
					htmlFor='imageFile'
					className='cursor-pointer inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 w-full'>
					{selectedFileName ? selectedFileName : 'Выберите файл'}
				</Label>
			</div>
		</form>
	)
}

export default AddSongForm
