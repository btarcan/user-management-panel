import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import {
	openAddModal,
	openEditModal,
	closeModal,
	clearError,
} from '@features/users/usersSlice';
import {
	selectModalState,
	selectError,
	selectStatus,
} from '@features/users/usersSelectors';
import type { User } from '@/types';

interface UseUserModalReturn {
	mode: 'add' | 'edit' | null;
	selectedUser: User | null;
	isOpen: boolean;
	isLoading: boolean;
	error: string | null;
	handleOpenAdd: () => void;
	handleOpenEdit: (user: User) => void;
	handleClose: () => void;
	handleClearError: () => void;
}

export const useUserModal = (): UseUserModalReturn => {
	const dispatch = useAppDispatch();
	const modal = useAppSelector(selectModalState);
	const error = useAppSelector(selectError);
	const status = useAppSelector(selectStatus);

	const handleOpenAdd = useCallback(() => {
		dispatch(openAddModal());
	}, [dispatch]);

	const handleOpenEdit = useCallback(
		(user: User) => {
			dispatch(openEditModal(user));
		},
		[dispatch],
	);

	const handleClose = useCallback(() => {
		dispatch(closeModal());
	}, [dispatch]);

	const handleClearError = useCallback(() => {
		dispatch(clearError());
	}, [dispatch]);

	return {
		mode: modal.mode,
		selectedUser: modal.selectedUser,
		isOpen: modal.mode !== null,
		isLoading: status === 'loading',
		error,
		handleOpenAdd,
		handleOpenEdit,
		handleClose,
		handleClearError,
	};
};
