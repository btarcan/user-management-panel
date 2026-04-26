interface SpinnerProps {
	size?: 'sm' | 'md' | 'lg';
	label?: string;
}

const sizeClasses = {
	sm: 'w-4 h-4 border-2',
	md: 'w-8 h-8 border-2',
	lg: 'w-12 h-12 border-4',
};

export const Spinner = ({
	size = 'md',
	label = 'Loading...',
}: SpinnerProps) => {
	return (
		<div role='status' className='flex flex-col items-center gap-3'>
			<div
				aria-hidden='true'
				className={[
					'rounded-full border-primary-200 border-t-primary-600 animate-spin',
					sizeClasses[size],
				].join(' ')}
			/>
			<span className='text-sm text-neutral-500'>{label}</span>
		</div>
	);
};
