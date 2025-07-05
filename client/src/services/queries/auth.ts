import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { LoginForm } from '@/types/auth'
import { AuthService } from '../api/auth/auth.service'

export const useRegister = () => {
	const queryClient = useQueryClient()

	const { mutateAsync, status, error } = useMutation({
		mutationFn: async (data: FormData) => {
			return await AuthService.register(data)
		},
		onSuccess: async (response) => {
			await queryClient.setQueryData(['auth'], response)
			await queryClient.invalidateQueries({
				queryKey: ['auth'],
			})
		},
	})

	return { mutateAsync, status, error }
}

export const useLogin = () => {
	const queryClient = useQueryClient()

	const { mutateAsync, status, error } = useMutation({
		mutationFn: async (data: LoginForm) => {
			return await AuthService.login(data)
		},
		onSuccess: async (response) => {
			await queryClient.setQueryData(['auth'], response)
			await queryClient.invalidateQueries({
				queryKey: ['auth'],
			})
		},
	})

	return { mutateAsync, status, error }
}

export const useLogout = () => {
	const queryClient = useQueryClient()

	const { mutateAsync, status, error } = useMutation({
		mutationFn: async () => {
			return await AuthService.logout()
		},
		onSuccess: async () => {
			await queryClient.invalidateQueries({
				queryKey: ['artist'],
			})
			queryClient.clear()
		},
	})

	return { mutateAsync, status, error }
}

export const useArtist = () => {
	const { data, status, error } = useQuery({
		queryKey: ['auth'],
		queryFn: async () => {
			return await AuthService.getProfile()
		},
      select: ( data ) => data,
		enabled: true,
		refetchOnMount: true,
		retry: false,
		staleTime: 0,
	})

	return { data, status, error }
}
