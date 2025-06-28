'use client'

import { CheckCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface Props {
	title?: string
	value?: string | number | boolean
	redirect?: string
}

const SongDetailItem = ({ title, value, redirect }: Props) => {
	const router = useRouter()

	const renderIcon = () => {
		if (typeof value === 'boolean') {
			return value ? (
				<CheckCircle className='w-4 h-4 text-green-500' />
			) : (
				<span>--</span>
			)
		}
		return null
	}

	const handleRedirect = () => {
		if (redirect) {
			router.push(`/music/${redirect}`)
		}
	}

	return (
		<div className='flex items-center gap-1'>
			<span className='font-semibold'>{title}:</span>
			<span
				className={`font-normal flex items-center gap-1 text-gray-500 ${redirect ? 'cursor-pointer hover:text-primary/90 duration-200' : ''}`}
				onClick={handleRedirect}>
				{renderIcon()}
				{typeof value !== 'boolean' && value}
			</span>
		</div>
	)
}

export default SongDetailItem
