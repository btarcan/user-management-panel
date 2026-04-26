import { forwardRef, type InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
	label?: string;
	error?: string;
	hint?: string;
	leftIcon?: React.ReactNode;
	rightIcon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
	(
		{ label, error, hint, leftIcon, rightIcon, id, className = '', ...rest },
		ref,
	) => {
		const inputId = id ?? `input-${Math.random().toString(36).slice(2, 9)}`;
		const errorId = `${inputId}-error`;
		const hintId = `${inputId}-hint`;

		return (
			<div className='flex flex-col gap-1.5 w-full'>
				{label && (
					<label
						htmlFor={inputId}
						className='text-sm font-medium text-neutral-700'>
						{label}
						{rest.required && (
							<span aria-hidden='true' className='text-danger-500 ml-1'>
								*
							</span>
						)}
					</label>
				)}

				<div className='relative flex items-center'>
					{leftIcon && (
						<span
							aria-hidden='true'
							className='absolute left-3 text-neutral-400 pointer-events-none'>
							{leftIcon}
						</span>
					)}

					<input
						ref={ref}
						id={inputId}
						aria-invalid={!!error}
						aria-describedby={
							[error ? errorId : null, hint ? hintId : null]
								.filter(Boolean)
								.join(' ') || undefined
						}
						className={[
							'w-full rounded-md border bg-white text-sm text-neutral-900',
							'placeholder:text-neutral-400',
							'transition-colors duration-150',
							'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-0 focus:border-transparent',
							'disabled:bg-neutral-50 disabled:text-neutral-400 disabled:cursor-not-allowed',
							leftIcon ? 'pl-9' : 'pl-3',
							rightIcon ? 'pr-9' : 'pr-3',
							'py-2',
							error
								? 'border-danger-500 focus:ring-danger-500'
								: 'border-neutral-300',
							className,
						].join(' ')}
						{...rest}
					/>

					{rightIcon && (
						<span
							aria-hidden='true'
							className='absolute right-3 text-neutral-400 pointer-events-none'>
							{rightIcon}
						</span>
					)}
				</div>

				{error && (
					<p id={errorId} role='alert' className='text-xs text-danger-500'>
						{error}
					</p>
				)}

				{hint && !error && (
					<p id={hintId} className='text-xs text-neutral-500'>
						{hint}
					</p>
				)}
			</div>
		);
	},
);

Input.displayName = 'Input';
