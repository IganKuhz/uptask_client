import { Task } from '@/types/index';
import { Notebook } from 'lucide-react';
import { useState } from 'react';
import NotesDetails from './NotesDetails';
import NotesForm from './NotesForm';

type NotesPanelProps = {
	notes: Task['notes'];
	collapsed: boolean;
	setCollapsed: (value: boolean) => void;
};

function NotesPanel({ notes, collapsed, setCollapsed }: NotesPanelProps) {
	const [showForm, setShowForm] = useState(false);

	return (
		<>
			<div className='collapse collapse-plus rounded-lg bg-base-200 text-xs shadow-inner'>
				<input
					type='radio'
					name='notePanel'
					checked={collapsed}
					readOnly
					onClick={() => setCollapsed(!collapsed)}
				/>
				<div className='collapse-title font-semibold'>Historial de notas:</div>

				<div className='collapse-content max-h-max overflow-y-scroll transition-all'>
					<ul className='list-decimal'>
						{!notes.length ? (
							<p className='flex flex-col place-items-center'>
								<Notebook
									size={18}
									className='mb-2 text-base-content'
								/>
								No se han agredado notas.
							</p>
						) : (
							notes.map(note => (
								<li
									key={note._id}
									className='mt-1'
								>
									<NotesDetails note={note} />
								</li>
							))
						)}
					</ul>

					{!showForm && (
						<p
							className='link link-primary text-center'
							onClick={() => setShowForm(showForm => !showForm)}
						>
							Agregar nota
						</p>
					)}
					{showForm && <NotesForm />}
				</div>
			</div>
		</>
	);
}
export default NotesPanel;
