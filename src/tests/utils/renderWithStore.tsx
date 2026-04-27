import { type ReactNode } from 'react';
import { render, type RenderResult } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import usersReducer, { type UsersState } from '@features/users/usersSlice';
import type { RootState } from '@store/index';

const initialUsersState: UsersState = {
	items: [],
	status: 'idle',
	error: null,
	filters: { search: '', role: 'All' },
	pagination: { currentPage: 1, pageSize: 10 },
	modal: { mode: null, selectedUser: null },
};

// Wraps the reducer to handle undefined state during store initialization
const safeUsersReducer = (
	state: UsersState = initialUsersState,
	action: { type: string },
): UsersState => usersReducer(state, action);

// Builds a test store with optional preloaded state
export const buildTestStore = (preloadedState?: Partial<RootState>) => {
	return configureStore({
		reducer: { users: safeUsersReducer },
		preloadedState,
	});
};

interface RenderWithStoreOptions {
	preloadedState?: Partial<RootState>;
}

export const renderWithStore = (
	ui: ReactNode,
	{ preloadedState }: RenderWithStoreOptions = {},
): RenderResult & { store: ReturnType<typeof buildTestStore> } => {
	const store = buildTestStore(preloadedState);
	const result = render(<Provider store={store}>{ui}</Provider>);
	return { ...result, store };
};

export const mockUsers: UsersState['items'] = [
	{
		id: 'test-001',
		name: 'Alice Admin',
		role: 'Admin',
		permissions: ['read', 'write', 'delete', 'manage_users'],
		createdAt: '2024-01-01T00:00:00.000Z',
	},
	{
		id: 'test-002',
		name: 'Bob Doctor',
		role: 'Doctor',
		permissions: ['read', 'write', 'view_reports'],
		createdAt: '2024-02-01T00:00:00.000Z',
	},
	{
		id: 'test-003',
		name: 'Carol Patient',
		role: 'Patient',
		permissions: ['read'],
		createdAt: '2024-03-01T00:00:00.000Z',
	},
];

export const loadedState: Partial<RootState> = {
	users: {
		items: mockUsers,
		status: 'succeeded',
		error: null,
		filters: { search: '', role: 'All' },
		pagination: { currentPage: 1, pageSize: 10 },
		modal: { mode: null, selectedUser: null },
	},
};
