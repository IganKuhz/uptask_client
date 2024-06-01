import { getProjectById } from '@/api/ProjectApi';
import Loading from '@/components/Loading';
import ProjectForm from '@/components/Project/ProjectForm';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

function ProjectEditPage() {
	// 	QUERY TO GET A PROJECT BY ID
	const params = useParams();
	const projectId = params.projectId!;
	const { data: projectData, isLoading } = useQuery({
		queryKey: ['project', projectId],
		queryFn: () => getProjectById(projectId),
		retry: false,
	});

	if (isLoading) return <Loading />;
	if (projectData)
		return (
			<>
				<div className='px-4'>
					<h1 className='text-center text-2xl font-bold text-primary md:text-3xl'>
						Editar proyecto
					</h1>
					<p className='text-balance text-center'>
						En esta página podrás editar los detalles del proyecto.
					</p>
				</div>

				<div className='mt-8 flex w-full  justify-center'>
					<ProjectForm
						data={projectData}
						projectId={projectId}
					/>
				</div>
			</>
		);
}
export default ProjectEditPage;
