import { loginUser } from '@/api/AuthApi';
import { UserLoginFormData } from '@/types/index';
import Input from '@/ui/Input';
import InputPassword from '@/ui/InputPassword';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

function LoginPage() {
	const initialValues: UserLoginFormData = {
		email: '',
		password: '',
	};

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<UserLoginFormData>({
		defaultValues: initialValues,
	});
	const navigate = useNavigate();

	const { mutate: loginUserFn, isPending } = useMutation({
		mutationFn: loginUser,
		onError: error => {
			toast.error(error.message);
		},
		onSuccess: () => {
			navigate('/');
		},
	});

	function onSubmitLogin(formData: UserLoginFormData) {
		loginUserFn(formData);
	}

	return (
		<div className='hero-content flex-col lg:flex-row-reverse'>
			<div className='w-full max-w-md text-center lg:max-w-2xl lg:text-left'>
				<h1 className='text-xl font-bold text-primary md:text-3xl'>
					Bienvenido
				</h1>
				<p className='hidden text-balance py-6 text-sm md:block md:text-base'>
					UpTask es una aplicación para la gestión de tareas y proyectos. Puedes
					crear, editar y eliminar proyectos y tareas de forma sencilla.
				</p>

				<div className='pt-6'>
					<p className='font-semibold text-primary'>Datos de prueba:</p>
					<code className=' text-balance text-xs'>
						Correo: cosme@fulanito.com
						<br />
						Contraseña: #?A1s2D3F4.
					</code>
				</div>
			</div>

			<div className='card w-full max-w-md shrink-0 bg-base-100 shadow-md transition-all'>
				<form
					className='card-body'
					onSubmit={handleSubmit(onSubmitLogin)}
					noValidate
				>
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
						placeholder='Ingrese su contraseña'
						name='password'
						register={register}
						disabled={isPending}
						rules={{ required: 'La contraseña es requerida' }}
						errors={errors.password}
					/>

					<label className='label'>
						<Link
							to='/auth/reset-password'
							className='link-hover link label-text-alt link-primary'
						>
							¿Olvidaste tu contraseña?
						</Link>
					</label>

					<div className='form-control mt-2'>
						<button
							className='btn btn-primary btn-sm rounded md:btn-md md:rounded-md'
							disabled={isPending}
						>
							Iniciar sessión
						</button>
					</div>

					<label className='label label-text-alt justify-center'>
						<span>¿No tienes una cuenta? &nbsp; </span>
						<Link
							to='/auth/register'
							className='link-hover link label-text-alt link-primary'
						>
							Regístrate
						</Link>
					</label>
				</form>
			</div>
		</div>
	);
}
export default LoginPage;
