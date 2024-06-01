import { requestToken } from '@/api/AuthApi';
import { UserRequestToken } from '@/types/index';
import InputIcon from '@/ui/InputIcon';
import { useMutation } from '@tanstack/react-query';
import { Mail } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

function RequestTokenPage() {
	const navigate = useNavigate();
	const initialValues: UserRequestToken = {
		email: '',
	};

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<UserRequestToken>({
		defaultValues: initialValues,
	});

	const { mutate: requestTokenFn, isPending } = useMutation({
		mutationFn: requestToken,
		onError: error => {
			toast.error(error.message);
		},
		onSuccess: data => {
			toast.success(data);
			reset();
		},
	});

	function handleRequestToken(formData: UserRequestToken) {
		requestTokenFn(formData, {
			onSuccess: () => {
				navigate('/auth/confirm');
			},
		});
	}

	return (
		<div className='hero-content flex-col'>
			<div className='w-full max-w-md text-center lg:max-w-xl'>
				<h1 className='text-xl font-bold text-primary md:text-3xl'>
					Solicitar código de confirmación
				</h1>
				<p className='text-balance py-6 text-sm md:text-base'>
					Ingresa el&nbsp;
					<span className='font-bold text-secondary'>correo electrónico</span>
					&nbsp;con el que te registrarte para solicitar un código de
					confirmación:
				</p>
			</div>

			<div className='card w-full max-w-lg shrink-0 bg-base-100 shadow-md'>
				<form
					className='card-body'
					onSubmit={handleSubmit(handleRequestToken)}
					noValidate
				>
					<InputIcon
						icon={<Mail size={18} />}
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
		</div>
	);
}
export default RequestTokenPage;
