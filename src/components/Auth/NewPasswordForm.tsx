import { newPassword } from '@/api/AuthApi';
import { TokenValidation, UserNewPasswordForm } from '@/types/index';
import InputPassword from '@/ui/InputPassword';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

type NewPasswordFormProps = {
	token: TokenValidation['token'];
};

function NewPasswordForm({ token }: NewPasswordFormProps) {
	const navigate = useNavigate();
	const initialValues: UserNewPasswordForm = {
		password: '',
		confirmPassword: '',
	};

	const {
		register,
		handleSubmit,
		reset,
		watch,
		formState: { errors },
	} = useForm<UserNewPasswordForm>({
		defaultValues: initialValues,
	});

	const { mutate: newPasswordFn, isPending } = useMutation({
		mutationFn: newPassword,
		onError: error => {
			toast.error(error.message);
		},
		onSuccess: data => {
			toast.success(data);
			reset();
			navigate('/auth/login');
		},
	});

	function onSubmitNewPassword(formData: UserNewPasswordForm) {
		newPasswordFn({ formData, token });
	}

	const password = watch('password');

	return (
		<div className='card w-96 max-w-md shrink-0 bg-base-100 shadow-md'>
			<form
				className='card-body'
				onSubmit={handleSubmit(onSubmitNewPassword)}
			>
				<InputPassword
					type='password'
					title='Nueva contraseña'
					placeholder='Ingrese la nueva contraseña'
					name='password'
					register={register}
					disabled={isPending}
					rules={{
						required: 'La contraseña es requerida',
						minLength: {
							value: 8,
							message: 'La contraseña debe tener al menos 8 caracteres.',
						},
					}}
					errors={errors.password}
				/>

				<InputPassword
					type='password'
					title='Confirmar la nueva contraseña'
					placeholder='Repita la nueva contraseña'
					name='confirmPassword'
					register={register}
					disabled={isPending}
					rules={{
						required: 'La confirmación de la contraseña es requerida',
						validate: {
							value: value =>
								value === password || 'Las contraseñas no coinciden',
						},
					}}
					errors={errors.confirmPassword}
				/>

				<div className='form-control mt-2'>
					<button
						className='btn btn-primary btn-sm md:btn-md md:rounded-md'
						disabled={isPending}
					>
						Actualizar contraseña
					</button>
				</div>

				<div className='mt-2'>
					<label className='label label-text-alt justify-center py-0.5'>
						<span>¿Ya tienes una cuenta? &nbsp;</span>
						<Link
							to='/auth/login'
							className='link-hover link label-text-alt  link-primary'
						>
							Inicia sesión
						</Link>
					</label>
					<label className='label justify-center py-0.5'>
						<Link
							to='/auth/reset-password'
							className='link-hover link label-text-alt link-primary'
						>
							¿Olvidaste tu contraseña?
						</Link>
					</label>
				</div>
			</form>
		</div>
	);
}
export default NewPasswordForm;
