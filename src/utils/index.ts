export function formatDate(isoString: string): string {
	const date = new Date(isoString);

	return new Intl.DateTimeFormat('es-MX', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	}).format(date);
}
