import React, { Fragment } from 'react';

export const getTextWithBrs = text => {
	if (text) {
		let lines = text.split("\n");
		return lines.map((item, i) => (<Fragment key={i}>{item}{i + 1 < lines.length ? < br /> : ""}</Fragment>))
		
	} else {
		return text;
	}
}