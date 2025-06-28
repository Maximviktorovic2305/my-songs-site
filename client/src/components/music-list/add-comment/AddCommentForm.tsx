'use client'

import { useForm, SubmitHandler } from 'react-hook-form'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

interface FormData {
	text: string
}

export default function AddCommentForm() {
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<FormData>()

	const onSubmit: SubmitHandler<FormData> = async (data) => {
		console.log('Отправлен комментарий:', data.text)

		// try {
		//   const response = await fetch('/api/comments', {
		//     method: 'POST',
		//     headers: {
		//       'Content-Type': 'application/json',
		//     },
		//     body: JSON.stringify(data),
		//   })
		//   if (response.ok) {
		//     alert('Комментарий успешно добавлен')
		//     reset() // Очистка формы после успешной отправки
		//   }
		// } catch (error) {
		//   console.error('Ошибка при отправке комментария:', error)
		// }

		reset()
	}

	return (
		<form
			id='add-comment-form'
			onSubmit={handleSubmit(onSubmit)}
			className='space-y-4 p-4 border rounded shadow-md'>
			<div>
				<Label
					htmlFor='text'
					className='mb-1 text-sm font-medium text-gray-700'>
					Текст
				</Label>
				<Textarea
					id='text'
					{...register('text', { required: 'Текст обязательно' })}
				/>
				{errors.text && (
					<p className='mt-1 text-sm text-red-600'>{errors.text.message}</p>
				)}
			</div>
		</form>
	)
}
