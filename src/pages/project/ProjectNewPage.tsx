import ProjectForm from '@/components/Project/ProjectForm';

function ProjectNewPage() {
	return (
		<>
			<div className='px-4'>
				<h1 className='text-center text-2xl font-bold text-primary md:text-3xl'>
					Crear proyecto
				</h1>
				<p className='text-balance text-center'>
					En esta página podrás crear un nuevo proyecto.
				</p>
			</div>

			<div className='mt-8 flex w-full justify-center'>
				<ProjectForm />
			</div>
		</>
	);
}
export default ProjectNewPage;
