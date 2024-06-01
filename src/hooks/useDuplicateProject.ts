import { duplicateProject } from '@/api/ProjectApi';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export function useDuplicateProject() {
	// Query client to invalidate the cache
	const queryClient = useQueryClient();
	// Mutation to duplicate a project
	const { mutate: duplicateProjectFn, isPending: isDuplProj } = useMutation({
		mutationFn: duplicateProject,
		onError: error => {
			toast.error(error.message);
		},
		onSuccess: data => {
			toast.success(data);
			queryClient.invalidateQueries({ queryKey: ['projects'] });
		},
	});

	return { duplicateProjectFn, isDuplProj };
}
