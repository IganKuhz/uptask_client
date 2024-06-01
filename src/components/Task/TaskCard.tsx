import { useDeleteTask } from '@/hooks/useDeleteTask';
import { TaskProject } from '@/types/index';
import { useDraggable } from '@dnd-kit/core';
import { useQueryClient } from '@tanstack/react-query';
import {
	Copy,
	EllipsisVerticalIcon,
	ListChecks,
	PencilLineIcon,
	Trash,
} from 'lucide-react';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';

type TaskCardProps = {
	task: TaskProject;
	hasAuth: boolean;
	onEditTask: (taskId: string) => void;
	onViewTask: (taskId: string) => void;
};

function TaskCard({ task, onEditTask, onViewTask, hasAuth }: TaskCardProps) {
	const { attributes, listeners, setNodeRef, transform } = useDraggable({
		id: task._id,
	});

	const params = useParams();
	const projectId = params.projectId!;
	const taskId = task._id;

	const queryClient = useQueryClient();
	const { deleteTaskFn } = useDeleteTask();

	function handleDeleteTask() {
		deleteTaskFn(
			{ projectId, taskId: task._id },
			{
				onSuccess: () => {
					queryClient.invalidateQueries({ queryKey: ['project', projectId] });
					queryClient.invalidateQueries({ queryKey: ['task', taskId] });
				},
			},
		);
	}

	const style = transform
		? {
				transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
			}
		: undefined;

	return (
		<li
			className='h-48 w-full touch-none rounded-2xl bg-yellow-200 p-6 shadow-md  transition-all hover:scale-105 focus:z-10 focus:cursor-move md:w-60'
			{...listeners}
			{...attributes}
			ref={setNodeRef}
			style={style}
		>
			<div className='relative'>
				<h2 className='text-lg font-semibold text-gray-800'>{task.taskName}</h2>

				{hasAuth && (
					<div className='dropdown dropdown-left absolute -right-4 -top-4'>
						<div
							tabIndex={0}
							role='button'
							className='btn btn-square btn-sm m-1 border-0 bg-yellow-300 text-gray-800 hover:bg-yellow-400'
						>
							<EllipsisVerticalIcon size={20} />
						</div>

						<ul
							tabIndex={0}
							className='menu dropdown-content z-[1] w-52 space-y-1 rounded-box bg-yellow-200/70 text-gray-800 shadow-lg backdrop-blur-sm'
						>
							<li className='rounded-lg hover:bg-yellow-400/40'>
								<button onClick={() => onViewTask(task._id)}>
									<ListChecks
										size={20}
										className='text-green-500'
									/>
									<span>Ver detalles</span>
								</button>
							</li>
							<li className='rounded-lg hover:bg-yellow-400/40'>
								<button onClick={() => onEditTask(task._id)}>
									<PencilLineIcon
										size={20}
										className='text-sky-500'
									/>
									<span>Editar tarea</span>
								</button>
							</li>
							<li>
								<button
									onClick={() => {
										toast.error('Esta accion aun no esta disponible', {
											duration: 3000,
										});
									}}
								>
									<Copy
										size={20}
										className='text-lime-500'
									/>
									<span>Duplicar tarea</span>
								</button>
							</li>
							<li className='rounded-lg hover:bg-yellow-400/40'>
								<button onClick={handleDeleteTask}>
									<Trash
										size={20}
										className='text-red-500'
									/>
									<span>Eliminar tarea</span>
								</button>
							</li>
						</ul>
					</div>
				)}

				<p className='mt-4 line-clamp-4 min-h-16 text-ellipsis text-sm text-gray-600 antialiased'>
					{task.description}
				</p>
			</div>

			{/* <div className='flex items-center justify-between'>
				<div className='mt-4 flex flex-col items-center space-x-4'>
					<div className='text-sm font-semibold text-slate-600'>
						John Lucas • <span className='font-normal'> 5 minutes ago</span>
					</div>
				</div>
			</div> */}
		</li>
	);
}
export default TaskCard;
