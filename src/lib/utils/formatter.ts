export function formatDate(date: Date | string) {
	const cleanDate = typeof date === 'string' ? new Date(date) : date;

	const formatted = new Intl.DateTimeFormat('en-GB', {
		month: 'short',
		day: 'numeric'
	}).format(cleanDate);

	return formatted;
}
