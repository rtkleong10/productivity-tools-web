import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Helmet } from "react-helmet";

import Breadcrumbs from '../../components/Breadcrumbs';
import Loader from '../../components/Loader';
import ProfileForm from '../ProfileForm';
import { retrieveProfile, updateProfile, selectProfile, selectProfileLoading, selectProfileError } from '../../redux/ducks/profile';

export function ProfilePage(props) {
	const {
		retrieveProfile,
		updateProfile,
		profile,
		profileLoading,
		profileError,
	} = props;

	useEffect(retrieveProfile, [retrieveProfile]);

	if (profileLoading)
		return (
			<div className="container">
				<Helmet>
					<title>Profile</title>
				</Helmet>
				<Breadcrumbs
					breadcrumbs={[
						{ title: "Home", to: "/" },
						{ title: "Profile" },
					]} />
				<h1>Profile</h1>
				<Loader />
			</div>
		);

	if (!profile || profileError)
		return <Redirect to="/" />;

	return (
		<div className="container">
			<Helmet>
				<title>Profile</title>
			</Helmet>
			<Breadcrumbs
				breadcrumbs={[
					{ title: "Home", to: "/" },
					{ title: "Profile" },
				]} />
			<h1>Profile</h1>
			<ProfileForm profile={profile} onSubmit={updateProfile} />
		</div>
	)
}

const mapStateToProps = state => ({
	profile: selectProfile(state),
	profileLoading: selectProfileLoading(state),
	profileError: selectProfileError(state),
});

const dispatchers = {
	retrieveProfile,
	updateProfile,
};

export default connect(mapStateToProps, dispatchers)(ProfilePage);
