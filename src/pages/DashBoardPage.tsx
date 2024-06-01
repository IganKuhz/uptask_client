import { getProjects } from '@/api/ProjectApi';
import ConfirmationModal from '@/components/ConfirmationModal';
import Loading from '@/components/Loading';
import ProjectCard from '@/components/Project/ProjectCard';
import { useAuth } from '@/hooks/useAuth';
import { useDuplicateProject } from '@/hooks/useDuplicateProject';
import { useModal } from '@/hooks/useModal';
import { useQuery } from '@tanstack/react-query';
import { FilePlus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useDeleteProject } from '../hooks/useDeleteProject';
import { Project } from '../types';

function DashBoardPage() {
	// Get the user data
	const { data: authUser, isLoading: authLoading } = useAuth();

	const { modal, openModal, closeModal } = useModal({
		children: (
			<ConfirmationModal
				title='Eliminar proyecto'
				message='¿Estás seguro de que deseas eliminar este proyecto?'
				closeModal={() => closeModal()}
			/>
		),
	});

	// QUERY TO GET ALL PROJECTS
	const { data, isLoading } = useQuery({
		queryKey: ['projects'],
		queryFn: getProjects,
	});

	//! FUNCTION TO DELETE A PROJECT
	const { deleteProjectFn } = useDeleteProject();

	//! FUNCTION TO DUPLICATE A PROJECT
	const { duplicateProjectFn } = useDuplicateProject();

	if (isLoading && authLoading) return <Loading />;
	if (data && authUser)
		return (
			<>
				<div className='w-full'>
					<h1 className='text-center text-2xl font-bold text-primary md:text-3xl'>
						Panel principal
					</h1>
					<p className='text-balance text-center'>
						Maneja tus proyectos y tareas de forma sencilla y eficiente.
					</p>
				</div>

				<div className='mt-8 flex w-full flex-col items-center gap-4'>
					{!data.length ? (
						<div className='flex h-[calc(100vh-256px)] w-5/6 items-center justify-center'>
							<div className='flex w-96 flex-col items-center space-y-4 rounded-xl border-2 border-dashed border-base-content/30 p-10 text-center'>
								<FilePlus
									size={40}
									className='text-base-content'
								/>
								<p>
									No hay proyectos disponibles. <br />
									Comienza creando uno.
								</p>
								<Link
									to='/projects/new'
									className='btn btn-outline btn-primary btn-sm rounded 
										px-6'
								>
									+ Agregar
								</Link>
							</div>
						</div>
					) : (
						<>
							{data.map(project => (
								<ProjectCard
									key={project._id}
									project={project as Project}
									openModal={() => openModal()}
									onDuplicate={duplicateProjectFn}
									onDelete={deleteProjectFn}
									userAuth={authUser}
								/>
							))}
						</>
					)}
				</div>
				{modal}
			</>
		);
}
export default DashBoardPage;
