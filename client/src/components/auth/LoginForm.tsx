'use client'

import { useForm, SubmitHandler } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '../ui/button'

interface FormData {
	nickname: string
	name: string
	email: string
	password: string
	confirmPassword: string
	avatar?: FileList | null
}

const LoginForm = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		setValue,
	} = useForm<FormData>({
		defaultValues: {
			nickname: '',
			name: '',
			email: '',
			password: '',
			confirmPassword: '',
			avatar: null,
		},
	})

	const resetForm = () => {
		setValue('email', '')
		setValue('password', '')
	}

	const onSubmit: SubmitHandler<FormData> = async (data) => {
		console.log('Форма отправлена:', data)

		const formData = new FormData()
		formData.append('email', data.email)
		formData.append('password', data.password)

		try {
			const response = await fetch('/api/login', {
				method: 'POST',
				body: formData,
			})

			if (response.ok) {
				alert('Авторизация успешна')
				resetForm()
			} else {
				alert('Ошибка авторизации')
			}
		} catch (error) {
			console.error('Ошибка сети:', error)
		}
	}

	return (
		<form
			id='login-form'
			onSubmit={handleSubmit(onSubmit)}
			className='space-y-4 rounded max-w-lg mx-auto'>
			{/* Email */}
			<fieldset>
				<Label
					htmlFor='email'
					className='mb-1 text-sm font-medium text-gray-700'>
					Email *
				</Label>
				<Input
					type='email'
					id='email'
					{...register('email', {
						required: 'Email обязателен',
						pattern: {
							value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
							message: 'Неверный формат email',
						},
					})}
				/>
				{errors.email && (
					<p className='mt-1 text-sm text-red-600'>{errors.email.message}</p>
				)}
			</fieldset>

			{/* Пароль */}
			<fieldset>
				<Label
					htmlFor='password'
					className='mb-1 text-sm font-medium text-gray-700'>
					Пароль *
				</Label>
				<Input
					type='password'
					id='password'
					{...register('password', {
						required: 'Пароль обязателен',
						minLength: {
							value: 6,
							message: 'Пароль должен быть не короче 6 символов',
						},
					})}
				/>
				{errors.password && (
					<p className='mt-1 text-sm text-red-600'>{errors.password.message}</p>
				)}
			</fieldset>

			<Button type='submit' className='w-full'>
				Войти
			</Button>
		</form>
	)
}

export default LoginForm
