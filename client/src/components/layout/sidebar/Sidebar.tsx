import { Card } from '../../ui/card'
import Albums from './Albums'
import Genres from './Genres'
import NewSongs from './NewSongs'
import TopCharts from './TopCharts'

const Sidebar = () => {
	return (
		<aside>
			<Card className='mb-3'>
				<TopCharts />
				<NewSongs />
				<Albums />
				<Genres />
			</Card>
			<Card>
				<TopCharts />
			</Card>
		</aside>
	)
}

export default Sidebar
