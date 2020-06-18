import React from 'react';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { Helmet } from "react-helmet";

import notFound from './not-found.svg';
import Button from '../../components/Button';

export default function NotFoundPage() {
	return (
		<div className="container">
			<Helmet>
				<title>Not Found</title>
			</Helmet>
			<div className="center mt-40">
				<img src={notFound} />
				<div className="mb-20">
					<h1>404 Not Found</h1>
					<p>Sorry, we can't seem to find the page that you're looking for.</p>
				</div>
				<Button isLink={true} to="/" icon={faChevronLeft}>Return to Home</Button>
			</div>
		</div>
	)
}
