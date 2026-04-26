import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';
import { Button, Select } from '@components/ui';
import { usePagination } from '@hooks/usePagination';
import type { SelectOption } from '@components/ui';

export const Pagination = () => {
	const {
		currentPage,
		pageSize,
		totalPages,
		totalItems,
		pageSizeOptions,
		canGoPrev,
		canGoNext,
		handlePageChange,
		handlePageSizeChange,
		handlePrev,
		handleNext,
	} = usePagination();

	if (totalItems === 0) return null;

	const pageSizeSelectOptions: SelectOption<string>[] = pageSizeOptions.map(
		(s) => ({ value: String(s), label: `${s} per page` }),
	);

	const startItem = (currentPage - 1) * pageSize + 1;
	const endItem = Math.min(currentPage * pageSize, totalItems);

	// Build page number buttons — show at most 5 pages
	const getPageNumbers = (): number[] => {
		const delta = 2;
		const range: number[] = [];
		const left = Math.max(1, currentPage - delta);
		const right = Math.min(totalPages, currentPage + delta);

		for (let i = left; i <= right; i++) {
			range.push(i);
		}
		return range;
	};

	return (
		<nav
			aria-label='Pagination'
			className='flex flex-col sm:flex-row items-center justify-between gap-4 px-1'>
			{/* Results info */}
			<p className='text-sm text-neutral-500 order-2 sm:order-1'>
				Showing{' '}
				<span className='font-medium text-neutral-700'>{startItem}</span>
				{' – '}
				<span className='font-medium text-neutral-700'>{endItem}</span>
				{' of '}
				<span className='font-medium text-neutral-700'>{totalItems}</span> users
			</p>

			{/* Page controls */}
			<div className='flex items-center gap-1 order-1 sm:order-2'>
				{/* Prev */}
				<Button
					variant='ghost'
					size='sm'
					onClick={handlePrev}
					disabled={!canGoPrev}
					aria-label='Previous page'>
					<ChevronLeftIcon className='w-4 h-4' aria-hidden='true' />
				</Button>

				{/* Page numbers */}
				{getPageNumbers().map((page) => (
					<button
						key={page}
						onClick={() => handlePageChange(page)}
						aria-label={`Page ${page}`}
						aria-current={page === currentPage ? 'page' : undefined}
						className={[
							'w-8 h-8 rounded-md text-sm font-medium transition-colors duration-150',
							'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500',
							page === currentPage
								? 'bg-primary-600 text-white'
								: 'text-neutral-600 hover:bg-neutral-100',
						].join(' ')}>
						{page}
					</button>
				))}

				{/* Next */}
				<Button
					variant='ghost'
					size='sm'
					onClick={handleNext}
					disabled={!canGoNext}
					aria-label='Next page'>
					<ChevronRightIcon className='w-4 h-4' aria-hidden='true' />
				</Button>
			</div>

			{/* Page size selector */}
			<div className='w-36 order-3'>
				<Select
					value={String(pageSize)}
					options={pageSizeSelectOptions}
					onChange={(val) => handlePageSizeChange(Number(val))}
					aria-label='Rows per page'
				/>
			</div>
		</nav>
	);
};
