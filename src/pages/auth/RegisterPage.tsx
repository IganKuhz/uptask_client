import { createAccount } from '@/api/AuthApi';
import { UserRegisterFormData } from '@/types/index';
import Input from '@/ui/Input';
import InputPassword from '@/ui/InputPassword';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

function RegisterPage() {
	const navigate = useNavigate();
	const initialValues: UserRegisterFormData = {
		userName: '',
		email: '',
		password: '',
		confirmPassword: '',
	};

	const {
		register,
		handleSubmit,
		reset,
		watch,
		formState: { errors },
	} = useForm<UserRegisterFormData>({
		defaultValues: initialValues,
	});

	const { mutate: createAccountFn, isPending } = useMutation({
		mutationFn: createAccount,
		onError: error => {
			toast.error(error.message);
		},
		onSuccess: data => {
			toast.success(data);
			reset();
		},
	});

	const password = watch('password');

	function onSubmitLogin(formData: UserRegisterFormData) {
		createAccountFn(formData);
		navigate('/auth/login');
	}

	return (
		<div className='hero-content flex-col lg:flex-row-reverse'>
			<div className='w-full max-w-md text-center lg:max-w-2xl lg:text-left'>
				<h1 className='text-xl font-bold text-primary md:text-3xl'>
					Crea tu cuenta
				</h1>
				<p className='hidden text-balance py-6 text-sm md:block md:text-base'>
					{' '}
					Llena el formulario y comienza a disfrutar de todas las
					funcionalidades que tenemos para ti.
				</p>
			</div>

			<div className='card w-full max-w-md shrink-0 bg-base-100 shadow-md transition-all'>
				<form
					className='card-body'
					onSubmit={handleSubmit(onSubmitLogin)}
					noValidate
				>
					<Input
						type='text'
						title='Nombre'
						name='userName'
						placeholder='Ingrese su nombre'
						register={register}
						disabled={isPending}
						rules={{ required: 'El nombre es requerido' }}
						errors={errors.userName}
					/>

					<Input
						type='email'
						title='Correo'
						placeholder='Ingrese su correo'
						name='email'
						register={register}
						disabled={isPending}
						rules={{
							required: 'El email es requerido',
							pattern: {
								value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
								message: 'El email no es válido',
							},
						}}
						errors={errors.email}
					/>

					<InputPassword
						type='password'
						title='Contraseña'
						placeholder='Ingrese una contraseña'
						name='password'
						register={register}
						disabled={isPending}
						rules={{ required: 'La contraseña es requerida' }}
						errors={errors.password}
					/>

					<InputPassword
						type='password'
						title='Confirmar contraseña'
						placeholder='Repita la contraseña'
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
							className='btn btn-primary btn-sm rounded md:btn-md md:rounded-md'
							disabled={isPending}
						>
							Registrar
						</button>
					</div>

					<div className='mt-2'>
						<label className='label label-text-alt justify-center py-0.5'>
							<span>¿Ya tienes una cuenta? &nbsp;</span>
							<Link
								to='/auth/login'
								className='link-hover link label-text-alt link-primary'
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
		</div>
	);
}
export default RegisterPage;
