import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import '../globals.css'
import MainProvider from '@/providers/MainProvider'

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

export default function AuthLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='en'>
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased sm:px-3 max-w-[80rem] mx-auto`}>
				<MainProvider>
					<div className='mt-17 mb-26 flex gap-3 bg-background'>
						
						<div className='w-full'>{children}</div>
					</div>
				</MainProvider>
			</body>
		</html>
	)
}
