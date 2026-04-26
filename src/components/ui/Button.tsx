import { forwardRef, type ButtonHTMLAttributes } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: ButtonVariant;
	size?: ButtonSize;
	isLoading?: boolean;
	leftIcon?: React.ReactNode;
	rightIcon?: React.ReactNode;
}

const variantClasses: Record<ButtonVariant, string> = {
	primary:
		'bg-primary-600 text-white hover:bg-primary-700 active:bg-primary-800 disabled:bg-primary-300',
	secondary:
		'bg-white text-neutral-700 ring-1 ring-inset ring-neutral-300 hover:bg-neutral-50 active:bg-neutral-100 disabled:text-neutral-400',
	danger:
		'bg-danger-500 text-white hover:bg-danger-700 active:bg-danger-800 disabled:bg-danger-300',
	ghost:
		'bg-transparent text-neutral-600 hover:bg-neutral-100 active:bg-neutral-200 disabled:text-neutral-400',
};

const sizeClasses: Record<ButtonSize, string> = {
	sm: 'px-3 py-1.5 text-xs gap-1.5',
	md: 'px-4 py-2 text-sm gap-2',
	lg: 'px-5 py-2.5 text-base gap-2',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
	(
		{
			variant = 'primary',
			size = 'md',
			isLoading = false,
			leftIcon,
			rightIcon,
			disabled,
			children,
			className = '',
			...rest
		},
		ref,
	) => {
		const isDisabled = disabled || isLoading;

		return (
			<button
				ref={ref}
				disabled={isDisabled}
				aria-busy={isLoading}
				className={[
					'inline-flex items-center justify-center font-medium rounded-md',
					'transition-colors duration-150 cursor-pointer',
					'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2',
					'disabled:cursor-not-allowed',
					variantClasses[variant],
					sizeClasses[size],
					className,
				].join(' ')}
				{...rest}>
				{isLoading ? (
					<>
						<span
							aria-hidden='true'
							className='w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin'
						/>
						<span>Loading...</span>
					</>
				) : (
					<button>
						{leftIcon && <span aria-hidden='true'>{leftIcon}</span>}
						{children}
						{rightIcon && <span aria-hidden='true'>{rightIcon}</span>}
					</button>
				)}
			</button>
		);
	},
);

Button.displayName = 'Button';
