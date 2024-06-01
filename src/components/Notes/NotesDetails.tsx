import { deleteNote } from '@/api/NoteApi';
import { useAuth } from '@/hooks/useAuth';
import { Note } from '@/types/index';
import { formatDate } from '@/utils/index';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useMemo } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { toast } from 'sonner';
import Loading from '../Loading';

type NotesDetailsProps = {
	note: Note;
};

function NotesDetails({ note }: NotesDetailsProps) {
	const { data, isLoading } = useAuth();
	const hasAuth = useMemo(() => data?._id === note.createdBy._id, [data]);

	const params = useParams();
	const location = useLocation();
	const queryParams = new URLSearchParams(location.search);
	const projectId = params.projectId!;
	const taskId = queryParams.get('viewTask')!;

	const queryClient = useQueryClient();
	const { mutate } = useMutation({
		mutationFn: deleteNote,
		onError: error => {
			toast.error(error.message);
		},
		onSuccess: data => {
			toast.success(data);
			queryClient.invalidateQueries({ queryKey: ['task', taskId] });
		},
	});

	function handleDeleteNote() {
		mutate({ projectId, taskId, noteId: note._id });
	}

	if (isLoading) return <Loading />;
	return (
		<>
			<div className='flex justify-between'>
				<p className='font-semibold text-secondary'>
					{note.createdBy.userName}
					<span className='font-normal text-base-content'>
						&nbsp;el {formatDate(note.createdAt)}
					</span>
				</p>
				{hasAuth && (
					<button
						type='button'
						className='link link-error inline-flex self-end text-xs'
						onClick={handleDeleteNote}
					>
						Borrar
					</button>
				)}
			</div>
			<q className='italic text-base-content'>{note.content}</q>
		</>
	);
}
export default NotesDetails;
