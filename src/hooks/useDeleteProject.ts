import { deleteProject } from '@/api/ProjectApi';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export function useDeleteProject() {
	// Query client to invalidate the cache
	const queryClient = useQueryClient();
	// Mutation to delete a project
	const { mutate: deleteProjectFn, isPending: isDelProj } = useMutation({
		mutationFn: deleteProject,
		onError: error => {
			toast.error(error.message);
		},
		onSuccess: data => {
			toast.success(data);
			queryClient.invalidateQueries({ queryKey: ['projects'] });
		},
	});

	return { deleteProjectFn, isDelProj };
}
