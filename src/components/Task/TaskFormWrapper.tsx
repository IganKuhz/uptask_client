import { getTaskById } from '@/api/TaskApi';
import { useQuery } from '@tanstack/react-query';
import { useLocation, useParams } from 'react-router-dom';
import Loading from '../Loading';
import TaskDetails from './TaskDetails';
import TaskForm from './TaskForm';

type TaskFormWrapperProps = {
	closeModal: () => void;
};

function TaskFormWrapper({ closeModal }: TaskFormWrapperProps) {
	const params = useParams();
	const projectId = params.projectId!;

	// Get the query task action from the URL
	const location = useLocation();
	const queryParams = new URLSearchParams(location.search);
	const taskId = queryParams.get('editTask' || 'viewTask') || '';

	const { data: taskData, isLoading } = useQuery({
		queryKey: ['task', taskId],
		queryFn: () => getTaskById({ projectId, taskId }),
		enabled: !!taskId, // Only fetch the data if the taskId is present
		retry: 1,
	});

	// if (isError) return <Navigate to={'/404'} />;
	if (isLoading) return <Loading />;
	if (queryParams.get('newTask')) {
		return <TaskForm closeModal={closeModal} />;
	}
	if (queryParams.get('editTask')) {
		return (
			<TaskForm
				task={taskData!}
				closeModal={closeModal}
			/>
		);
	}
	if (queryParams.get('viewTask')) {
		return <TaskDetails closeModal={closeModal} />;
	}
}
export default TaskFormWrapper;
