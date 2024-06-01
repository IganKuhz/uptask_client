import { updateProfile } from '@/api/ProfileApi';
import { User, UserProfileFormData } from '@/types/index';
import Input from '@/ui/Input';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

type ProfileFormProps = {
	data: User;
};

function ProfileForm({ data }: ProfileFormProps) {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<UserProfileFormData>({
		defaultValues: data,
	});

	const queryClient = useQueryClient();
	const { mutate, isPending } = useMutation({
		mutationFn: updateProfile,
		onError: error => {
			toast.error(error.message);
		},
		onSuccess: data => {
			toast.success(data);
			queryClient.invalidateQueries({ queryKey: ['user'] });
		},
	});

	function handleEditProfile(formData: UserProfileFormData) {
		mutate(formData);
	}

	return (
		<>
			<div className='card my-8 w-5/6 max-w-md shrink-0 bg-base-100 shadow-md transition-all'>
				<form
					className='card-body'
					onSubmit={handleSubmit(handleEditProfile)}
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
						disabled={data.email !== ''}
						rules={{
							required: 'El email es requerido',
							pattern: {
								value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
								message: 'El email no es válido',
							},
						}}
						errors={errors.email}
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

export default ProfileForm;
