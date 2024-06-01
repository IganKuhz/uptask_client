export const statusLocale: { [key: string]: string } = {
	pending: 'Pendiente',
	onHold: 'En espera',
	inProgress: 'En progreso',
	underReview: 'En revisión',
	completed: 'Completado',
};

export const statusColor: { [key: string]: string } = {
	pending: 'bg-rose-500',
	onHold: 'bg-sky-500',
	inProgress: 'bg-amber-500',
	underReview: 'bg-fuchsia-500',
	completed: 'bg-green-500',
};

export const statusTextColor: { [key: string]: string } = {
	pending: 'text-rose-500',
	onHold: 'text-sky-500',
	inProgress: 'text-amber-500',
	underReview: 'text-fuchsia-500',
	completed: 'text-green-500',
};
