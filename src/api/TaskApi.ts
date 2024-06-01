import api from '@/lib/axios';
import { isAxiosError } from 'axios';
import { Project, Task, TaskFormData, taskSchema } from '../types';

type TTaskAPI = {
	formData: TaskFormData;
	projectId: Project['_id'];
	taskId: Task['_id'];
	status: Task['status'];
};

export async function createTask({
	formData,
	projectId,
}: Pick<TTaskAPI, 'formData' | 'projectId'>) {
	try {
		const url = `/projects/${projectId}/tasks`;
		const { data } = await api.post<string>(url, formData);
		return data;
	} catch (error) {
		if (isAxiosError(error) && error.response) {
			throw new Error(error.response.data.error);
		}
	}
}

export async function getTaskById({
	projectId,
	taskId,
}: Pick<TTaskAPI, 'projectId' | 'taskId'>) {
	try {
		const url = `/projects/${projectId}/tasks/${taskId}`;
		const { data } = await api.get(url);
		const res = taskSchema.safeParse(data);
		if (res.success) {
			return res.data;
		}
	} catch (error) {
		if (isAxiosError(error) && error.response) {
			throw new Error(error.response.data.error);
		}
	}
}

export async function updateTask({
	projectId,
	taskId,
	formData,
}: Pick<TTaskAPI, 'projectId' | 'taskId' | 'formData'>) {
	try {
		const url = `/projects/${projectId}/tasks/${taskId}`;
		const { data } = await api.put<string>(url, formData);
		return data;
	} catch (error) {
		if (isAxiosError(error) && error.response) {
			throw new Error(error.response.data.error);
		}
	}
}

export async function deleteTask({
	projectId,
	taskId,
}: Pick<TTaskAPI, 'projectId' | 'taskId'>) {
	try {
		const url = `/projects/${projectId}/tasks/${taskId}`;
		const { data } = await api.delete<string>(url);
		return data;
	} catch (error) {
		if (isAxiosError(error) && error.response) {
			throw new Error(error.response.data.error);
		}
	}
}

export async function updateStatusTask({
	projectId,
	taskId,
	status,
}: Pick<TTaskAPI, 'projectId' | 'taskId' | 'status'>) {
	try {
		const url = `/projects/${projectId}/tasks/${taskId}/status`;
		const { data } = await api.post<string>(url, { status });
		return data;
	} catch (error) {
		if (isAxiosError(error) && error.response) {
			throw new Error(error.response.data.error);
		}
	}
}
