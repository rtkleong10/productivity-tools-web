import moment from 'moment';

export const durationStrToSec = durationStr => moment.duration(durationStr).asSeconds();

export const durationSecToMMss = durationSec => {
	const minutes = Math.floor(durationSec / 60);
	const seconds = Math.floor(durationSec % 60);

	return [minutes, seconds]
		.map(v => v < 10 ? "0" + v : v)
		.join(":");
};

export const durationStrToMMss = durationStr => durationSecToMMss(durationStrToSec(durationStr));
