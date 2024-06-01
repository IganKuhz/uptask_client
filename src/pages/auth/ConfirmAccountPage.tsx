import { confirmAccount } from '@/api/AuthApi';
import { TokenValidation } from '@/types/index';
import InputIcon from '@/ui/InputIcon';
import { useMutation } from '@tanstack/react-query';
import { KeySquare } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

function ConfirmAccountPage() {
	const navigate = useNavigate();
	const initialValues: TokenValidation = {
		token: '',
	};

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<TokenValidation>({
		defaultValues: initialValues,
	});

	const { mutate: confirmAccountFn, isPending } = useMutation({
		mutationFn: confirmAccount,
		onError: error => {
			toast.error(error.message);
		},
		onSuccess: data => {
			toast.success(data);
			reset();
		},
	});

	function handleSubmitToken(formData: TokenValidation) {
		confirmAccountFn(formData, {
			onSuccess: () => {
				navigate('/auth/login');
			},
		});
	}

	return (
		<div className='hero-content flex-col'>
			<div className='w-full max-w-md text-center lg:max-w-xl'>
				<h1 className='text-xl font-bold text-primary md:text-3xl'>
					Confirmar cuenta de usuario
				</h1>
				<p className='text-balance py-6 text-sm md:text-base'>
					Ingresa el&nbsp;
					<span className='font-bold text-secondary'>
						código de confirmación
					</span>
					&nbsp;que te enviamos a tu correo electrónico:
				</p>
			</div>

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
						placeholder='Código de confirmación'
						register={register}
						disabled={isPending}
						rules={{
							required: 'El código es requerido',
						}}
						errors={errors.token}
					/>
				</form>
			</div>

			<label className='label label-text-alt justify-center'>
				<Link
					to='/auth/request-token'
					className='link-hover link label-text-alt link-primary'
				>
					Solicitar un código nuevo
				</Link>
			</label>
		</div>
	);
}
export default ConfirmAccountPage;
