import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import {
	setSearchFilter,
	setRoleFilter,
	resetFilters,
} from '@features/users/usersSlice';
import {
	selectSearchFilter,
	selectRoleFilter,
} from '@features/users/usersSelectors';
import { useDebounce } from '@hooks/useDebounce';
import type { UserFilters } from '@/types';

interface UseUserFiltersReturn {
	search: string;
	role: UserFilters['role'];
	debouncedSearch: string;
	handleSearchChange: (value: string) => void;
	handleRoleChange: (value: UserFilters['role']) => void;
	handleResetFilters: () => void;
	hasActiveFilters: boolean;
}

export const useUserFilters = (): UseUserFiltersReturn => {
	const dispatch = useAppDispatch();
	const search = useAppSelector(selectSearchFilter);
	const role = useAppSelector(selectRoleFilter);
	const debouncedSearch = useDebounce(search, 400);

	const handleSearchChange = useCallback(
		(value: string) => {
			dispatch(setSearchFilter(value));
		},
		[dispatch],
	);

	const handleRoleChange = useCallback(
		(value: UserFilters['role']) => {
			dispatch(setRoleFilter(value));
		},
		[dispatch],
	);

	const handleResetFilters = useCallback(() => {
		dispatch(resetFilters());
	}, [dispatch]);

	const hasActiveFilters = search !== '' || role !== 'All';

	return {
		search,
		role,
		debouncedSearch,
		handleSearchChange,
		handleRoleChange,
		handleResetFilters,
		hasActiveFilters,
	};
};
