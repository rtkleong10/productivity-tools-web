import React, { useEffect } from 'react';
import Select from '../Select';
import { connect } from 'react-redux';

import { listColors, selectColors, selectColorsLoading, selectColorsError } from '../../redux/ducks/colors'; 

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

const colorStyles = {
	option: (styles, { data }) => ({ ...styles, ...dot(data.hex_code) }),
	singleValue: (styles, { data }) => ({ ...styles, ...dot(data.hex_code) }),
};

export function ColorSelect(props) {
	const {
		colors,
		colorsLoading,
		listColors,
	} = props;

	useEffect(listColors, [listColors]);
	
	let colorOptions = [];
	
	if (colors) {
		colorOptions = colors.map(color => {
			const {
				id,
				title,
				hex_code,
			} = color;
	
			return {
				value: id,
				label: title,
				hex_code,
			};
		})
	}

	return (
		<Select
			placeholder="Select a color"
			isLoading={colorsLoading}
			options={colorOptions}
			styles={colorStyles}
			isSearchable={false}
			{...props}
			/>
	);
}

const mapStateToProps = state => ({
	colors: selectColors(state),
	colorsLoading: selectColorsLoading(state),
	colorsError: selectColorsError(state),
});

const dispatchers = {
	listColors,
};

export default connect(mapStateToProps, dispatchers)(ColorSelect);
