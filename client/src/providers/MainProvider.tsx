'use client'

import { FC, PropsWithChildren } from 'react'
import { Provider } from 'react-redux'
import store from '@/store/store'
import AuthProvider from './AuthProvider'

const MainProvider: FC<PropsWithChildren<unknown>> = ({ children }) => {
	return (
		<Provider store={store}>
			<AuthProvider>{children}</AuthProvider>
		</Provider>
	)
}

export default MainProvider
