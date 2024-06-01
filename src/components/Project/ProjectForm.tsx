import { useCreateProject } from '@/hooks/useCreateProject';
import { useEditProject } from '@/hooks/useEditProject';
import Input from '@/ui/Input';
import TextArea from '@/ui/TextArea';
import { useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Project, ProjectFormData } from 'types';

type ProjectFormProps = {
	data?: ProjectFormData | null;
	projectId?: Project['_id'];
};

function ProjectForm({ data, projectId }: ProjectFormProps) {
	const navigate = useNavigate();
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<ProjectFormData>({
		defaultValues: {
			projectName: data?.projectName || '',
			clientName: data?.clientName || '',
			description: data?.description || '',
		},
	});
	const queryClient = useQueryClient();

	const { createProjectFn, isCreatProj } = useCreateProject();
	const { editProjectFn, isEditProj } = useEditProject();

	// Check if the form is in progress
	const inProgress = isCreatProj || isEditProj;

	// Function to handle the form submission
	// Check if the form is in edit mode
	function onSubmitProject(formData: ProjectFormData) {
		if (projectId) {
			editProjectFn(
				{ formData, projectId },
				{
					onSuccess: () => {
						queryClient.invalidateQueries({ queryKey: ['projects'] });
						queryClient.invalidateQueries({ queryKey: ['project', projectId] });
						reset();
						navigate('/');
					},
				},
			);
			return;
		} else {
			createProjectFn(formData, {
				onSuccess: () => {
					reset();
					navigate('/');
				},
			});
		}
	}

	return (
		<div className='card w-5/6 max-w-xl shrink-0 bg-base-100 shadow-md transition-all'>
			<form
				className='card-body'
				onSubmit={handleSubmit(onSubmitProject)}
				noValidate
			>
				<Input
					title='Nombre del proyecto'
					name='projectName'
					type='text'
					register={register}
					disabled={inProgress}
					rules={{
						required: 'Este campo es obligatorio.',
						minLength: {
							value: 3,
							message: 'Mínimo 5 caracteres.',
						},
					}}
					errors={errors.projectName}
				/>
				<Input
					title='Nombre del cliente'
					name='clientName'
					type='text'
					register={register}
					disabled={inProgress}
					rules={{
						required: 'Este campo es obligatorio.',
						minLength: {
							value: 3,
							message: 'Mínimo 5 caracteres.',
						},
					}}
					errors={errors.clientName}
				/>
				<TextArea
					title='Descripción del proyecto'
					name='description'
					register={register}
					disabled={inProgress}
					rules={{
						required: 'Este campo es obligatorio.',
						minLength: {
							value: 5,
							message: 'Mínimo 10 caracteres.',
						},
					}}
					errors={errors.description}
				/>

				<div className='mt-2 flex justify-end space-x-4'>
					<button
						disabled={inProgress}
						type='reset'
						className='btn btn-outline btn-error btn-sm md:btn-md'
						onClick={() => reset()}
					>
						Limpiar
					</button>
					<button
						type='submit'
						disabled={inProgress}
						className='btn btn-primary btn-sm md:btn-md'
					>
						{projectId ? 'Guardar cambios' : 'Crear proyecto'}
					</button>
				</div>
			</form>
		</div>
	);
}
export default ProjectForm;
