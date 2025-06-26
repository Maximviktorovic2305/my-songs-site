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
import AddSongForm from './AddSongForm'

export function MusicAddSong() {
	return (
		<Drawer>
			<DrawerTrigger asChild>
				<Button variant='outline'>Добавть песню</Button>
			</DrawerTrigger>
			<DrawerContent>
				<div className='w-full min-w-full'>
					<div className='mx-auto max-w-2xl'>
						<DrawerHeader>
							<DrawerTitle className='text-lg'>Добавь песню</DrawerTitle>
							<DrawerDescription>Заполни форму</DrawerDescription>
						</DrawerHeader>
						<div className='mb-2 p-4 pb-0'>
							<AddSongForm />
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
