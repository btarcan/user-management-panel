import type { ApiResponse, User, UserFormValues } from '@/types';
import {
	generateId,
	getCurrentISODate,
	normalizeString,
	sleep,
} from '@utils/helpers';

// Simulated network delay in milliseconds
const SIMULATED_DELAY = 600;

// In-memory database — acts as the backend data store
let usersDb: User[] = [];

export const fakeApi = {
	getUsers: async (): Promise<ApiResponse<User[]>> => {
		await sleep(SIMULATED_DELAY);
		return { success: true, data: [...usersDb] };
	},

	addUser: async (values: UserFormValues): Promise<ApiResponse<User>> => {
		await sleep(SIMULATED_DELAY);

		// Prevent duplicate names (case-insensitive)
		const duplicate = usersDb.some(
			(u) => normalizeString(u.name) === normalizeString(values.name),
		);

		if (duplicate) {
			return {
				success: false,
				data: {} as User,
				message: `A user named "${values.name}" already exists.`,
			};
		}

		const newUser: User = {
			id: generateId(),
			name: values.name.trim(),
			role: values.role,
			permissions: values.permissions,
			createdAt: getCurrentISODate(),
		};

		usersDb = [...usersDb, newUser];
		return {
			success: true,
			data: newUser,
			message: 'User added successfully.',
		};
	},

	updateUser: async (
		id: string,
		values: Partial<UserFormValues>,
	): Promise<ApiResponse<User>> => {
		await sleep(SIMULATED_DELAY);

		const index = usersDb.findIndex((u) => u.id === id);

		if (index === -1) {
			return { success: false, data: {} as User, message: 'User not found.' };
		}

		// Check for duplicate name only when name is being changed
		if (values.name) {
			const duplicate = usersDb.some(
				(u) =>
					u.id !== id &&
					normalizeString(u.name) === normalizeString(values.name!),
			);
			if (duplicate) {
				return {
					success: false,
					data: {} as User,
					message: `A user named "${values.name}" already exists.`,
				};
			}
		}

		const updatedUser: User = {
			...usersDb[index]!,
			...values,
			name: values.name?.trim() ?? usersDb[index]!.name,
		};

		usersDb = usersDb.map((u) => (u.id === id ? updatedUser : u));
		return {
			success: true,
			data: updatedUser,
			message: 'User updated successfully.',
		};
	},

	deleteUser: async (id: string): Promise<ApiResponse<null>> => {
		await sleep(SIMULATED_DELAY);

		const exists = usersDb.some((u) => u.id === id);
		if (!exists) {
			return { success: false, data: null, message: 'User not found.' };
		}

		usersDb = usersDb.filter((u) => u.id !== id);
		return { success: true, data: null, message: 'User deleted successfully.' };
	},

	// Seed the in-memory database with initial data — called during store initialization
	seedUsers: (users: User[]): void => {
		usersDb = [...users];
	},
};
