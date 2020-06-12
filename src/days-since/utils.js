export const EVENT_TYPES = {
	COMPLETED: 1,
	SKIPPED: 2,
}

export function getFrequencyDisplay(frequency) {
	if (frequency === 1)
		return "Everyday";
	else if (frequency === 2)
		return "Every other day";
	else if (frequency === 7)
		return "Every week";
	else if (frequency === 14)
		return "Every other week";
	else if (frequency % 7 === 0)
		return `Every ${Math.round(frequency / 7)} weeks`;
	else
		return `Every ${frequency} days`;
}
