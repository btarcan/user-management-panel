import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { setCurrentPage, setPageSize } from '@features/users/usersSlice';
import {
	selectCurrentPage,
	selectPageSize,
	selectTotalPages,
	selectFilteredUsersCount,
} from '@features/users/usersSelectors';
import { PAGE_SIZE_OPTIONS } from '@utils/constants';

interface UsePaginationReturn {
	currentPage: number;
	pageSize: number;
	totalPages: number;
	totalItems: number;
	pageSizeOptions: readonly number[];
	canGoPrev: boolean;
	canGoNext: boolean;
	handlePageChange: (page: number) => void;
	handlePageSizeChange: (size: number) => void;
	handlePrev: () => void;
	handleNext: () => void;
}

export const usePagination = (): UsePaginationReturn => {
	const dispatch = useAppDispatch();
	const currentPage = useAppSelector(selectCurrentPage);
	const pageSize = useAppSelector(selectPageSize);
	const totalPages = useAppSelector(selectTotalPages);
	const totalItems = useAppSelector(selectFilteredUsersCount);

	const canGoPrev = currentPage > 1;
	const canGoNext = currentPage < totalPages;

	const handlePageChange = useCallback(
		(page: number) => {
			dispatch(setCurrentPage(page));
		},
		[dispatch],
	);

	const handlePageSizeChange = useCallback(
		(size: number) => {
			dispatch(setPageSize(size));
		},
		[dispatch],
	);

	const handlePrev = useCallback(() => {
		if (canGoPrev) dispatch(setCurrentPage(currentPage - 1));
	}, [canGoPrev, currentPage, dispatch]);

	const handleNext = useCallback(() => {
		if (canGoNext) dispatch(setCurrentPage(currentPage + 1));
	}, [canGoNext, currentPage, dispatch]);

	return {
		currentPage,
		pageSize,
		totalPages,
		totalItems,
		pageSizeOptions: PAGE_SIZE_OPTIONS,
		canGoPrev,
		canGoNext,
		handlePageChange,
		handlePageSizeChange,
		handlePrev,
		handleNext,
	};
};
