import { z } from 'zod';

// Typer for User
export const authSchema = z.object({
	_id: z.string(),
	userName: z.string(),
	email: z.string(),
	currPassword: z.string(),
	password: z.string(),
	confirmPassword: z.string(),
	token: z.string(),
});

// Authentification Schema and Types
export type Auth = z.infer<typeof authSchema>;
export type UserLoginFormData = Pick<Auth, 'email' | 'password'>;
export type UserRegisterFormData = Pick<
	Auth,
	'userName' | 'email' | 'password' | 'confirmPassword'
>;
export type UserRequestToken = Pick<Auth, 'email'>;
export type UserResetPassword = Pick<Auth, 'email'>;
export type UserNewPasswordForm = Pick<Auth, 'password' | 'confirmPassword'>;
export type UserProfilePasswordForm = Pick<
	Auth,
	'currPassword' | 'password' | 'confirmPassword'
>;
export type CheckPassword = Pick<Auth, 'password'>;
export type TokenValidation = Pick<Auth, 'token'>;

// User Schema and Types
export const userSchema = authSchema
	.pick({
		userName: true,
		email: true,
	})
	.extend({
		_id: z.string(),
	});
export type User = z.infer<typeof userSchema>;
export type UserProfileFormData = Pick<User, 'userName' | 'email'>;

//
// Notes Schema and Types
const noteSchema = z.object({
	_id: z.string(),
	content: z.string(),
	createdBy: userSchema.pick({ _id: true, userName: true }),
	task: z.string(),
	createdAt: z.string(),
});
export type Note = z.infer<typeof noteSchema>;
export type NoteFormData = Pick<Note, 'content'>;

//
// Task Schema and Types
export const taskStatusSchema = z.enum([
	'pending',
	'onHold',
	'inProgress',
	'underReview',
	'completed',
]);
export type TaskStatus = z.infer<typeof taskStatusSchema>;

export const taskSchema = z.object({
	_id: z.string(),
	taskName: z.string(),
	description: z.string(),
	project: z.string(),
	status: taskStatusSchema,
	completedBy: z.array(
		z.object({
			_id: z.string(),
			user: userSchema,
			status: taskStatusSchema,
		}),
	),
	notes: z.array(noteSchema.extend({ createdBy: userSchema })),
	createdAt: z.string(),
	updatedAt: z.string(),
});

export const taskProjectSchema = taskSchema.pick({
	_id: true,
	taskName: true,
	description: true,
	status: true,
});

export type Task = z.infer<typeof taskSchema>;
export type TaskFormData = Pick<Task, 'taskName' | 'description'>;
export type TaskProject = z.infer<typeof taskProjectSchema>;

//
// Project Schema and Types
export const projectSchema = z.object({
	_id: z.string(),
	projectName: z.string(),
	clientName: z.string(),
	description: z.string(),
	manager: z.string(userSchema.pick({ _id: true })),
	tasks: z.array(taskProjectSchema) ,
	team: z.array(z.string(userSchema.pick({ _id: true }))),
});

export const simplifiedProjectSchema = z.array(
	projectSchema.pick({
		_id: true,
		projectName: true,
		clientName: true,
		description: true,
		manager: true,
	}),
);

export const editProjectSchema = projectSchema.pick({
	projectName: true,
	clientName: true,
	description: true,
});

export type Project = z.infer<typeof projectSchema>;
export type ProjectFormData = Pick<
	Project,
	'projectName' | 'clientName' | 'description'
>;

//
// Team Schema and Types
const teamMemberSchema = userSchema.pick({
	userName: true,
	email: true,
	_id: true,
});
export const teamMembersSchema = z.array(teamMemberSchema);
export type TeamMember = z.infer<typeof teamMemberSchema>;
export type TeamMemberFormData = Pick<TeamMember, 'email'>;
