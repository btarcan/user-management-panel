import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { Button } from '@components/ui';

describe('Button', () => {
	it('renders children correctly', () => {
		render(<Button>Click me</Button>);
		expect(
			screen.getByRole('button', { name: 'Click me' }),
		).toBeInTheDocument();
	});

	it('calls onClick handler when clicked', async () => {
		const handleClick = vi.fn();
		render(<Button onClick={handleClick}>Click me</Button>);

		await userEvent.click(screen.getByRole('button'));
		expect(handleClick).toHaveBeenCalledTimes(1);
	});

	it('does not call onClick when disabled', async () => {
		const handleClick = vi.fn();
		render(
			<Button disabled onClick={handleClick}>
				Click me
			</Button>,
		);

		await userEvent.click(screen.getByRole('button'));
		expect(handleClick).not.toHaveBeenCalled();
	});

	it('shows loading spinner and disables button when isLoading is true', () => {
		render(<Button isLoading>Submit</Button>);

		const button = screen.getByRole('button');
		expect(button).toBeDisabled();
		expect(button).toHaveAttribute('aria-busy', 'true');
		expect(screen.getByText('Loading...')).toBeInTheDocument();
	});

	it('renders leftIcon when provided', () => {
		render(<Button leftIcon={<span data-testid='icon' />}>With Icon</Button>);
		expect(screen.getByTestId('icon')).toBeInTheDocument();
	});

	it('applies danger variant classes', () => {
		render(<Button variant='danger'>Delete</Button>);
		expect(screen.getByRole('button')).toHaveClass('bg-danger-500');
	});

	it('applies correct size classes', () => {
		render(<Button size='lg'>Large</Button>);
		expect(screen.getByRole('button')).toHaveClass('px-5');
	});
});
