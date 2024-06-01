import { useCreateTask } from '@/hooks/useCreateTask';
import { useEditTask } from '@/hooks/useEditTask';
import Input from '@/ui/Input';
import TextArea from '@/ui/TextArea';
import { useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { TaskFormData } from '../../types';

type TaskFormProps = {
	task?: TaskFormData | null;
	closeModal: () => void;
};

function TaskForm({ task, closeModal }: TaskFormProps) {
	const navigate = useNavigate();
	const params = useParams();
	const projectId = params.projectId!;

	const location = useLocation();
	const queryParams = new URLSearchParams(location.search);
	const taskId = queryParams.get('editTask')!;

	const initialValues: TaskFormData = {
		taskName: task?.taskName || '',
		description: task?.description || '',
	};

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<TaskFormData>({
		defaultValues: initialValues,
	});

	const queryClient = useQueryClient();

	// Check if the form is in edit mode
	const editMode = !!taskId;
	// Mutation to create a task
	const { createTaskFn, isCreatingTask } = useCreateTask();
	// Mutation to edit a task
	const { editTaskFn, isEditingTask } = useEditTask();
	// Check if the form is in progress
	const inProgress = isCreatingTask || isEditingTask;

	// Function to handle the form submission
	function onSubmitTask(formData: TaskFormData) {
		if (editMode) {
			editTaskFn(
				{ projectId, taskId, formData },
				{
					onSuccess: () => {
						queryClient.invalidateQueries({ queryKey: ['project', projectId] });
						queryClient.invalidateQueries({ queryKey: ['task', taskId] });
						closeModal();
						navigate(location.pathname, { replace: true });
					},
				},
			);
			return;
		} else {
			createTaskFn(
				{
					formData,
					projectId,
				},
				{
					onSuccess: () => {
						queryClient.invalidateQueries({ queryKey: ['project', projectId] });
						queryClient.invalidateQueries({ queryKey: ['task', taskId] });
						reset();
						closeModal();
						navigate(location.pathname, { replace: true });
					},
				},
			);
		}
	}

	return (
		<>
			<form method='dialog'>
				{/* if there is a button in form, it will close the modal */}
				<button
					className='btn btn-circle btn-ghost btn-sm absolute right-3 top-3'
					onClick={() => {
						navigate(location.pathname, { replace: true });
						closeModal();
					}}
				>
					✕
				</button>
			</form>

			<h3 className='text-lg font-bold text-primary md:text-xl'>
				{task ? 'Editar tarea' : 'Crear tarea'}
			</h3>

			<form
				className='max-h-screen overflow-y-auto p-4'
				onSubmit={handleSubmit(onSubmitTask)}
				noValidate
			>
				<Input
					title='Nombre de la tarea'
					name='taskName'
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
					errors={errors.taskName}
				/>

				<TextArea
					title='Descripción de la tarea'
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
						className='btn btn-outline btn-error btn-sm rounded md:btn-md md:rounded-md'
						onClick={() => reset()}
					>
						Limpiar
					</button>
					<button
						disabled={inProgress}
						className='btn btn-primary btn-sm rounded md:btn-md md:rounded-md'
					>
						{task ? 'Guardar cambios' : 'Crear tarea'}
					</button>
				</div>
			</form>
		</>
	);
}
export default TaskForm;
