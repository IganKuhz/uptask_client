import { deleteTask } from '@/api/TaskApi';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

export function useDeleteTask() {
	// Mutation to delete a project
	const { mutate: deleteTaskFn, isPending: isDelTask } = useMutation({
		mutationFn: deleteTask,
		onError: error => {
			toast.error(error.message);
		},
		onSuccess: data => {
			toast.success(data);
		},
	});

	return { deleteTaskFn, isDelTask };
}
