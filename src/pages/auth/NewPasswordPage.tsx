import { confirmResetPassword } from '@/api/AuthApi';
import NewPasswordForm from '@/components/Auth/NewPasswordForm';
import { TokenValidation } from '@/types/index';
import InputIcon from '@/ui/InputIcon';
import { useMutation } from '@tanstack/react-query';
import { KeySquare } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';

function NewPasswordPage() {
	const [isValidToken, setIsValidToken] = useState<boolean>(false);
	const [token, setToken] = useState<TokenValidation['token']>('');

	const initialValues: TokenValidation = {
		token,
	};

	const {
		register,
		handleSubmit,
		clearErrors,
		trigger,
		formState: { errors },
	} = useForm<TokenValidation>({
		defaultValues: initialValues,
	});

	const { mutate: confirmResetFn, isPending } = useMutation({
		mutationFn: confirmResetPassword,
		onError: error => {
			toast.error(error.message);
		},
		onSuccess: data => {
			toast.success(data);
			setIsValidToken(true);
		},
	});

	function handleSubmitToken(token: TokenValidation) {
		confirmResetFn(token);
	}

	return (
		<div className='hero-content flex-col'>
			<div className='w-full max-w-md text-center lg:max-w-xl'>
				<h1 className='text-xl font-bold text-primary md:text-3xl'>
					Restablecer contraseña
				</h1>
				<p className='text-balance py-6 text-sm md:text-base'>
					{!isValidToken ? (
						<>
							Ingresa el&nbsp;
							<span className='font-bold text-secondary'>
								código de restablecimiento
							</span>
							&nbsp;que te enviamos a tu correo electrónico:
						</>
					) : (
						<>
							Ingresa la&nbsp;
							<span className='font-bold text-secondary'>nueva contraseña</span>
							&nbsp;y confírmala:
						</>
					)}
				</p>
			</div>

			{!isValidToken ? (
				<div className='card w-full max-w-md shrink-0 bg-base-100 shadow-md'>
					<form
						className='card-body'
						onSubmit={handleSubmit(handleSubmitToken)}
						noValidate
					>
						<InputIcon
							icon={<KeySquare size={20} />}
							name='token'
							type='text'
							placeholder='Código de restablecimiento'
							register={register}
							disabled={isPending}
							rules={{
								required: 'El código es requerido',
								onChange: e => {
									clearErrors('token');
									trigger('token');
									setToken(e.target.value);
								},
							}}
							errors={errors.token}
						/>
					</form>
				</div>
			) : (
				<NewPasswordForm token={token} />
			)}

			<label className='label label-text-alt justify-center'>
				<Link
					to='/auth/reset-password'
					className='link-hover link label-text-alt link-primary'
				>
					Solicitar un código nuevo
				</Link>
			</label>
		</div>
	);
}
export default NewPasswordPage;
