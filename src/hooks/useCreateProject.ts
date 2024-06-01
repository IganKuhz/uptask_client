import { createProject } from '@/api/ProjectApi';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

export function useCreateProject() {
	// Mutation to create a project
	const { mutate: createProjectFn, isPending: isCreatProj } = useMutation({
		mutationFn: createProject,
		onError: error => {
			toast.error(error.message);
		},
		onSuccess: data => {
			toast.success(data);
		},
	});

	return { createProjectFn, isCreatProj };
}
