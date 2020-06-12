import React from 'react';

import Button from '../../components/Button';

export default function HomePage() {
	return (
		<>
			<h1>Welcome to Productivity Tools!</h1>
			<Button isLink={true} to="/login">
				Log In
			</Button>
			<Button isLink={true} to="/signup">
				Sign Up
			</Button>
		</>
	)
}
