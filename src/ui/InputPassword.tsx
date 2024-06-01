import { Eye, EyeOff } from 'lucide-react';
import {
	useState,
	type ComponentPropsWithoutRef,
	type HTMLInputTypeAttribute,
} from 'react';
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
	rules?: RegisterOptions;
	errors?: FieldError;
	register: UseFormRegister<T>;
} & ComponentPropsWithoutRef<'input'>;

function InputPassword<T extends FieldValues>({
	name,
	type,
	title,
	register,
	rules,
	errors,
	...props
}: InputProps<T>) {
	const [togglePass, setTogglePass] = useState(false);

	const togglePassword = () => {
		setTogglePass(togglePass => !togglePass);

		setTimeout(() => {
			setTogglePass(togglePass => !togglePass);
		}, 2000);
	};

	return (
		<div className='form-control'>
			<div className='md:mb-3'>
				<label
					htmlFor={name}
					className='label'
				>
					<span className='label-text'>{title}</span>
				</label>
				<div className='relative  flex items-center'>
					<input
						type={togglePass ? 'text' : `${type}`}
						id={name}
						{...(register && register(name, rules))}
						{...props}
						className={`input input-sm input-bordered w-full transition-all focus:input-primary ${errors && 'input-error focus:input-error '} md:input-md placeholder:font-medium placeholder:italic`}
					/>
					<div className='absolute right-3 rounded bg-base-100 p-1 text-base-content transition-all hover:cursor-pointer hover:text-primary'>
						{!togglePass ? (
							<Eye
								size={18}
								onClick={togglePassword}
							/>
						) : (
							<EyeOff
								size={18}
								onClick={togglePassword}
							/>
						)}
					</div>
				</div>

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
export default InputPassword;
