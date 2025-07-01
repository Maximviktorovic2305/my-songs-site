interface Props {
	onClose: () => void
}

const CloseButton = ({ onClose }: Props) => {
	return (
		<button
			className='absolute top-3 right-3 cursor-pointer text-gray-400 hover:text-gray-600'
			onClick={onClose}>
			✕
		</button>
	)
}

export default CloseButton
