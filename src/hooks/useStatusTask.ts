import { updateStatusTask } from '@/api/TaskApi';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

export function useStatusTask() {
	// Mutation to update a starus of a task
	const { mutate: updateStatusFn, isPending: isChangingStatus } = useMutation({
		mutationFn: updateStatusTask,
		onError: error => {
			toast.error(error.message);
		},
		onSuccess: data => {
			toast.success(data);
		},
	});

	return { updateStatusFn, isChangingStatus };
}
