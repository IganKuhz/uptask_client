import { TaskProject } from '@/types/index';
import { useDroppable } from '@dnd-kit/core';
import { PlusSquare } from 'lucide-react';
import TaskCard from './TaskCard';

type DropTaskProps = {
	status: string;
	tasks: TaskProject[];
	onEditTask?: (taskId: string) => void;
	onViewTask?: (taskId: string) => void;
	hasAuth?: boolean;
};

function DragNDrop({
	status,
	tasks,
	onEditTask,
	onViewTask,
	hasAuth,
}: DropTaskProps) {
	const { isOver, setNodeRef } = useDroppable({
		id: status,
	});

	return (
		<div
			ref={setNodeRef}
			className={`grid place-content-center rounded-lg p-4 ${isOver && 'border border-dashed border-base-content bg-base-300'}`}
		>
			<ul className='flex flex-grow flex-wrap place-content-center gap-4 2xl:flex-col'>
				{tasks.length === 0 ? (
					<li className='flex place-items-center text-sm 2xl:h-[calc(100vh-580px)]'>
						{isOver ? (
							<p className='flex flex-col items-center'>
								<PlusSquare size={20} />
								Soltar la tarea aquí
							</p>
						) : (
							<p className='self-start'>No hay tareas registradas.</p>
						)}
					</li>
				) : (
					tasks.map(task => (
						<TaskCard
							key={task._id}
							task={task}
							onEditTask={onEditTask!} // Add the '!' operator to assert that 'onEdit' is not undefined
							onViewTask={onViewTask!} // Add the '!' operator to assert that 'onView' is not undefined
							hasAuth={hasAuth!}
						/>
					))
				)}
			</ul>
		</div>
	);
}

export default DragNDrop;
