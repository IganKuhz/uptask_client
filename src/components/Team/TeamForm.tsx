import { findUserByEmail } from '@/api/TeamApi';
import { TeamMemberFormData } from '@/types/index';
import InputIcon from '@/ui/InputIcon';
import { useMutation } from '@tanstack/react-query';
import { Mail } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import Loading from '../Loading';
import TeamSearchResult from './TeamSearchResult';

type TaskFormProps = {
	closeModal: () => void;
};

function TeamForm({ closeModal }: TaskFormProps) {
	const initialValues: TeamMemberFormData = {
		email: '',
	};

	const navigate = useNavigate();
	const params = useParams();
	const projectId = params.projectId!;

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<TeamMemberFormData>({
		defaultValues: initialValues,
	});

	const mutation = useMutation({
		mutationFn: findUserByEmail,
	});

	function onSubmitTeamMember(formData: TeamMemberFormData) {
		const data = { formData, projectId };
		mutation.mutate(data);
	}

	function resetDataForm() {
		mutation.reset();
	}

	function handleCloseModal() {
		closeModal();
		reset();
		navigate(location.pathname, { replace: true });
	}

	return (
		<>
			<form method='dialog'>
				{/* if there is a button in form, it will close the modal */}
				<button
					className='btn btn-circle btn-ghost btn-sm absolute right-3 top-3'
					onClick={handleCloseModal}
				>
					✕
				</button>
			</form>
			<h3 className='px-4 text-center text-xl font-bold uppercase text-primary md:text-2xl'>
				{/* {task ? 'Editar tarea' : 'Crear tarea'} */}
				Agregar miembro
			</h3>
			<p className='p-4'>
				Ingresa el&nbsp;
				<span className='font-bold text-secondary'>correo electrónico</span>
				&nbsp;del usuario que deseas agregar al equipo:
			</p>

			<form
				className='max-h-screen overflow-y-auto p-3'
				onSubmit={handleSubmit(onSubmitTeamMember)}
				noValidate
			>
				<InputIcon
					icon={<Mail size={20} />}
					name='email'
					type='email'
					placeholder='Correo electrónico'
					register={register}
					disabled={mutation.isPending}
					rules={{
						required: 'El email es requerido',
						pattern: {
							value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
							message: 'El email no es válido',
						},
					}}
					errors={errors.email}
				/>
			</form>
			<div className='container mt-4 px-3'>
				{mutation.isPending && <Loading />}
				{mutation.error && (
					<p className='text-center text-sm text-error'>
						{mutation.error.message}
					</p>
				)}

				{mutation.data && (
					<TeamSearchResult
						searchData={mutation.data}
						resetData={resetDataForm}
					/>
				)}
			</div>
		</>
	);
}
export default TeamForm;
