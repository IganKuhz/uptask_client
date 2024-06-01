import { createTask } from '@/api/TaskApi';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

export function useCreateTask() {
	// Mutation to create a project
	const { mutate: createTaskFn, isPending: isCreatingTask } = useMutation({
		mutationFn: createTask,
		onError: error => {
			toast.error(error.message);
		},
		onSuccess: data => {
			toast.success(data);
		},
	});

	return { createTaskFn, isCreatingTask };
}
