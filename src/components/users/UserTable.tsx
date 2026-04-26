import { memo } from 'react';
import {
	PencilSquareIcon,
	TrashIcon,
	UserCircleIcon,
} from '@heroicons/react/24/outline';
import { Badge, Button, EmptyState, Spinner } from '@components/ui';
import { useAppSelector } from '@store/hooks';
import {
	selectPaginatedUsers,
	selectStatus,
} from '@features/users/usersSelectors';
import { PERMISSION_LABELS } from '@utils/constants';
import { formatDate } from '@utils/helpers';
import type { User } from '@/types';

interface UserTableProps {
	onEdit: (user: User) => void;
	onDelete: (user: User) => void;
}

// Memoized row to prevent unnecessary re-renders
const UserRow = memo(
	({
		user,
		onEdit,
		onDelete,
	}: {
		user: User;
		onEdit: (user: User) => void;
		onDelete: (user: User) => void;
	}) => {
		return (
			<tr className='border-b border-neutral-100 hover:bg-neutral-50 transition-colors duration-100'>
				{/* Name */}
				<td className='px-4 py-3'>
					<div className='flex items-center gap-3'>
						<div
							aria-hidden='true'
							className='w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0'>
							<span className='text-sm font-semibold text-primary-700'>
								{user.name.charAt(0).toUpperCase()}
							</span>
						</div>
						<div>
							<p className='text-sm font-medium text-neutral-800'>
								{user.name}
							</p>
							<p className='text-xs text-neutral-400'>
								{formatDate(user.createdAt)}
							</p>
						</div>
					</div>
				</td>

				{/* Role */}
				<td className='px-4 py-3'>
					<Badge label={user.role} variant='role' role={user.role} />
				</td>

				{/* Permissions */}
				<td className='px-4 py-3'>
					<div className='flex flex-wrap gap-1'>
						{user.permissions.length > 0 ? (
							user.permissions.map((p) => (
								<Badge
									key={p}
									label={PERMISSION_LABELS[p]}
									variant='permission'
								/>
							))
						) : (
							<span className='text-xs text-neutral-400'>No permissions</span>
						)}
					</div>
				</td>

				{/* Actions */}
				<td className='px-4 py-3'>
					<div className='flex items-center gap-2 justify-end'>
						<Button
							variant='ghost'
							size='sm'
							onClick={() => onEdit(user)}
							aria-label={`Edit ${user.name}`}
							leftIcon={<PencilSquareIcon className='w-4 h-4' />}>
							Edit
						</Button>
						<Button
							variant='ghost'
							size='sm'
							onClick={() => onDelete(user)}
							aria-label={`Delete ${user.name}`}
							leftIcon={<TrashIcon className='w-4 h-4' />}
							className='text-danger-500 hover:bg-danger-50 hover:text-danger-700'>
							Delete
						</Button>
					</div>
				</td>
			</tr>
		);
	},
);

UserRow.displayName = 'UserRow';

export const UserTable = ({ onEdit, onDelete }: UserTableProps) => {
	const users = useAppSelector(selectPaginatedUsers);
	const status = useAppSelector(selectStatus);

	if (status === 'loading') {
		return (
			<div className='flex items-center justify-center py-24'>
				<Spinner size='lg' label='Loading users...' />
			</div>
		);
	}

	if (users.length === 0) {
		return (
			<EmptyState
				icon={<UserCircleIcon className='w-7 h-7' />}
				title='No users found'
				description="Try adjusting your search or filter to find what you're looking for."
			/>
		);
	}

	return (
		<div className='overflow-x-auto scrollbar-thin rounded-lg border border-neutral-200'>
			<table className='min-w-full text-left' aria-label='Users table'>
				<thead className='bg-neutral-50 border-b border-neutral-200'>
					<tr>
						<th
							scope='col'
							className='px-4 py-3 text-xs font-semibold text-neutral-500 uppercase tracking-wider'>
							Name
						</th>
						<th
							scope='col'
							className='px-4 py-3 text-xs font-semibold text-neutral-500 uppercase tracking-wider'>
							Role
						</th>
						<th
							scope='col'
							className='px-4 py-3 text-xs font-semibold text-neutral-500 uppercase tracking-wider'>
							Permissions
						</th>
						<th
							scope='col'
							className='px-4 py-3 text-xs font-semibold text-neutral-500 uppercase tracking-wider text-right'>
							Actions
						</th>
					</tr>
				</thead>
				<tbody className='bg-white divide-y divide-neutral-100'>
					{users.map((user) => (
						<UserRow
							key={user.id}
							user={user}
							onEdit={onEdit}
							onDelete={onDelete}
						/>
					))}
				</tbody>
			</table>
		</div>
	);
};
