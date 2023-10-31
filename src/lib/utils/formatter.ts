export function formatDate(date: Date) {
	const options = {
		year: 'numeric',
		month: 'short',
		day: 'numeric'
	};

	const formatted = new Intl.DateTimeFormat('en-GB', {
		month: 'short',
		day: 'numeric'
	}).format(date);

	return formatted;
}
