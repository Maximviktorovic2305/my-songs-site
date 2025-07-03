'use client'

import { FC, PropsWithChildren } from 'react'
import { Provider } from 'react-redux'
import store from '@/store/store'
import AuthProvider from './AuthProvider'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

const MainProvider: FC<PropsWithChildren<unknown>> = ({ children }) => {
	return (
		<QueryClientProvider client={queryClient}>
			<Provider store={store}>
				<AuthProvider>{children}</AuthProvider>
			</Provider>
		</QueryClientProvider>
	)
}

export default MainProvider
