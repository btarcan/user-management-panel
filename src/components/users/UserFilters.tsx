import {
	MagnifyingGlassIcon,
	FunnelIcon,
	XMarkIcon,
} from '@heroicons/react/20/solid';
import { Input, Select, Button } from '@components/ui';
import { useUserFilters } from '@hooks/useUserFilters';
import { ROLES } from '@utils/constants';
import type { SelectOption } from '@components/ui';
import type { UserFilters as UserFiltersType } from '@/types';

const roleOptions: SelectOption<UserFiltersType['role']>[] = [
	{ value: 'All', label: 'All Roles' },
	...ROLES.map((r) => ({ value: r, label: r })),
];

export const UserFilters = () => {
	const {
		search,
		role,
		handleSearchChange,
		handleRoleChange,
		handleResetFilters,
		hasActiveFilters,
	} = useUserFilters();

	return (
		<div className='flex flex-col sm:flex-row gap-3 items-start sm:items-end'>
			{/* Search input */}
			<div className='w-full sm:max-w-xs'>
				<Input
					id='user-search'
					placeholder='Search by name...'
					value={search}
					onChange={(e) => handleSearchChange(e.target.value)}
					leftIcon={<MagnifyingGlassIcon className='w-4 h-4' />}
					aria-label='Search users by name'
				/>
			</div>

			{/* Role filter */}
			<div className='w-full sm:w-44'>
				<Select
					id='role-filter'
					value={role}
					options={roleOptions}
					onChange={handleRoleChange}
					aria-label='Filter by role'
				/>
			</div>

			{/* Reset filters button — only visible when filters are active */}
			{hasActiveFilters && (
				<Button
					variant='ghost'
					size='sm'
					onClick={handleResetFilters}
					leftIcon={<XMarkIcon className='w-4 h-4' />}
					aria-label='Reset all filters'>
					Reset
				</Button>
			)}

			{/* Active filter indicator */}
			{hasActiveFilters && (
				<span
					aria-live='polite'
					className='flex items-center gap-1.5 text-xs text-primary-600 font-medium'>
					<FunnelIcon className='w-3.5 h-3.5' aria-hidden='true' />
					Filters active
				</span>
			)}
		</div>
	);
};
