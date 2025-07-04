// 'use client'

// import { useActions } from '@/hooks/useActions'
// import { useArtist } from '@/hooks/useSelectors'
// import { getRefreshToken } from '@/services/api/auth/auth.helper'
// import { usePathname } from 'next/navigation'
import { FC, PropsWithChildren } from 'react'

const AuthProvider: FC<PropsWithChildren<unknown>> = ({ children }) => {
	// const { artist } = useArtist()
	// const { checkAuth } = useActions()
	// const pathname = usePathname()

	// useEffect(() => {
	// 	function getAccessToken(): string | null {
	// 		return getAccessToken()
	// 	}
	// 	const accessToken = getAccessToken()
	// 	if (accessToken) {
	// 		checkAuth()
	// 	}
	// }, [checkAuth])

	// useEffect(() => {
	// 	function getAccessToken(): string | null {
	// 		return getRefreshToken()
	// 	}
	// 	const refreshToken = getAccessToken()
	// 	if (!refreshToken && artist) {
	// 		checkAuth()
	// 	}
	// }, [artist, pathname, checkAuth])

	return <>{children}</>
}

export default AuthProvider
