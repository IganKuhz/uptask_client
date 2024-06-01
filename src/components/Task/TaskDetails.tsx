import { getTaskById } from '@/api/TaskApi';
import { statusLocale, statusTextColor } from '@/constants/index';
import { useStatusTask } from '@/hooks/useStatusTask';
import { TaskStatus } from '@/types/index';
import { formatDate } from '@/utils/index';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { History, Notebook } from 'lucide-react';
import { ChangeEvent, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Loading from '../Loading';
import NotesPanel from '../Notes/NotesPanel';

const tabs = [
	{ tag: 'history', title: 'Estados', icon: History },
	{ tag: 'notes', title: 'Notas', icon: Notebook },
];

type TaskDetailsProps = {
	closeModal: () => void;
};

function TaskDetails({ closeModal }: TaskDetailsProps) {
	const [collapsed, setCollapsed] = useState(true);
	const [tabSelected, setTabSelected] = useState('history');

	const navigate = useNavigate();
	const params = useParams();
	const projectId = params.projectId!;

	const location = useLocation();
	const queryParams = new URLSearchParams(location.search);
	const taskId = queryParams.get('viewTask')!;

	const { data: taskData, isLoading } = useQuery({
		queryKey: ['task', taskId],
		queryFn: () => getTaskById({ projectId, taskId }),
		enabled: !!taskId, // This is to prevent the query from running when the taskId is empty and error 500
		retry: false,
	});

	const queryClient = useQueryClient();
	const { updateStatusFn, isChangingStatus } = useStatusTask();

	function handleChangeStatus(e: ChangeEvent<HTMLSelectElement>) {
		const status = e.target.value as TaskStatus;
		updateStatusFn(
			{ projectId, taskId, status },
			{
				onSuccess: () => {
					queryClient.invalidateQueries({ queryKey: ['project', projectId] });
					queryClient.invalidateQueries({ queryKey: ['task', taskId] });
				},
			},
		);
	}

	function handleCloseModal() {
		navigate(location.pathname, { replace: true });
		closeModal();
	}

	function handleSelectTab(tab: string) {
		setTabSelected(tab);
	}

	if (isLoading) return <Loading />;
	if (taskData)
		return (
			<>
				<form method='dialog'>
					{/* if there is a button in form, it will close the modal */}
					<button
						className='btn btn-circle btn-ghost btn-sm absolute right-3 top-3'
						onClick={handleCloseModal}
					>
						✕
					</button>
				</form>

				<div className='text-xs font-light'>
					<p>Agregado el: {formatDate(taskData.createdAt)}</p>
					<p>Última modificación: {formatDate(taskData.updatedAt)}</p>
				</div>

				<div className='flex flex-col gap-2 p-4'>
					<h3 className='text-lg font-bold text-primary md:text-xl'>
						{taskData.taskName}
					</h3>
					<p className='text-sm'>{taskData.description}</p>

					<section className='flex items-center gap-2 self-end text-sm'>
						<p>Estado actual:</p>
						<select
							className={`select select-bordered select-sm text-sm ${statusTextColor[taskData.status]}`}
							defaultValue={taskData.status}
							onChange={handleChangeStatus}
							disabled={isChangingStatus}
						>
							{Object.entries(statusLocale).map(([key, value]) => (
								<option
									key={key}
									value={key}
									className='bg-white text-gray-800 dark:bg-gray-800 dark:text-white'
								>
									{value}
								</option>
							))}
						</select>
					</section>

					<div
						role='tablist'
						className='tabs-boxed tabs grid-cols-[1fr,1fr]'
					>
						{tabs.map(tab => (
							<a
								key={tab.tag}
								role='tab'
								className={`tab transition-all ${tabSelected === `${tab.tag}` && 'tab-active font-semibold'}`}
								onClick={() => handleSelectTab(`${tab.tag}`)}
							>
								{tab.title}
							</a>
						))}
					</div>

					<div className='transition-all'>
						{tabSelected === 'history' && (
							// TODO: Create a component for this
							<div className='collapse collapse-plus rounded-lg bg-base-200 text-xs shadow-inner'>
								<input
									type='radio'
									name='statusHistory'
									checked={collapsed}
									readOnly
									onClick={() => setCollapsed(collapsed => !collapsed)}
								/>
								<div className='collapse-title font-semibold'>
									Historial de estados:
								</div>

								<div className='collapse-content max-h-max overflow-y-scroll transition-all'>
									<ul className='list-decimal'>
										{!taskData.completedBy.length ? (
											<p className='flex flex-col place-items-center'>
												<History
													size={18}
													className='mb-2 text-base-content'
												/>
												No se han realizado cambios de estado.
											</p>
										) : (
											taskData.completedBy.map(history => (
												<li key={history._id}>
													<p>
														<span className='font-semibold text-secondary'>
															{history.user.userName}
														</span>
														&nbsp;cambio el estado a&nbsp;
														<span
															className={`${statusTextColor[history.status]} font-semibold`}
														>
															{statusLocale[history.status]}&nbsp;
														</span>
													</p>
												</li>
											))
										)}
									</ul>
								</div>
							</div>
						)}

						{tabSelected === 'notes' && (
							<NotesPanel
								notes={taskData.notes}
								collapsed={collapsed}
								setCollapsed={setCollapsed}
							/>
						)}
					</div>
				</div>
			</>
		);
}
export default TaskDetails;
