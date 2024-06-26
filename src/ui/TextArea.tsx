import {
	useEffect,
	useImperativeHandle,
	useRef,
	type ComponentPropsWithoutRef,
} from 'react';
import type {
	FieldError,
	FieldValues,
	Path,
	RegisterOptions,
	UseFormRegister,
} from 'react-hook-form';

type TextAreaProps<T extends FieldValues> = {
	title: string;
	placeholder?: string;
	name: Path<T>;
	rules?: RegisterOptions<T, Path<T>> | undefined;
	errors?: FieldError;
	register: UseFormRegister<T>;
} & ComponentPropsWithoutRef<'textarea'>;

function TextArea<T extends FieldValues>({
	name,
	title,
	register,
	rules,
	errors,
	...props
}: TextAreaProps<T>) {
	const descRef = useRef<HTMLTextAreaElement>(null);
	const { ref } = register(name);

	useEffect(() => {
		if (descRef.current && descRef.current?.scrollHeight) {
			const height = descRef.current?.scrollHeight;
			descRef.current.style.height = `${height}px`;
		}
		return () => {};
	}, [descRef.current?.scrollHeight]);

	useImperativeHandle(ref, () => descRef.current);

	return (
		<div className='form-control'>
			<div className='mb-3'>
				<label
					htmlFor={name}
					className='label'
				>
					<span className='label-text'>{title}</span>
				</label>
				<textarea
					id={name}
					{...(register && register(name, rules))}
					ref={descRef}
					onChange={e => {
						e.target.style.height = 'inherit';
						e.target.style.height = `${e.target.scrollHeight}px`;
					}}
					{...props}
					className={`textarea textarea-bordered textarea-sm w-full transition-all focus:textarea-primary md:textarea-md placeholder:font-light placeholder:italic ${errors && 'textarea-error focus:textarea-error'}`}
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
export default TextArea;
