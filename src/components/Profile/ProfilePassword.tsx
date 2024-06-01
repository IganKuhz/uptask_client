import { updateProfilePassword } from '@/api/ProfileApi';
import { UserProfilePasswordForm } from '@/types/index';
import Input from '@/ui/Input';
import InputPassword from '@/ui/InputPassword';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

function ProfilePassword() {
	const initialValues: UserProfilePasswordForm = {
		currPassword: '',
		password: '',
		confirmPassword: '',
	};

	const {
		register,
		handleSubmit,
		watch,
		reset,
		formState: { errors },
	} = useForm<UserProfilePasswordForm>({
		defaultValues: initialValues,
	});

	const { mutate, isPending } = useMutation({
		mutationFn: updateProfilePassword,
		onError: error => {
			toast.error(error.message);
		},
		onSuccess: data => {
			toast.success(data);
		},
	});

	const password = watch('password');

	function handleEditProfile(formData: UserProfilePasswordForm) {
		mutate(formData);
		reset();
	}
	return (
		<>
			<div className='card my-8 w-5/6 max-w-md shrink-0 bg-base-100 shadow-md transition-all '>
				<form
					className='card-body'
					onSubmit={handleSubmit(handleEditProfile)}
					noValidate
				>
					<Input
						type='password'
						title='Contraseña actual'
						name='currPassword'
						placeholder='Ingrese una contraseña'
						register={register}
						disabled={isPending}
						rules={{ required: 'La contraseña es requerida' }}
						errors={errors.currPassword}
					/>

					<InputPassword
						type='password'
						title='Nueva contraseña'
						name='password'
						placeholder='Ingrese una contraseña'
						register={register}
						disabled={isPending}
						rules={{ required: 'La contraseña es requerida' }}
						errors={errors.password}
					/>

					<InputPassword
						type='password'
						title='Confirmar nueva contraseña'
						name='confirmPassword'
						placeholder='Ingrese una contraseña'
						disabled={isPending}
						register={register}
						rules={{
							required: 'La confirmación de la contraseña es requerida',
							validate: {
								value: value =>
									value === password || 'Las contraseñas no coinciden',
							},
						}}
						errors={errors.confirmPassword}
					/>

					<div className='mt-2 flex justify-end gap-4'>
						<button
							disabled={isPending}
							className='btn btn-primary btn-sm rounded md:btn-md'
						>
							Actualizar datos
						</button>
					</div>
				</form>
			</div>
		</>
	);
}

export default ProfilePassword;
