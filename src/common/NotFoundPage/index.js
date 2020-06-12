import React from 'react';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';

import Button from '../../components/Button';

export default function NotFoundPage() {
	return (
		<div className="container">
			<h1>404 Not Found</h1>
			<p>Sorry, we can't seem to find the page that you're looking for.</p>
			<Button isLink={true} to="/" icon={faChevronLeft}>Return to Home</Button>
		</div>
	)
}
