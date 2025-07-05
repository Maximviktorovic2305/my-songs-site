'use client'

import { useForm } from 'react-hook-form'
import { SubmitHandler } from 'react-hook-form'
import { useCreateComment } from '@/services/queries/comment'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { toast } from 'sonner'
import { useParams } from 'next/navigation'
import { CreateCommentDto } from '@/types/comment'

export default function AddCommentForm() {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<CreateCommentDto>()

	
	const { songId } = useParams<{ songId: string }>()
	const { mutateAsync: createComment } = useCreateComment(songId)

	const onSubmit: SubmitHandler<CreateCommentDto> = async (data) => {
		if (!songId) return

		const commentData = {
			text: data.text,
			trackId: parseInt(songId),
		}

		try {
			await createComment(commentData)
			reset()
			toast.success('Комментарий успешно добавлен')
			console.log(commentData)
		} catch (err) {
			console.error('Ошибка при создании комментария:', err)
			toast.error('Не удалось добавить комментарий')
		}
	}

	return (
		<form
			id='add-comment-form'
			onSubmit={handleSubmit(onSubmit)}
			className='space-y-4 sm:p-4 rounded shadow-md'>
			<Label htmlFor='text' className='mb-1 text-sm font-medium text-gray-700'>
				Напиши комментарий
			</Label>
			<Textarea
				id='text'
				{...register('text', { required: 'Текст обязательно' })}
				placeholder='Ваш комментарий...'
			/>
			{errors.text && (
				<p className='mt-1 text-sm text-red-600'>{errors.text.message}</p>
			)}
		</form>
	)
}
