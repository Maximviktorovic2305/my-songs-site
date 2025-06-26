'use client'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useForm, SubmitHandler } from 'react-hook-form'

interface FormData {
	title: string
	artist: string
	imageUrl?: string
}

export default function AddSongForm() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormData>()

	const onSubmit: SubmitHandler<FormData> = (data) => {
		console.log('Форма отправлена:', data)
		// Здесь можно отправить данные на бэкенд
	}

	return (
		<form
			id='add-song-form'
			onSubmit={handleSubmit(onSubmit)}
			className='space-y-4 p-4 border rounded shadow-md'>
			<div>
				<Label
					htmlFor='title'
					className='mb-1  text-sm font-medium text-gray-700'>
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
					htmlFor='imageUrl'
					className='mb-1 text-sm font-medium text-gray-700'>
					Обложка (необязательно):
				</Label>
				<Input
					type='text'
					id='imageUrl'
					{...register('imageUrl')}
					placeholder='Загрузи обложку'
				/>
			</div>
		</form>
	)
}
