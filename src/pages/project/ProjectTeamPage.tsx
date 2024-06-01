import { getProjectTeam, removeUserFromProject } from '@/api/TeamApi';
import Loading from '@/components/Loading';
import TeamForm from '@/components/Team/TeamForm';
import { useModal } from '@/hooks/useModal';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ArrowLeft, Trash2, UserPlus2 } from 'lucide-react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';

function ProjectTeamPage() {
	const navigate = useNavigate();
	// Get the project ID from the URL
	const params = useParams();
	const projectId = params.projectId!;

	// Query to get all the team members of the project
	const { data, isLoading, isError } = useQuery({
		queryKey: ['projectTeam', projectId],
		queryFn: () => getProjectTeam(projectId),
		retry: false,
	});

	// Modal to add a new team member
	const { modal, openModal, closeModal } = useModal({
		children: <TeamForm closeModal={() => closeModal} />,
	});

	const queryClient = useQueryClient();
	// Remove user from project
	const { mutate } = useMutation({
		mutationFn: removeUserFromProject,
		onError: error => {
			toast.error(error.message);
		},
		onSuccess: data => {
			toast.success(data);
			queryClient.invalidateQueries({ queryKey: ['projectTeam', projectId] });
		},
	});

	function handleAddTeamMember() {
		navigate('?addMember=true');
		openModal();
	}

	if (isLoading)
		return (
			<div className='flex h-screen w-full items-center justify-center'>
				<Loading />
			</div>
		);
	if (isError) return <p>Error</p>;

	if (data)
		return (
			<>
				<div className='w-full'>
					<div className='relative flex justify-center'>
						<Link
							to={`/projects/${projectId}`}
							className='btn btn-circle btn-outline btn-primary btn-sm absolute left-4 self-center text-primary'
						>
							<ArrowLeft size={20} />
						</Link>
						<h1 className='text-2xl font-bold text-primary md:text-3xl'>
							Miembros del proyecto
						</h1>
					</div>
					<p className='text-balance text-center'>
						En esta página podrás ver y gestionar los miembros del proyecto.
					</p>
				</div>

				<div className='mt-8 flex w-full flex-col items-center'>
					{/* TODO: Team List here */}
					{data.length! ? (
						<ul
							role='list'
							className='flex w-full flex-wrap justify-center gap-4'
						>
							{data?.map(member => (
								<li
									key={member._id}
									className='relative flex justify-between '
								>
									<div className='card w-96 bg-base-100 shadow-md md:w-full'>
										<button
											className='btn btn-circle btn-outline btn-error btn-sm absolute -right-3 -top-3'
											onClick={() => mutate({ projectId, userId: member._id })}
										>
											<Trash2 size={18} />
										</button>
										<div className='card-body flex-row items-center p-4 md:flex-col'>
											<img
												src='https://avatar.iran.liara.run/public'
												alt='user'
												className='w- h-24 rounded-2xl object-cover'
											/>
											<div className='md_ ml-2 mt-2 flex flex-col'>
												<div className='w-full flex-none text-lg font-bold leading-none'>
													{member.userName}
												</div>
												<div className='my-1 flex flex-col text-gray-500'>
													<span className='mr-3'>{member.email}</span>
													<span className='mr-3'>UI/UX Designer</span>
												</div>
											</div>
										</div>
									</div>
								</li>
							))}
						</ul>
					) : (
						<>
							<div className='flex h-[calc(100vh-256px)] w-5/6 items-center justify-center'>
								<div className='flex w-96 flex-col items-center space-y-4 rounded-xl border-2 border-dashed border-base-content/30 p-10 text-center'>
									<UserPlus2
										size={40}
										className='text-base-content'
									/>
									<p>
										No hay miembros en este proyecto. <br />
										Comienza agregando a uno.
									</p>
									<button
										className='btn btn-outline btn-primary btn-sm rounded 
										px-6'
										onClick={handleAddTeamMember}
									>
										+ Agregar
									</button>
								</div>
							</div>
						</>
					)}
				</div>

				{data.length !== 0 && (
					<div className='fixed bottom-10 right-10'>
						<div
							className='tooltip tooltip-left tooltip-primary'
							data-tip='Agregar miembro'
						>
							<button
								className='btn btn-circle btn-primary shadow-md'
								onClick={handleAddTeamMember}
							>
								<UserPlus2 size={20} />
							</button>
						</div>
					</div>
				)}
				{modal}
			</>
		);
}
export default ProjectTeamPage;
