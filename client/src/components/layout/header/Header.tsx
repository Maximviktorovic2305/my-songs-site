import Logo from '@/components/base/Logo'
import { MusicAddSong } from '@/components/music-list/add-song/MusicAddSong'

const Header = () => {
	return (
		<header className='sm:px-[5%] fixed top-0 right-0 left-0 p-3 shadow bg-white w-full min-w-full flex items-center gap-2 justify-between max-h-[54px]'>
			<Logo />

			<div className='flex items-center gap-4'>
				<MusicAddSong />
				<span className='text-lg font-bold hover:opacity-80 cursor-pointer duration-200'>
					Войти
				</span>
			</div>
		</header>
	)
}

export default Header
