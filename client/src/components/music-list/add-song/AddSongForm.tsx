'use client'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useForm, SubmitHandler } from 'react-hook-form'

interface FormData {
	title: string
	artist: string
	imageFile?: FileList | null
}

export default function AddSongForm() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormData>()

	const onSubmit: SubmitHandler<FormData> = async (data) => {
		console.log('Форма отправлена:', data)

		const formData = new FormData()
		formData.append('title', data.title)
		formData.append('artist', data.artist)

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
			} else {
				console.error('Ошибка при добавлении песни')
			}
		} catch (error) {
			console.error('Ошибка сети:', error)
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
					htmlFor='artist'
					className='mb-1 text-sm font-medium text-gray-700'>
					Исполнитель:
				</Label>
				<Input
					type='text'
					id='artist'
					{...register('artist', { required: 'Исполнитель обязателен' })}
				/>
				{errors.artist && (
					<p className='mt-1 text-sm text-red-600'>{errors.artist.message}</p>
				)}
			</div>

			<div>
				<Label
					htmlFor='imageFile'
					className='mb-1 text-sm font-medium text-gray-700'>
					Обложка (необязательно):
				</Label>
				<Input
					type='file'
					id='imageFile'
					accept='image/*'
					{...register('imageFile')}
				/>
			</div>
		</form>
	)
}
