import React from 'react';
import ReactSelect from 'react-select';

import './index.scss';

export default function Select(props) {
	const {
		options,
		value,
		disabled,
		required,
		...rest
	} = props;

	let optionValue = value;

	if (value) {
		let option = options.find(option => option.value === value);

		if (option)
			optionValue = option;
	}

	return (
		<>
			<ReactSelect
				className="select-container"
				classNamePrefix="select"
				placeholder="Select an option"
				components={{ IndicatorSeparator: () => null }}
				options={options}
				disabled={disabled}
				value={optionValue}
				{...rest}
			/>
			{
				(!disabled && required) &&
				(
					<input
						tabIndex={-1}
						autoComplete="off"
						style={{ opacity: 0, height: 0, padding: 0, margin: 0 }}
						value={value ? value : ""}
						onChange={() => { }}
						required
					/>
				)
			}
		</>
	);
}
