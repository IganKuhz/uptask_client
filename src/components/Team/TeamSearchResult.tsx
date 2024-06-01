import { addUserToProject } from '@/api/TeamApi';
import { TeamMember } from '@/types/index';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ArrowRight } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';

type TeamSearchResultProps = {
	searchData: TeamMember;
	resetData: () => void;
};

function TeamSearchResult({ searchData, resetData }: TeamSearchResultProps) {
	const params = useParams();
	const projectId = params.projectId!;

	const queryClient = useQueryClient();
	const { mutate } = useMutation({
		mutationFn: addUserToProject,
		onError: error => {
			toast.error(error.message);
		},
		onSuccess: data => {
			toast.success(data);
			resetData();
			queryClient.invalidateQueries({ queryKey: ['projectTeam', projectId] });
		},
	});

	function handleAddMember() {
		const data = { projectId, id: searchData._id };
		mutate(data);
	}

	return (
		<>
			<p className='mb-2 text-center'>Resultados:</p>
			<div
				className='rounded-lg bg-base-200 px-3 py-1  transition-all duration-200 ease-out hover:scale-[1.02] hover:cursor-pointer hover:ring-2 hover:ring-primary'
				onClick={handleAddMember}
			>
				<div className='flex justify-between gap-x-2'>
					<div className='flex  place-items-center '>
						<div className='rounded-full p-2 text-white'>
							<img
								src='https://avatar.iran.liara.run/public'
								alt='user'
								className='h-10 w-10 '
							/>
						</div>

						<div>
							<h1 className='text-semibold text-primary'>
								{searchData.userName}
							</h1>
							<p className='text-semibold text-sm italic'>{searchData.email}</p>
						</div>
					</div>

					<div className='flex items-center text-sm text-primary'>
						<span>Agregar</span>
						<ArrowRight size={18} />
					</div>
				</div>
			</div>
		</>
	);
}
export default TeamSearchResult;
