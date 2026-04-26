import type { ReactNode } from 'react';

interface EmptyStateProps {
	icon?: ReactNode;
	title: string;
	description?: string;
	action?: ReactNode;
}

export const EmptyState = ({
	icon,
	title,
	description,
	action,
}: EmptyStateProps) => {
	return (
		<div
			role='status'
			aria-live='polite'
			className='flex flex-col items-center justify-center gap-4 py-16 px-6 text-center'>
			{icon && (
				<div
					aria-hidden='true'
					className='w-14 h-14 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-400'>
					{icon}
				</div>
			)}
			<div className='flex flex-col gap-1'>
				<p className='text-sm font-semibold text-neutral-700'>{title}</p>
				{description && (
					<p className='text-sm text-neutral-500'>{description}</p>
				)}
			</div>
			{action && <div>{action}</div>}
		</div>
	);
};
