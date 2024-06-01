import { createNote } from '@/api/NoteApi';
import { NoteFormData } from '@/types/index';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect, useImperativeHandle, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation, useParams } from 'react-router-dom';
import { toast } from 'sonner';

function NotesForm() {
	const params = useParams();
	const location = useLocation();
	const queryParams = new URLSearchParams(location.search);

	const projectId = params.projectId!;
	const taskId = queryParams.get('viewTask')!;

	const initialValues: NoteFormData = {
		content: '',
	};

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<NoteFormData>({
		defaultValues: initialValues,
	});

	const noteRef = useRef<HTMLTextAreaElement>(null);
	const { ref } = register('content');

	useEffect(() => {
		if (noteRef.current && noteRef.current?.scrollHeight) {
			const height = noteRef.current?.scrollHeight;
			noteRef.current.style.height = `${height}px`;
		}
		return () => {};
	}, [noteRef.current?.scrollHeight]);

	useImperativeHandle(ref, () => noteRef.current);

	const queryClient = useQueryClient();

	const { mutate, isPending } = useMutation({
		mutationFn: createNote,
		onError: error => {
			toast.error(error.message);
		},
		onSuccess: data => {
			toast.success(data);
			queryClient.invalidateQueries({ queryKey: ['task', taskId] });
			reset();
		},
	});

	function handleAddNote(formData: NoteFormData) {
		mutate({ projectId, taskId, formData });
	}

	return (
		<form
			className='overflow-y-auto'
			onSubmit={handleSubmit(handleAddNote)}
			noValidate
		>
			<div className='form-control'>
				<div className='mb-3 px-1'>
					<label
						htmlFor='content'
						className='label'
					></label>

					<textarea
						id='content'
						rows={1}
						placeholder='Escribe una nota...'
						disabled={isPending}
						{...register('content', {
							required: 'La nota no puede estar vacía.',
							minLength: {
								value: 5,
								message: 'Mínimo 10 caracteres.',
							},
						})}
						ref={noteRef}
						onChange={e => {
							e.target.style.height = 'inherit';
							e.target.style.height = `${e.target.scrollHeight}px`;
						}}
						className='textarea textarea-bordered textarea-xs w-full  transition-all focus:textarea-primary placeholder:font-light placeholder:italic'
					/>

					{/* Handle errors */}
					{errors.content && (
						<span className='animate-fade-down text-xs font-semibold tracking-wide text-red-500'>
							{errors.content.message}
						</span>
					)}
				</div>
			</div>

			<div className='flex justify-end gap-4'>
				<button
					disabled={isPending}
					type='reset'
					className='btn btn-outline btn-error btn-xs rounded'
					onClick={() => reset()}
				>
					Limpiar
				</button>
				<button
					disabled={isPending}
					className='rounded- btn btn-primary btn-xs rounded'
				>
					Guardar nota
				</button>
			</div>
		</form>
	);
}
export default NotesForm;
