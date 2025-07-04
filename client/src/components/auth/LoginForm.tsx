'use client'

import { useForm, SubmitHandler } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '../ui/button'
import { useRouter } from 'next/navigation'
import { useActions } from '@/hooks/useActions'
import type { LoginForm } from '@/types/auth'

interface Props {
	setIsAuthModalOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const LoginForm = ({ setIsAuthModalOpen }: Props) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		setValue,
	} = useForm<LoginForm>({
		defaultValues: {
			email: '',
			password: '',
		},
	})
	const { login } = useActions()
	const router = useRouter()

	const resetForm = () => {
		setValue('email', '')
		setValue('password', '')
	}

	const onSubmit: SubmitHandler<LoginForm> = async (data) => {
		try {
			login(data)

			setIsAuthModalOpen(false)
			router.replace('/')
			resetForm()
		} catch (error) {
			console.error('Ошибка авторизации:', error)
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
