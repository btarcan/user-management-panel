import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import { Modal, Button } from '@components/ui';
import type { User } from '@/types';

interface DeleteConfirmDialogProps {
	user: User | null;
	isOpen: boolean;
	isLoading: boolean;
	onConfirm: () => void;
	onCancel: () => void;
}

export const DeleteConfirmDialog = ({
	user,
	isOpen,
	isLoading,
	onConfirm,
	onCancel,
}: DeleteConfirmDialogProps) => {
	if (!user) return null;

	return (
		<Modal isOpen={isOpen} onClose={onCancel} title='Delete User' size='sm'>
			<div className='flex flex-col gap-5'>
				{/* Warning icon + message */}
				<div className='flex gap-4'>
					<div
						aria-hidden='true'
						className='flex-shrink-0 w-10 h-10 rounded-full bg-danger-50 flex items-center justify-center'>
						<ExclamationTriangleIcon className='w-5 h-5 text-danger-500' />
					</div>
					<div className='flex flex-col gap-1'>
						<p className='text-sm font-medium text-neutral-800'>
							Are you sure you want to delete{' '}
							<span className='font-semibold'>"{user.name}"</span>?
						</p>
						<p className='text-sm text-neutral-500'>
							This action cannot be undone. The user will be permanently removed
							from the system.
						</p>
					</div>
				</div>

				{/* Actions */}
				<div className='flex justify-end gap-3'>
					<Button variant='secondary' onClick={onCancel} disabled={isLoading}>
						Cancel
					</Button>
					<Button
						variant='danger'
						onClick={onConfirm}
						isLoading={isLoading}
						aria-label={`Confirm delete ${user.name}`}>
						Delete
					</Button>
				</div>
			</div>
		</Modal>
	);
};
