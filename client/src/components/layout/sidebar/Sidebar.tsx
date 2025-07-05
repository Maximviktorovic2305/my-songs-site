import { Card } from '../../ui/card'
import Genres from './Genres'
import NewSongs from './NewSongs'
import TopCharts from './TopCharts'

const Sidebar = () => {
	return (
		<aside>
			<Card className='mb-3'>
				<TopCharts />
				<NewSongs />
				<Genres />
			</Card>
			<Card>
				<TopCharts />
			</Card>
		</aside>
	)
}

export default Sidebar
