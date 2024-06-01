import { updateProject } from '@/api/ProjectApi';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

export function useEditProject() {
	// Mutation to edit a project
	const { mutate: editProjectFn, isPending: isEditProj } = useMutation({
		mutationFn: updateProject,
		onError: error => {
			toast.error(error.message);
		},
		onSuccess: data => {
			toast.success(data);
		},
	});

	return { editProjectFn, isEditProj };
}
