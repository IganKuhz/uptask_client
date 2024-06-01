import { statusLocale, statusTextColor } from '@/constants/index';
import { useStatusTask } from '@/hooks/useStatusTask';
import { TaskProject, TaskStatus } from '@/types/index';
import {
	DndContext,
	DragEndEvent,
	MouseSensor,
	PointerSensor,
	TouchSensor,
	useSensor,
	useSensors,
} from '@dnd-kit/core';
import { useQueryClient } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { Project } from '../../types/index';
import DragNDrop from './DragNDrop';

type TaskListProps = {
	tasks: TaskProject[];
	onEdit?: (taskId: string) => void;
	onView?: (taskId: string) => void;
	hasAuth: boolean;
};

type GroupedTasks = {
	[key: string]: TaskProject[];
};

const initialStatusGroups: GroupedTasks = {
	pending: [],
	onHold: [],
	inProgress: [],
	underReview: [],
	completed: [],
};

function TaskList({ tasks, onEdit, onView, hasAuth }: TaskListProps) {
	const params = useParams();
	const projectId = params.projectId!;

	// Group the tasks by status
	const groupedTasks = tasks?.reduce((acc, task) => {
		let currentGroup = acc[task.status] ? [...acc[task.status]] : [];
		currentGroup = [...currentGroup, task];
		return { ...acc, [task.status]: currentGroup };
	}, initialStatusGroups);

	const queryClient = useQueryClient();
	const { updateStatusFn } = useStatusTask();

	// to enable action menu in task card
	const sensors = useSensors(
		useSensor(MouseSensor, {
			activationConstraint: {
				distance: 10,
			},
		}),
		useSensor(TouchSensor, {
			activationConstraint: {
				delay: 250,
				tolerance: 5,
			},
		}),
		useSensor(PointerSensor, {
			activationConstraint: {
				distance: 5,
			},
		}),
	);

	function handleDragEnd(event: DragEndEvent) {
		const { over, active } = event;
		if (over && over.id) {
			const taskId = active.id.toString();
			const status = over.id as TaskStatus;
			updateStatusFn(
				{ projectId, taskId, status },
				{
					onSuccess: () => {
						queryClient.invalidateQueries({ queryKey: ['project', projectId] });
					},
				},
			);

			// optimistc update react query
			queryClient.setQueryData(['project', projectId], (prevData: Project) => {
				const updateTaskData = prevData.tasks.map(task => {
					if (task._id === taskId) {
						return {
							...task,
							status,
						};
					}
					return task;
				});

				return {
					...prevData,
					tasks: updateTaskData,
				};
			});
		}
	}

	if (!groupedTasks) return null;
	return (
		<>
			<div className='mt-8 flex w-5/6 flex-col'>
				<div className='divider'>
					<h2 className='text-center text-xl font-bold'>Tareas</h2>
				</div>
			</div>

			{/* TODO: add transition to the container */}
			<div className='flex w-full flex-col 2xl:flex-row 2xl:space-x-8'>
				<DndContext
					sensors={sensors}
					onDragEnd={handleDragEnd}
				>
					{/* Card status Container*/}
					{Object.entries(groupedTasks)!.map(([status, tasks]) => (
						<div
							key={status}
							className='mt-2 w-full 2xl:mt-2 2xl:w-1/5'
						>
							<div className='divider divider-start'>
								<h1
									className={`text-lg font-semibold ${statusTextColor[status]}`}
								>
									{statusLocale[status]}
								</h1>
							</div>

							<DragNDrop
								tasks={tasks}
								status={status}
								onEditTask={onEdit!}
								onViewTask={onView!}
								hasAuth={hasAuth}
							/>
						</div>
					))}
				</DndContext>
			</div>
		</>
	);
}
export default TaskList;
