'use client'

import { AudioWaveform, BellPlus, Heart, ListStart } from 'lucide-react'
import { Card } from '../../ui/card'
import Genres from './Genres'
import { useState } from 'react'

const Sidebar = () => {
	const [activeTab, setActiveTab] = useState<string | null>('Сборник')

	const menuItems = [
		{ label: 'Сборник', icon: AudioWaveform },
		{ label: 'Топ чарты', icon: ListStart },
		{ label: 'Новинки', icon: BellPlus },
		{ label: 'Избранное', icon: Heart },
	]

	const handleGenreSelect = (genre: string) => {
		setActiveTab(genre)
	}

	return (
		<aside>
			<Card className='mb-3'>
				{menuItems.map(({ label, icon: Icon }) => {
					const isActive = activeTab === label
					return (
						<div
							key={label}
							className={`flex items-center gap-2 cursor-pointer mb-1 text-shadow transition-all duration-200 font-bold ${
								isActive ? 'underline' : ''
							}`}
							onClick={() => setActiveTab(label)}>
							<Icon
								fill={isActive ? '#73dde3' : ''}
								className={`size-4 ${
									isActive ? 'text-accent' : ''
								} text-shadow opacity-90`}
							/>
							<span>{label}</span>
						</div>
					)
				})}

				<Genres activeTab={activeTab} onGenreSelect={handleGenreSelect} />
			</Card>
		</aside>
	)
}

export default Sidebar
