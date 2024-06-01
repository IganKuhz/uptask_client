import api from '@/lib/axios';
import { isAxiosError } from 'axios';
import { UserProfileFormData, UserProfilePasswordForm } from '../types';

export async function updateProfile(formData: UserProfileFormData) {
	try {
		const url = '/auth/profile/';
		const { data } = await api.put<string>(url, formData);
		return data;
	} catch (error) {
		if (isAxiosError(error) && error.response) {
			throw new Error(error.response.data.error);
		}
	}
}

export async function updateProfilePassword(formData: UserProfilePasswordForm) {
	try {
		const url = '/auth/profile/change-password/';
		const { data } = await api.post<string>(url, formData);
		return data;
	} catch (error) {
		if (isAxiosError(error) && error.response) {
			throw new Error(error.response.data.error);
		}
	}
}
