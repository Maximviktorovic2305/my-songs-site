import Image from 'next/image'

const Header = () => {
	return (
		<header className='sm:px-[5%] fixed top-0 right-0 left-0 p-3 shadow bg-white w-full min-w-full flex items-center gap-2 justify-between'>
			<Image width={130} height={20} src='/maxmusic.png' alt='music' />
			<span className='text-lg font-bold'>Войти</span>
		</header>
	)
}

export default Header
