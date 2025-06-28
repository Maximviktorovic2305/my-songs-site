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
import AddCommentForm from './AddCommentForm'
import { PlusCircle } from 'lucide-react'

export function MusicAddComment() {
	return (
		<Drawer>
			<DrawerTrigger asChild>
				<div className='flex text-gray-400 cursor-pointer hover:text-primary/90 items-center duration-200 gap-2 text-sm self-end'>
					<span>Добавить комментарий</span>
					<PlusCircle className='size-4' />
				</div>
			</DrawerTrigger>
			<DrawerContent>
				<div className='w-full min-w-full'>
					<div className='mx-auto max-w-2xl'>
						<DrawerHeader>
							<DrawerTitle className='text-lg'>Добавь комментарий</DrawerTitle>
							<DrawerDescription>Заполни форму</DrawerDescription>
						</DrawerHeader>
						<div className='mb-2 p-4 pb-0'>
							<AddCommentForm />
						</div>
						<DrawerFooter>
							<Button type='submit' form='add-comment-form'>
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
