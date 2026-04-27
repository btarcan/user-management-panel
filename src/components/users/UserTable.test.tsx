import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { UserTable } from '@components/users/UserTable';
import {
	renderWithStore,
	loadedState,
	mockUsers,
} from '@tests/utils/renderWithStore';
import type { RootState } from '@store/index';

describe('UserTable', () => {
	const onEdit = vi.fn();
	const onDelete = vi.fn();

	const renderTable = (preloadedState?: Partial<RootState>) =>
		renderWithStore(<UserTable onEdit={onEdit} onDelete={onDelete} />, {
			preloadedState,
		});

	it('renders loading spinner when status is loading', () => {
		renderTable({
			users: {
				...loadedState.users!,
				status: 'loading',
				items: [],
			},
		});
		expect(screen.getByRole('status')).toBeInTheDocument();
		expect(screen.getByText('Loading users...')).toBeInTheDocument();
	});

	it('renders empty state when no users match', () => {
		renderTable({
			users: {
				...loadedState.users!,
				items: [],
			},
		});
		expect(screen.getByText('No users found')).toBeInTheDocument();
	});

	it('renders all users in the table', () => {
		renderTable(loadedState);
		mockUsers.forEach((user) => {
			expect(screen.getByText(user.name)).toBeInTheDocument();
		});
	});

	it('renders role badges correctly', () => {
		renderTable(loadedState);
		expect(screen.getByText('Admin')).toBeInTheDocument();
		expect(screen.getByText('Doctor')).toBeInTheDocument();
		expect(screen.getByText('Patient')).toBeInTheDocument();
	});

	it('calls onEdit with correct user when edit button is clicked', async () => {
		renderTable(loadedState);
		const editButton = screen.getByRole('button', {
			name: `Edit ${mockUsers[0]!.name}`,
		});
		await userEvent.click(editButton);
		expect(onEdit).toHaveBeenCalledWith(mockUsers[0]);
	});

	it('calls onDelete with correct user when delete button is clicked', async () => {
		renderTable(loadedState);
		const deleteButton = screen.getByRole('button', {
			name: `Delete ${mockUsers[0]!.name}`,
		});
		await userEvent.click(deleteButton);
		expect(onDelete).toHaveBeenCalledWith(mockUsers[0]);
	});

	it('renders table with correct aria-label', () => {
		renderTable(loadedState);
		expect(
			screen.getByRole('table', { name: 'Users table' }),
		).toBeInTheDocument();
	});
});
