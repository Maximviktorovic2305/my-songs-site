import styles from './BaseLoader.module.css'

interface BaseLoaderProps {
	variant?: 'fullscreen' | 'inline'
	className?: string
}

const BaseLoader = ({
	variant = 'inline',
	className = '',
}: BaseLoaderProps) => {
	const containerClass =
		variant === 'fullscreen'
			? styles['fullscreen-container']
			: styles['inline-container']

	return (
		<div className={`${containerClass} ${className}`}>
			<span className={styles['loader-animation']} />
		</div>
	)
}

export default BaseLoader
