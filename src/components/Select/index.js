import React from 'react';
import ReactSelect from 'react-select';

import './index.scss';

export default function Select(props) {
	return (
		<ReactSelect
			className="select-container"
			classNamePrefix="select"
			placeholder="Select an option"
			components={{ IndicatorSeparator: () => null }}
			{...props}
		/>
	);
}