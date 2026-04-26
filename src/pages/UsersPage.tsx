import { useEffect, useState, useCallback } from 'react';
import { PlusIcon, UsersIcon } from '@heroicons/react/24/outline';
import { Button, Modal, Spinner, EmptyState } from '@components/ui';
import {
	UserTable,
	UserFilters,
	UserForm,
	DeleteConfirmDialog,
	Pagination,
	StatsBar,
} from '@components/users';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { fetchUsers, deleteUser } from '@features/users/usersSlice';
import { selectStatus, selectError } from '@features/users/usersSelectors';
import { useUserModal } from '@hooks/useUserModal';
import type { User } from '@/types';

export const UsersPage = () => {
	const dispatch = useAppDispatch();
	const status = useAppSelector(selectStatus);
	const sliceError = useAppSelector(selectError);

	const {
		mode,
		selectedUser,
		isOpen,
		isLoading,
		error: modalError,
		handleOpenAdd,
		handleOpenEdit,
		handleClose,
	} = useUserModal();

	// Delete dialog state — kept local, not needed in global store
	const [deleteTarget, setDeleteTarget] = useState<User | null>(null);
	const [isDeleteLoading, setIsDeleteLoading] = useState(false);

	// Fetch users on mount
	useEffect(() => {
		if (status === 'idle') {
			dispatch(fetchUsers());
		}
	}, [dispatch, status]);

	const handleEditClick = useCallback(
		(user: User) => {
			handleOpenEdit(user);
		},
		[handleOpenEdit],
	);

	const handleDeleteClick = useCallback((user: User) => {
		setDeleteTarget(user);
	}, []);

	const handleDeleteConfirm = useCallback(async () => {
		if (!deleteTarget) return;
		setIsDeleteLoading(true);
		await dispatch(deleteUser(deleteTarget.id));
		setIsDeleteLoading(false);
		setDeleteTarget(null);
	}, [deleteTarget, dispatch]);

	const handleDeleteCancel = useCallback(() => {
		setDeleteTarget(null);
	}, []);

	// Full page loading state — only on initial fetch
	if (status === 'loading' && !isOpen) {
		return (
			<div className='flex items-center justify-center min-h-[60vh]'>
				<Spinner size='lg' label='Loading users...' />
			</div>
		);
	}

	// Full page error state
	if (status === 'failed' && !sliceError?.includes('already exists')) {
		return (
			<EmptyState
				icon={<UsersIcon className='w-7 h-7' />}
				title='Failed to load users'
				description={sliceError ?? 'An unexpected error occurred.'}
				action={
					<Button onClick={() => dispatch(fetchUsers())}>Try Again</Button>
				}
			/>
		);
	}

	return (
		<div className='flex flex-col gap-6'>
			{/* Page header */}
			<div className='flex flex-col sm:flex-row sm:items-center justify-between gap-4'>
				<div>
					<h1 className='text-2xl font-bold text-neutral-800'>
						User Management
					</h1>
					<p className='text-sm text-neutral-500 mt-0.5'>
						Manage system users, roles and permissions
					</p>
				</div>
				<Button
					variant='primary'
					leftIcon={<PlusIcon className='w-4 h-4' />}
					onClick={handleOpenAdd}
					aria-label='Add new user'>
					Add User
				</Button>
			</div>

			{/* Stats bar */}
			<StatsBar />

			{/* Filters */}
			<div className='bg-white rounded-lg border border-neutral-200 shadow-card px-4 py-3'>
				<UserFilters />
			</div>

			{/* Table */}
			<div className='bg-white rounded-lg border border-neutral-200 shadow-card overflow-hidden'>
				<UserTable onEdit={handleEditClick} onDelete={handleDeleteClick} />
			</div>

			{/* Pagination */}
			<Pagination />

			{/* Add / Edit Modal */}
			<Modal
				isOpen={isOpen}
				onClose={handleClose}
				title={mode === 'edit' ? 'Edit User' : 'Add New User'}
				size='md'>
				<UserForm
					mode={mode}
					selectedUser={selectedUser}
					isLoading={isLoading}
					apiError={modalError}
					onClose={handleClose}
				/>
			</Modal>

			{/* Delete Confirm Dialog */}
			<DeleteConfirmDialog
				user={deleteTarget}
				isOpen={!!deleteTarget}
				isLoading={isDeleteLoading}
				onConfirm={handleDeleteConfirm}
				onCancel={handleDeleteCancel}
			/>
		</div>
	);
};
