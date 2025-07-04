'use client'

import { useState, ChangeEvent } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '../ui/button'
import { useRouter } from 'next/navigation'
import type { RegisterForm } from '@/types/auth'
import { useActions } from '@/hooks/useActions'

interface Props {
	setIsAuthModalOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const RegisterForm = ({ setIsAuthModalOpen }: Props) => {
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
		setValue,
	} = useForm<RegisterForm>({
		defaultValues: {
			nickname: '',
			name: '',
			email: '',
			password: '',
			confirmPassword: '',
			avatar: null,
		},
	})

	const router = useRouter()
	const { register: registerArtist } = useActions()
	const [selectedAvatarFileName, setSelectedAvatarFileName] = useState<
		string | null
	>(null)
	const [passwordError, setPasswordError] = useState<string | null>(null)

	const resetForm = () => {
		setValue('nickname', '')
		setValue('name', '')
		setValue('email', '')
		setValue('password', '')
		setValue('confirmPassword', '')
		setValue('avatar', null)
		setSelectedAvatarFileName(null)
		setPasswordError(null)
	}

	const handleAvatarChange = (e: ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files.length > 0) {
			const file = e.target.files[0]
			setSelectedAvatarFileName(file.name)
			setValue('avatar', e.target.files)
		} else {
			setSelectedAvatarFileName(null)
			setValue('avatar', null)
		}
	}

	const onSubmit: SubmitHandler<RegisterForm> = async (data) => {
		if (data.password !== data.confirmPassword) {
			setPasswordError('Пароли не совпадают')
			return
		}

		const formData = new FormData()
		formData.append('nickname', data.nickname)
		formData.append('name', data.name)
		formData.append('email', data.email)
		formData.append('password', data.password)

		if (data.avatar && data.avatar[0]) {
			formData.append('avatar', data.avatar[0])
		}

		try {
			registerArtist(formData)
			setIsAuthModalOpen(false)
			router.replace('/')
			resetForm()
		} catch (error) {
			console.error('Ошибка сети:', error)
		}
	}

	const fileInputClass =
		'cursor-pointer inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 w-full'

	return (
		<form
			id='register-form'
			onSubmit={handleSubmit(onSubmit)}
			className='space-y-4 max-w-lg mx-auto'>
			{/* Никнейм */}
			<fieldset>
				<Label
					htmlFor='nickname'
					className='mb-1 text-sm font-medium text-gray-700'>
					Никнейм *
				</Label>
				<Input
					type='text'
					id='nickname'
					{...register('nickname', { required: 'Никнейм обязателен' })}
				/>
				{errors.nickname && (
					<p className='mt-1 text-sm text-red-600'>{errors.nickname.message}</p>
				)}
			</fieldset>

			{/* Имя */}
			<fieldset>
				<Label
					htmlFor='name'
					className='mb-1 text-sm font-medium text-gray-700'>
					Имя *
				</Label>
				<Input
					type='text'
					id='name'
					{...register('name', { required: 'Имя обязательно' })}
				/>
				{errors.name && (
					<p className='mt-1 text-sm text-red-600'>{errors.name.message}</p>
				)}
			</fieldset>

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

			{/* Повторить пароль */}
			<fieldset>
				<Label
					htmlFor='confirmPassword'
					className='mb-1 text-sm font-medium text-gray-700'>
					Повторите пароль *
				</Label>
				<Input
					type='password'
					id='confirmPassword'
					{...register('confirmPassword', {
						required: 'Подтвердите пароль',
						validate: (value) =>
							value === watch('password') || 'Пароли не совпадают',
					})}
				/>
				{errors.confirmPassword && (
					<p className='mt-1 text-sm text-red-600'>
						{errors.confirmPassword.message}
					</p>
				)}
				{passwordError && (
					<p className='mt-1 text-sm text-red-600'>{passwordError}</p>
				)}
			</fieldset>

			{/* Аватар */}
			<fieldset>
				<Label
					htmlFor='avatar'
					className='mb-1 text-sm font-medium text-gray-700'>
					Аватар (необязательно):
				</Label>
				<input
					type='file'
					id='avatar'
					accept='image/*'
					onChange={handleAvatarChange}
					className='sr-only'
				/>
				<Label htmlFor='avatar' className={fileInputClass}>
					{selectedAvatarFileName ? selectedAvatarFileName : 'Выберите файл'}
				</Label>
			</fieldset>

			<Button type='submit' className='w-full'>
				Зарегистрироваться
			</Button>
		</form>
	)
}

export default RegisterForm
