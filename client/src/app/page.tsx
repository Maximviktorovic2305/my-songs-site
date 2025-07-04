import Head from 'next/head'
import Music from '@/components/widgets/Music'

export default function Home() {
	return (
		<div>
			<Head>
				<meta
					name='description'
					content='Выкладывай свою музыку для оценки'
				/>
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<main>
				<Music />
			</main>
		</div>
	)
}
