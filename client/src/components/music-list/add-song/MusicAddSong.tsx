'use client'

import { Button } from '@/components/ui/button'
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from '@/components/ui/drawer'
import Image from 'next/image'
import AddSongForm from './AddSongForm'
import { useArtist } from '@/hooks/useSelectors'
import { useEffect, useState } from 'react'

export function MusicAddSong() {
	const [isClient, setIsClient] = useState(false)
	const [open, setOpen] = useState(false)

	const { artist } = useArtist()

	useEffect(() => {
		setIsClient(true)
	}, [])

	return (
		<Drawer open={open} onOpenChange={setOpen}>
			{isClient && artist ? (
				<DrawerTrigger asChild>
					<Image
						width={24}
						height={24}
						src='/upload-song.png'
						alt='upload-song'
						className='cursor-pointer hover:opacity-80 duration-200'
					/>
				</DrawerTrigger>
			) : (
				<Image
					width={24}
					height={24}
					src='/upload-song.png'
					alt='upload-song'
					className='cursor-pointer hover:opacity-80 duration-200'
				/>
			)}

			<DrawerContent>
				<div className='w-full min-w-full'>
					<div className='mx-auto max-w-2xl'>
						<DrawerHeader className='-mb-4'>
							<DrawerTitle className='text-lg'>Добавь песню</DrawerTitle>
							<DrawerDescription>Заполни форму</DrawerDescription>
						</DrawerHeader>
						<div className='mb-2 p-4 max-sm:px-0 pb-0'>
							<AddSongForm setOpen={setOpen} />
						</div>
						<DrawerFooter>
							<Button type='submit' form='add-song-form'>
								Подтвердить
							</Button>
							<DrawerClose asChild>
								<Button variant='outline'>Отмена</Button>
							</DrawerClose>
						</DrawerFooter>
					</div>
				</div>
			</DrawerContent>
		</Drawer>
	)
}
