import React from 'react';

import Button from '../../components/Button';

export default function LogoutPage() {
	return (
		<>
			<h1>You have logged out.</h1>
			<p>We hope you come back soon!</p>
			<Button isLink={true} to="/">Back to home</Button>
		</>
	)
}
