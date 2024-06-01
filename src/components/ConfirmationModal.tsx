import { checkPassword } from '@/api/AuthApi';
import { deleteProject } from '@/api/ProjectApi';
import InputPassword from '@/ui/InputPassword';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { CheckPassword } from '../types';

type ConfirmationModalProps = {
	title: string;
	message: string;
	closeModal: () => void;
};

function ConfirmationModal({
	title,
	message,
	closeModal,
}: ConfirmationModalProps) {
	const initialValues: CheckPassword = {
		password: '',
	};
	const location = useLocation();
	const navigate = useNavigate();

	const params = new URLSearchParams(location.search);
	const projectId = params.get('deleteProject')!;

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<CheckPassword>({
		defaultValues: initialValues,
	});

	const queryClient = useQueryClient();

	// Mutation to onfirm password
	const { mutateAsync: checkPasswordFn, isPending } = useMutation({
		mutationFn: checkPassword,
		onError: error => {
			toast.error(error.message);
		},
	});

	// Mutation to onfirm password
	const { mutateAsync: deleteProjectFn, isPending: isDeleting } = useMutation({
		mutationFn: deleteProject,
		onError: error => {
			toast.error(error.message);
		},
		onSuccess: data => {
			toast.success(data);
			queryClient.invalidateQueries({ queryKey: ['projects'] });
			closeModal();
		},
	});

	async function handleConfirm(formData: CheckPassword) {
		await checkPasswordFn(formData);
		await deleteProjectFn(projectId);
		reset();
	}

	return (
		<>
			<form method='dialog'>
				{/* if there is a button in form, it will close the modal */}
				<button
					className='btn btn-circle btn-ghost btn-sm absolute right-3 top-3'
					onClick={() => {
						navigate(location.pathname, { replace: true });
					}}
				>
					✕
				</button>
			</form>

			<h3 className='text-lg font-bold text-error md:text-xl'>{title}</h3>
			<p className='p-4'>{message}</p>

			<form
				className='max-h-screen overflow-y-auto px-4'
				onSubmit={handleSubmit(handleConfirm)}
				noValidate
			>
				<InputPassword
					title=''
					type='password'
					placeholder='Ingrese su contraseña'
					name='password'
					register={register}
					disabled={isPending || isDeleting}
					rules={{ required: 'La contraseña es requerida' }}
					errors={errors.password}
				/>

				<div className='mt-2 flex justify-end space-x-4'>
					{/* <button
						disabled={isPending || isDeleting}
						type='reset'
						className='btn btn-outline btn-error btn-sm rounded md:btn-md md:rounded-md'
						onClick={() => reset()}
					>
						Limpiar
					</button> */}
					<button
						disabled={isPending || isDeleting}
						className='btn btn-primary btn-sm rounded md:btn-md md:rounded-md'
					>
						Confirmar
					</button>
				</div>
			</form>
		</>
	);
}

export default ConfirmationModal;
