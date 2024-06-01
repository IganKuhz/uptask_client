import { updateTask } from '@/api/TaskApi';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

export function useEditTask() {
	// Mutation to edit a project
	const { mutate: editTaskFn, isPending: isEditingTask } = useMutation({
		mutationFn: updateTask,
		onError: error => {
			toast.error(error.message);
		},
		onSuccess: data => {
			toast.success(data);
		},
	});

	return { editTaskFn, isEditingTask };
}
