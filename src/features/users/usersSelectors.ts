import { createSelector } from '@reduxjs/toolkit';
import type { UsersState } from '@features/users/usersSlice';
import type { User } from '@/types';
import { normalizeString } from '@utils/helpers';

// Local state shape — avoids circular dependency with store/index
interface RootStateSlice {
	users: UsersState;
}

// ─── Base Selectors ──────────────────────────────────────────
const selectAllUsers = (state: RootStateSlice): User[] => state.users.items;
const selectFilters = (state: RootStateSlice) => state.users.filters;
const selectPagination = (state: RootStateSlice) => state.users.pagination;

export const selectStatus = (state: RootStateSlice) => state.users.status;
export const selectError = (state: RootStateSlice): string | null =>
	state.users.error;
export const selectModalState = (state: RootStateSlice) => state.users.modal;
export const selectPageSize = (state: RootStateSlice): number =>
	state.users.pagination.pageSize;
export const selectCurrentPage = (state: RootStateSlice): number =>
	state.users.pagination.currentPage;
export const selectRoleFilter = (state: RootStateSlice) =>
	state.users.filters.role;
export const selectSearchFilter = (state: RootStateSlice): string =>
	state.users.filters.search;

// ─── Memoized Selectors ──────────────────────────────────────

// Returns filtered users based on search and role filters
export const selectFilteredUsers = createSelector(
	[selectAllUsers, selectFilters],
	(users: User[], filters): User[] => {
		return users.filter((user: User) => {
			const matchesSearch =
				filters.search === '' ||
				normalizeString(user.name).includes(normalizeString(filters.search));

			const matchesRole = filters.role === 'All' || user.role === filters.role;

			return matchesSearch && matchesRole;
		});
	},
);

// Returns total count of filtered users
export const selectFilteredUsersCount = createSelector(
	[selectFilteredUsers],
	(filteredUsers: User[]): number => filteredUsers.length,
);

// Returns paginated slice of filtered users
export const selectPaginatedUsers = createSelector(
	[selectFilteredUsers, selectPagination],
	(filteredUsers: User[], pagination): User[] => {
		const start: number = (pagination.currentPage - 1) * pagination.pageSize;
		const end: number = start + pagination.pageSize;
		return filteredUsers.slice(start, end);
	},
);

// Returns total number of pages
export const selectTotalPages = createSelector(
	[selectFilteredUsersCount, selectPageSize],
	(total: number, pageSize: number): number => Math.ceil(total / pageSize),
);

// Returns summary stats for the stats bar
export const selectUserStats = createSelector(
	[selectAllUsers],
	(
		users: User[],
	): {
		total: number;
		admins: number;
		doctors: number;
		patients: number;
	} => ({
		total: users.length,
		admins: users.filter((u: User) => u.role === 'Admin').length,
		doctors: users.filter((u: User) => u.role === 'Doctor').length,
		patients: users.filter((u: User) => u.role === 'Patient').length,
	}),
);
