import React from 'react';
import Select from '../Select';

const colourOptions = [
	{
		value: '#D94150',
		label: 'Red',
	},
	{
		value: '#F5D624',
		label: 'Yellow',
	},
	{
		value: '#25BA9C',
		label: 'Green',
	},
	{
		value: '#4597E3',
		label: 'Blue',
	},
	{
		value: '#9D5BFF',
		label: 'Purple',
	}
]

const dot = color => ({
	alignItems: 'center',
	display: 'flex',

	':before': {
		backgroundColor: color,
		borderRadius: 15,
		content: '""',
		display: 'block',
		marginRight: 10,
		height: 15,
		width: 15,
	},
});

const colourStyles = {
	option: (styles, { data }) => ({ ...styles, ...dot(data.value) }),
	singleValue: (styles, { data }) => ({ ...styles, ...dot(data.value) }),
};

export default function ColorSelect(props) {
	return (
		<Select
			placeholder="Select a colour"
			options={colourOptions}
			styles={colourStyles}
			isSearchable={false}
			{...props} />
	);
}
