'use client'

import { ChevronsDown } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'

const BackButton = () => {
	const router = useRouter()
	const currentPath = usePathname()

	const isNotHomePage = currentPath !== '/'

	if (!isNotHomePage) return null

	return (
		<button
			onClick={() => router.back()}
			className='flex items-center cursor-pointer gap-1 text-muted-foreground hover:text-accent transition-colors duration-200'>
         <ChevronsDown size={24} className='rotate-90' />
		</button>
	)
}

export default BackButton
