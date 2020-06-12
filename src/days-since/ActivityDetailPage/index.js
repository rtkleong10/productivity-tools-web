import React from 'react';
import { faTrash, faPlus, faCheck, faForward, faQuestion, faEdit } from '@fortawesome/free-solid-svg-icons';

import { getFrequencyDisplay, EVENTS } from '../utils';
import Button from '../../components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './index.scss';
import Breadcrumbs from '../../components/Breadcrumbs';

const events = [
	{
		id: "1",
		eventType: 1,
		date: "13/05/2020"
	},
	{
		id: "2",
		eventType: 2,
		date: "12/05/2020"
	},
]

export default function ActivityDetailPage() {

	return (
		<div className="container">
			<Breadcrumbs
				breadcrumbs={[
					{ title: "Home", to: "/" },
					{ title: "Days Since", to: "/days-since" },
					{ title: "Do the Laundry" },
				]} />
			<div className="grid activity-detail">
				<div>
					<h1>Do the Laundry</h1>
					<div className="mb-20">
						<p>Sint ut magna reprehenderit amet est veniam magna. Veniam enim laboris ut in sint labore do nisi consequat. Nisi nostrud irure ex cillum duis magna anim do nulla. Culpa duis cillum mollit commodo minim. Aliqua sit enim consectetur non exercitation fugiat magna proident dolor eiusmod. Nulla nostrud anim id nisi ad commodo irure occaecat pariatur ad reprehenderit. Anim adipisicing enim nostrud id enim enim excepteur et occaecat occaecat eu do ex.</p>
						<p>Frequency: {getFrequencyDisplay(14)}</p>
					</div>
					<div>
						<Button icon={faEdit} color="green" className="mr-5">Edit</Button>
						<Button icon={faTrash} color="red">Delete</Button>
					</div>
				</div>
				<div>
					<h2>Events</h2>
					<div className="mb-20">
						<Button icon={faPlus} color="blue">Create Event</Button>
					</div>
					<div className="box">
						{
							events.length !== 0
								? events.map(event => {
									const {
										id,
										eventType,
										date
									} = event;

									var eventDisplay = "";

									switch (eventType) {
										case EVENTS.COMPLETED:
											eventDisplay = <><FontAwesomeIcon className="mr-10" icon={faCheck} />Completed</>
											break;

										case EVENTS.SKIPPED:
											eventDisplay = <><FontAwesomeIcon className="mr-10" icon={faForward} />Skipped</>;
											break;

										default:
											eventDisplay = <><FontAwesomeIcon className="mr-10" icon={faQuestion} />Unknown event</>;
											break;
									}

									return (
										<div key={id} className="event-item">
											<p>{eventDisplay} on {date}</p>
											<div>
												<Button icon={faEdit} color="green" className="mr-5" />
												<Button icon={faTrash} color="red" />
											</div>
										</div>
									);
								})
								: <p>No events found</p>
						}
					</div>
				</div>
			</div>
		</div>
	)
}
