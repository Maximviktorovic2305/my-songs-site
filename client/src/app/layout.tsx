import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import Sidebar from '@/components/layout/sidebar/Sidebar'
import Header from '@/components/layout/header/Header'
import MainProvider from '@/providers/MainProvider'
import Footer from '@/components/layout/footer/footer'
import AuthProvider from '@/providers/AuthProvider'

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin'],
})

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
})

export const metadata: Metadata = {
	title: 'MaxMusic',
	description: 'Share your music',
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='en'>
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased sm:px-3 max-w-[80rem] mx-auto`}>
				<MainProvider>
					<AuthProvider>
						<Header />
						<div className='mt-17 mb-26 flex gap-3 bg-background'>
							<div className='w-[20%] min-w-[11rem] max-sm:hidden'>
								<Sidebar />
							</div>
							<div className='w-full'>{children}</div>
						</div>
						<Footer />
					</AuthProvider>
				</MainProvider>
			</body>
		</html>
	)
}
