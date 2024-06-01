import { resetPassword } from '@/api/AuthApi';
import { UserRequestToken as UserResetPassword } from '@/types/index';
import InputIcon from '@/ui/InputIcon';
import { useMutation } from '@tanstack/react-query';
import { ArrowLeft, CheckCircle, Mail } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';

function ResetPasswordPage() {
	const [sendToken, setSendToken] = useState(false);

	const initialValues: UserResetPassword = {
		email: '',
	};

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<UserResetPassword>({
		defaultValues: initialValues,
	});

	const { mutate: resetPasswordFn, isPending } = useMutation({
		mutationFn: resetPassword,
		onError: error => {
			toast.error(error.message);
		},
		onSuccess: data => {
			toast.success(data);
			reset();
			setSendToken(true);
		},
	});

	function handleResetPassword(formData: UserResetPassword) {
		// resetPasswordFn(formData, {
		// 	onSuccess: () => {
		// 		navigate('/auth/new-password');
		// 	},
		// });
		resetPasswordFn(formData);
	}

	return (
		<div className='hero-content flex-col'>
			<div className='w-full max-w-md text-center lg:max-w-xl'>
				<h1 className='text-xl font-bold text-primary md:text-3xl'>
					¿Olvidaste tu contraseña?
				</h1>
				{!sendToken && (
					<p className='text-balance py-6 text-sm md:text-base'>
						Ingresa el&nbsp;
						<span className='font-bold text-secondary'>correo electrónico</span>
						&nbsp;con el que te registrarte para comenzar restablecer tu
						contraseña:
					</p>
				)}
			</div>

			{!sendToken ? (
				<div className='card w-full max-w-lg shrink-0 bg-base-100 shadow-md'>
					<form
						className='card-body'
						onSubmit={handleSubmit(handleResetPassword)}
						noValidate
					>
						<InputIcon
							icon={<Mail size={20} />}
							name='email'
							type='email'
							placeholder='Correo electrónico'
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
					</form>
				</div>
			) : (
				<div className='card w-full max-w-lg shrink-0 bg-base-100 shadow-md'>
					<div className='card-body'>
						<h2 className='card-title text-secondary'>
							<CheckCircle size={20} />
							Correo electrónico enviado
						</h2>
						<p className='text-balance py-6 text-sm md:text-base'>
							Te hemos enviado un correo electrónico, sigue las instrucciones
							para restablecer tu contraseña.
							<br />
							<br /> Si no lo encuentras, comprueba la carpeta de correo no
							deseado y/o la papelera.
						</p>
						<div className='card-actions mt-2 justify-end'>
							<Link
								to='/auth/login'
								className='btn btn-ghost btn-sm w-24 md:btn-md md:rounded-md'
							>
								<div className='flex place-items-center'>
									<ArrowLeft size={20} />
									Regresar
								</div>
							</Link>
						</div>
					</div>
				</div>
			)}

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
				<label className='label label-text-alt justify-center py-0.5'>
					<span>¿No tienes una cuenta? &nbsp; </span>
					<Link
						to='/auth/register'
						className='link-hover link label-text-alt link-primary'
					>
						Regístrate
					</Link>
				</label>
			</div>
		</div>
	);
}
export default ResetPasswordPage;
