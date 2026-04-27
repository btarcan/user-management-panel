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

// ─── Shared Avatar ───────────────────────────────────────────
const UserAvatar = ({ name }: { name: string }) => (
	<div
		aria-hidden='true'
		className='w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0'>
		<span className='text-sm font-semibold text-primary-700'>
			{name.charAt(0).toUpperCase()}
		</span>
	</div>
);

// ─── Action Buttons ──────────────────────────────────────────
const ActionButtons = ({
	user,
	onEdit,
	onDelete,
}: {
	user: User;
	onEdit: (user: User) => void;
	onDelete: (user: User) => void;
}) => (
	<div className='flex items-center gap-2'>
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
);

// ─── Desktop Table Row ───────────────────────────────────────
const UserRow = memo(
	({
		user,
		onEdit,
		onDelete,
	}: {
		user: User;
		onEdit: (user: User) => void;
		onDelete: (user: User) => void;
	}) => (
		<tr className='border-b border-neutral-100 hover:bg-neutral-50 transition-colors duration-100'>
			{/* Name */}
			<td className='px-4 py-3'>
				<div className='flex items-center gap-3'>
					<UserAvatar name={user.name} />
					<div>
						<p className='text-sm font-medium text-neutral-800'>{user.name}</p>
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
			<td className='px-4 py-3 text-right'>
				<ActionButtons user={user} onEdit={onEdit} onDelete={onDelete} />
			</td>
		</tr>
	),
);

UserRow.displayName = 'UserRow';

// ─── Mobile Card ─────────────────────────────────────────────
const UserCard = memo(
	({
		user,
		onEdit,
		onDelete,
	}: {
		user: User;
		onEdit: (user: User) => void;
		onDelete: (user: User) => void;
	}) => (
		<article
			aria-label={`User ${user.name}`}
			className='flex flex-col gap-3 p-4 border-b border-neutral-100 last:border-0 hover:bg-neutral-50 transition-colors duration-100'>
			{/* Top row — avatar + name + role */}
			<div className='flex items-center justify-between gap-3'>
				<div className='flex items-center gap-3 min-w-0'>
					<UserAvatar name={user.name} />
					<div className='min-w-0'>
						<p className='text-sm font-medium text-neutral-800 truncate'>
							{user.name}
						</p>
						<p className='text-xs text-neutral-400'>
							{formatDate(user.createdAt)}
						</p>
					</div>
				</div>
				<Badge label={user.role} variant='role' role={user.role} />
			</div>

			{/* Permissions */}
			{user.permissions.length > 0 && (
				<div className='flex flex-wrap gap-1'>
					{user.permissions.map((p) => (
						<Badge key={p} label={PERMISSION_LABELS[p]} variant='permission' />
					))}
				</div>
			)}

			{/* Actions */}
			<div className='flex items-center justify-end gap-2 pt-1'>
				<ActionButtons user={user} onEdit={onEdit} onDelete={onDelete} />
			</div>
		</article>
	),
);

UserCard.displayName = 'UserCard';

// ─── Main Component ──────────────────────────────────────────
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
		<>
			{/* Desktop — visible on md and above */}
			<div className='hidden md:block overflow-x-auto scrollbar-thin rounded-lg border border-neutral-200'>
				<table className='min-w-full text-left' aria-label='Users table'>
					<thead className='bg-neutral-50 border-b border-neutral-200'>
						<tr>
							{['Name', 'Role', 'Permissions', 'Actions'].map((col) => (
								<th
									key={col}
									scope='col'
									className={[
										'px-4 py-3 text-xs font-semibold text-neutral-500',
										'uppercase tracking-wider',
										col === 'Actions' ? 'text-right' : '',
									].join(' ')}>
									{col}
								</th>
							))}
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

			{/* Mobile — visible below md */}
			<div
				className='md:hidden rounded-lg border border-neutral-200 bg-white divide-y divide-neutral-100'
				role='list'
				aria-label='Users list'>
				{users.map((user) => (
					<UserCard
						key={user.id}
						user={user}
						onEdit={onEdit}
						onDelete={onDelete}
					/>
				))}
			</div>
		</>
	);
};
