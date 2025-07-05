import {
	// useCheckAuth,
	useLogin,
	useLogout,
	useRegister,
} from '@/services/queries/auth'
import { useQueryClient } from '@tanstack/react-query'

export const useAuth = () => {
	const queryClient = useQueryClient()

	const { mutateAsync: registerMutate } = useRegister()

	const { mutateAsync: loginMutate } = useLogin()

	const { mutateAsync: logoutMutate } = useLogout()

	// const { refetch: checkAuth, isPending: isCheckingAuth } = useCheckAuth()

	return {
		register: registerMutate,
		login: loginMutate,
		logout: logoutMutate,
		// checkAuth,
		// isCheckingAuth,
		queryClient,
	}
}
