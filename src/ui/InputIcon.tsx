import type {
	ComponentPropsWithoutRef,
	HTMLInputTypeAttribute,
	ReactNode,
} from 'react';
import type {
	FieldError,
	FieldValues,
	Path,
	RegisterOptions,
	UseFormRegister,
} from 'react-hook-form';

type InputIconProps<T extends FieldValues> = {
	icon: ReactNode;
	type: HTMLInputTypeAttribute;
	name: Path<T>;
	rules?: RegisterOptions<T, Path<T>> | undefined;
	errors?: FieldError;
	register: UseFormRegister<T>;
} & ComponentPropsWithoutRef<'input'>;

function InputIcon<T extends FieldValues>({
	icon,
	name,
	type,
	register,
	rules,
	errors,
	...props
}: InputIconProps<T>) {
	return (
		<div className='form-control w-full'>
			<div className='join'>
				<div className='relative flex w-full items-center'>
					<input
						type={type}
						id={name}
						{...(register && register(name, rules))}
						{...props}
						className={`input input-sm join-item input-bordered w-full text-center transition-all focus:input-primary ${errors && 'input-error focus:input-error'} transition-all md:input-md placeholder:font-medium placeholder:italic`}
					/>
					<div className='absolute left-3 rounded bg-base-100 p-1 text-base-content'>
						{icon}
					</div>
				</div>
				<input
					type='submit'
					value={errors ? 'Error' : 'Enviar'}
					className={`btn join-item btn-sm w-24 rounded md:btn-md md:rounded-md ${errors ? 'btn-error' : 'btn-primary'}`}
				/>
			</div>

			{errors && (
				<span className='ml-1 mt-1 animate-fade-down text-xs font-semibold tracking-wide text-red-500'>
					{errors?.message}
				</span>
			)}
		</div>
	);
}
export default InputIcon;
