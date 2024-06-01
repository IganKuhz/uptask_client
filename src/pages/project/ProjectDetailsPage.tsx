import { getFullProject } from '@/api/ProjectApi';
import Loading from '@/components/Loading';
import ProjectDetails from '@/components/Project/ProjectDetails';
import TaskFormWrapper from '@/components/Task/TaskFormWrapper';
import TaskList from '@/components/Task/TaskList';
import { useAuth } from '@/hooks/useAuth';
import { useModal } from '@/hooks/useModal';
import { useQuery } from '@tanstack/react-query';
import { ArrowLeft } from 'lucide-react';
import { useMemo } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

function ProjectDetailsPage() {
	const { data: authUser, isLoading: authLoading } = useAuth();
	const navigate = useNavigate();
	// Get the project ID from the URL
	const params = useParams();
	const projectId = params.projectId!;

	// Query to get the project by ID
	const { data: projectData, isLoading } = useQuery({
		queryKey: ['project', projectId],
		queryFn: () => getFullProject(projectId),
	});

	const { modal, openModal, closeModal } = useModal({
		children: <TaskFormWrapper closeModal={() => closeModal()} />,
	});

	// Function to handle the add task button
	function handleCreateTask() {
		navigate('?newTask=true');
		openModal();
	}

	function handleEditTask(taskId: string) {
		navigate(`?editTask=${taskId}`);
		openModal();
	}

	function handleViewTask(taskId: string) {
		navigate(`?viewTask=${taskId}`);
		openModal();
	}

	const hasAuth = useMemo(() => {
		return projectData?.manager === authUser?._id;
	}, [authUser, projectData]);

	if (isLoading && authLoading) return <Loading />;
	if (projectData && authUser)
		return (
			<>
				<div className='w-full'>
					<div className='relative flex justify-center'>
						<Link
							to='/'
							className='btn btn-circle btn-outline btn-primary btn-sm absolute left-4 self-center text-primary'
						>
							<ArrowLeft size={20} />
						</Link>
						<h1 className='text-center text-2xl font-bold text-primary md:text-3xl'>
							Detalles del proyecto
						</h1>
					</div>
					<p className='text-balance text-center'>
						Administra las tareas de tu proyecto de forma sencilla y eficiente.
					</p>
				</div>

				<div className='my-8 flex w-full flex-col items-center'>
					<ProjectDetails
						projectData={projectData}
						onCreate={handleCreateTask}
						userAuth={authUser}
					/>

					<TaskList
						tasks={projectData.tasks}
						onEdit={handleEditTask}
						onView={handleViewTask}
						hasAuth={hasAuth}
					/>
				</div>
				{modal}
			</>
		);
}

export default ProjectDetailsPage;
