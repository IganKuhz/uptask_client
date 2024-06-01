import api from '@/lib/axios';
import { isAxiosError } from 'axios';
import {
	Project,
	ProjectFormData,
	editProjectSchema,
	projectSchema,
	simplifiedProjectSchema,
} from '../types';

export async function createProject(formData: ProjectFormData) {
	try {
		const { data } = await api.post('/projects', formData);
		return data;
	} catch (error) {
		if (isAxiosError(error) && error.response) {
			throw new Error(error.response.data.error);
		}
	}
}

export async function getProjects() {
	try {
		const { data } = await api('/projects');
		// validate the data with the ZOD schema
		const res = simplifiedProjectSchema.safeParse(data);
		// console.log(res);
		if (res.success) {
			return res.data;
		}
	} catch (error) {
		if (isAxiosError(error) && error.response) {
			throw new Error(error.response.data.error);
		}
	}
}

export async function getProjectById(projectId: Project['_id']) {
	try {
		const { data } = await api(`/projects/${projectId}`);
		const res = editProjectSchema.safeParse(data);
		if (res.success) {
			return res.data;
		}
	} catch (error) {
		if (isAxiosError(error) && error.response) {
			throw new Error(error.response.data.error);
		}
	}
}

export async function getFullProject(projectId: Project['_id']) {
	try {
		const { data } = await api(`/projects/${projectId}`);
		const res = projectSchema.safeParse(data);
		if (res.success) {
			return res.data;
		}
	} catch (error) {
		if (isAxiosError(error) && error.response) {
			throw new Error(error.response.data.error);
		}
	}
}

type TProjectAPI = {
	formData: ProjectFormData;
	projectId: Project['_id'];
};
export async function updateProject({ formData, projectId }: TProjectAPI) {
	try {
		const { data } = await api.put(`/projects/${projectId}`, formData);
		return data;
	} catch (error) {
		if (isAxiosError(error) && error.response) {
			throw new Error(error.response.data.error);
		}
	}
}

export async function deleteProject(projectId: Project['_id']) {
	try {
		const { data } = await api.delete<string>(`/projects/${projectId}`);
		return data;
	} catch (error) {
		if (isAxiosError(error) && error.response) {
			throw new Error(error.response.data.error);
		}
	}
}

export async function duplicateProject(projectId: Project['_id']) {
	try {
		const { data } = await api.post(`/projects/${projectId}`);
		return data;
	} catch (error) {
		if (isAxiosError(error) && error.response) {
			throw new Error(error.response.data.error);
		}
	}
}
