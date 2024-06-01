import api from '@/lib/axios';
import { isAxiosError } from 'axios';
import {
	CheckPassword,
	TokenValidation,
	UserLoginFormData,
	UserNewPasswordForm,
	UserRegisterFormData,
	UserRequestToken,
	UserResetPassword,
	userSchema,
} from '../types';

export async function createAccount(formData: UserRegisterFormData) {
	try {
		const url = '/auth/create-account';
		const { data } = await api.post<string>(url, formData);
		return data;
	} catch (error) {
		if (isAxiosError(error) && error.response) {
			throw new Error(error.response.data.error);
		}
	}
}

export async function confirmAccount(formData: TokenValidation) {
	try {
		const url = '/auth/confirm-account';
		const { data } = await api.post<string>(url, formData);
		return data;
	} catch (error) {
		if (isAxiosError(error) && error.response) {
			throw new Error(error.response.data.error);
		}
	}
}

export async function requestToken(formData: UserRequestToken) {
	try {
		const url = '/auth/request-token';
		const { data } = await api.post<string>(url, formData);
		return data;
	} catch (error) {
		if (isAxiosError(error) && error.response) {
			throw new Error(error.response.data.error);
		}
	}
}

export async function loginUser(formData: UserLoginFormData) {
	try {
		const url = '/auth/login';
		const { data } = await api.post<string>(url, formData);
		localStorage.setItem('AuthToken', data);
		return data;
	} catch (error) {
		if (isAxiosError(error) && error.response) {
			throw new Error(error.response.data.error);
		}
	}
}

export async function resetPassword(formData: UserResetPassword) {
	try {
		const url = '/auth/reset-password';
		const { data } = await api.post<string>(url, formData);
		return data;
	} catch (error) {
		if (isAxiosError(error) && error.response) {
			throw new Error(error.response.data.error);
		}
	}
}

export async function confirmResetPassword(formData: TokenValidation) {
	try {
		const url = '/auth/confirm-reset-password';
		const { data } = await api.post<string>(url, formData);
		return data;
	} catch (error) {
		if (isAxiosError(error) && error.response) {
			throw new Error(error.response.data.error);
		}
	}
}

export async function newPassword({
	formData,
	token,
}: {
	formData: UserNewPasswordForm;
	token: TokenValidation['token'];
}) {
	try {
		const url = `/auth/new-password/${token}`;
		const { data } = await api.post<string>(url, formData);
		return data;
	} catch (error) {
		if (isAxiosError(error) && error.response) {
			throw new Error(error.response.data.error);
		}
	}
}

export async function getUser() {
	try {
		const url = '/auth/user';
		const { data } = await api(url);
		const res = userSchema.safeParse(data);
		if (res.success) return res.data;
	} catch (error) {
		if (isAxiosError(error) && error.response) {
			throw new Error(error.response.data.error);
		}
	}
}

export async function checkPassword(formData: CheckPassword) {
	try {
		const url = '/auth/check-password';
		const { data } = await api.post<string>(url, formData);
		return data;
	} catch (error) {
		if (isAxiosError(error) && error.response) {
			throw new Error(error.response.data.error);
		}
	}
}
