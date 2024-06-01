import AppLayout from '@/layouts/AppLayout';
import AuthLayout from '@/layouts/AuthLayout';
import ProfileLayout from '@/layouts/ProfileLayout';

import DashBoardPage from '@/pages/DashBoardPage';
import NotFoundPage from '@/pages/NotFoundPage';
import ConfirmAccountPage from '@/pages/auth/ConfirmAccountPage';
import LoginPage from '@/pages/auth/LoginPage';
import NewPasswordPage from '@/pages/auth/NewPasswordPage';
import RegisterPage from '@/pages/auth/RegisterPage';
import RequestTokenPage from '@/pages/auth/RequestTokenPage';
import ResetPasswordPage from '@/pages/auth/ResetPasswordPage';
import ProfilePage from '@/pages/profile/ProfilePage';
import ProfilePasswordPage from '@/pages/profile/ProfilePasswordPage';
import ProjectDetailsPage from '@/pages/project/ProjectDetailsPage';
import ProjectEditPage from '@/pages/project/ProjectEditPage';
import ProjectNewPage from '@/pages/project/ProjectNewPage';
import ProjectTeamPage from '@/pages/project/ProjectTeamPage';

import {
	Route,
	createBrowserRouter,
	createRoutesFromElements,
} from 'react-router-dom';

// export const router = createBrowserRouter([
// 	{
// 		path: '/',
// 		element: <AppLayout />,
// 		errorElement: <div>404 Not Found</div>,
// 		children: [
// 			{
// 				index: true,
// 				errorElement: <div>404 Not Found</div>,
// 				element: <DashBoardPage />,
// 			},
// 			{
// 				path: 'projects/new',
// 				element: <ProjectNewPage />,
// 			},
// 			{
// 				path: 'projects/:projectId',
// 				element: <ProjectDetailsPage />,
// 			},
// 			{
// 				path: 'projects/:projectId/edit',
// 				element: <ProjectEditPage />,
// 			},
// 			{
// 				path: 'projects/:projectId/team',
// 				element: <ProjectTeamPage />,
// 			},
// 			{
// 				path: 'profile',
// 				element: <ProfileLayout />,
// 				errorElement: <div>404 Not Found</div>,
// 				children: [
// 					{
// 						index: true,
// 						element: <ProfilePage />,
// 					},
// 					{
// 						path: 'password',
// 						element: <ProfilePasswordPage />,
// 					},
// 				],
// 			},
// 		],
// 	},
// 	{
// 		path: 'auth',
// 		element: <AuthLayout />,
// 		errorElement: <div>404 Not Found</div>,
// 		children: [
// 			{
// 				path: 'login',
// 				errorElement: <div>404 Not Found</div>,
// 				element: <LoginPage />,
// 			},
// 			{
// 				path: 'register',
// 				element: <RegisterPage />,
// 			},
// 			{
// 				path: 'confirm',
// 				element: <ConfirmAccountPage />,
// 			},
// 			{
// 				path: 'request-token',
// 				element: <RequestTokenPage />,
// 			},
// 			{
// 				path: 'reset-password',
// 				element: <ResetPasswordPage />,
// 			},
// 			{
// 				path: 'new-password',
// 				element: <NewPasswordPage />,
// 			},
// 		],
// 	},
// ]);

export const router = createBrowserRouter(
	createRoutesFromElements(
		<Route>
			<Route
				path='/'
				element={<AppLayout />}
			>
				<Route
					index
					element={<DashBoardPage />}
				/>
				<Route
					path='projects/new'
					element={<ProjectNewPage />}
				/>
				<Route
					path='projects/:projectId'
					element={<ProjectDetailsPage />}
				/>
				<Route
					path='projects/:projectId/edit'
					element={<ProjectEditPage />}
				/>
				<Route
					path='projects/:projectId/team'
					element={<ProjectTeamPage />}
				/>
				<Route
					path='profile'
					element={<ProfileLayout />}
				>
					<Route
						index
						element={<ProfilePage />}
					/>
					<Route
						path='password'
						element={<ProfilePasswordPage />}
					/>
				</Route>
			</Route>
			,
			<Route
				path='auth'
				element={<AuthLayout />}
			>
				<Route
					path='login'
					element={<LoginPage />}
				/>
				<Route
					path='register'
					element={<RegisterPage />}
				/>
				<Route
					path='confirm'
					element={<ConfirmAccountPage />}
				/>
				<Route
					path='request-token'
					element={<RequestTokenPage />}
				/>
				<Route
					path='reset-password'
					element={<ResetPasswordPage />}
				/>
				<Route
					path='new-password'
					element={<NewPasswordPage />}
				/>
			</Route>
			<Route element={<AuthLayout />}>
				<Route
					path='*'
					element={<NotFoundPage />}
				/>
			</Route>
		</Route>,
	),
);
