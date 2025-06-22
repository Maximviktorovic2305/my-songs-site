import Head from 'next/head'
import Music from '@/components/widgets/Music'
import Footer from '@/components/layout/footer/footer'

export default function Home() {
	return (
		<div>
			<Head>
				<meta
					name='description'
					content='Простой музыкальный проигрыватель на Next.js с TypeScript'
				/>
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<main>
				<Music />
			</main>
			<Footer />
		</div>
	)
}
