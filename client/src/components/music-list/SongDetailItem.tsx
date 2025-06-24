import { CheckCircle } from 'lucide-react'

interface Props {
	title?: string
	value?: string | number | boolean
}

const SongDetailItem = ({ title, value }: Props) => {
	const renderIcon = () => {
		if (typeof value === 'boolean') {
			return value ? (
				<CheckCircle className='w-4 h-4 text-green-500' />
			) : (
				// <XCircle className='text-red-500 w-4 h-4' />
				<span>--</span>
			)
		}
		return null
	}

	return (
		<div className='flex items-center gap-1'>
			<span className='font-semibold'>{title}:</span>
			<span className='font-normal flex items-center gap-1'>
				{renderIcon()}
				{typeof value !== 'boolean' && value}
			</span>
		</div>
	)
}

export default SongDetailItem
