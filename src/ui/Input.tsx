import type { ComponentPropsWithoutRef, HTMLInputTypeAttribute } from 'react';
import type {
	FieldError,
	FieldValues,
	Path,
	RegisterOptions,
	UseFormRegister,
} from 'react-hook-form';

type InputProps<T extends FieldValues> = {
	type: HTMLInputTypeAttribute;
	title: string;
	placeholder?: string;
	name: Path<T>;
	rules?: RegisterOptions<T, Path<T>> | undefined;
	errors?: FieldError;
	register: UseFormRegister<T>;
} & ComponentPropsWithoutRef<'input'>;

function Input<T extends FieldValues>({
	name,
	type,
	title,
	register,
	rules,
	errors,
	...props
}: InputProps<T>) {
	return (
		<div className='form-control'>
			<div className='md:mb-3'>
				<label
					htmlFor={name}
					className='label'
				>
					<span className='label-text'>{title}</span>
				</label>
				<input
					type={type}
					id={name}
					{...(register && register(name, rules))}
					{...props}
					className={`input input-sm input-bordered w-full transition-all focus:input-primary ${errors && 'input-error focus:input-error'} md:input-md placeholder:font-medium placeholder:italic`}
				/>

				{/* Handle errors */}
				{errors && (
					<span className='ml-1 mt-1 animate-fade-down text-xs font-semibold tracking-wide text-red-500'>
						{errors?.message}
					</span>
				)}
			</div>
		</div>
	);
}
export default Input;
