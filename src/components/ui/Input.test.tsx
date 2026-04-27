import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { Input } from '@components/ui';

describe('Input', () => {
	it('renders label when provided', () => {
		render(<Input id='test' label='Full Name' />);
		expect(screen.getByLabelText('Full Name')).toBeInTheDocument();
	});

	it('shows required indicator when required prop is set', () => {
		render(<Input id='test' label='Name' required />);
		expect(screen.getByText('*')).toBeInTheDocument();
	});

	it('displays error message and sets aria-invalid', () => {
		render(<Input id='test' label='Name' error='Name is required.' />);

		expect(screen.getByRole('alert')).toHaveTextContent('Name is required.');
		expect(screen.getByRole('textbox')).toHaveAttribute('aria-invalid', 'true');
	});

	it('displays hint text when no error', () => {
		render(<Input id='test' hint='At least 2 characters.' />);
		expect(screen.getByText('At least 2 characters.')).toBeInTheDocument();
	});

	it('does not show hint when error is present', () => {
		render(<Input id='test' error='Required.' hint='At least 2 characters.' />);
		expect(
			screen.queryByText('At least 2 characters.'),
		).not.toBeInTheDocument();
	});

	it('calls onChange handler on user input', async () => {
		const handleChange = vi.fn();
		render(<Input id='test' onChange={handleChange} />);

		await userEvent.type(screen.getByRole('textbox'), 'hello');
		expect(handleChange).toHaveBeenCalled();
	});

	it('is disabled when disabled prop is set', () => {
		render(<Input id='test' disabled />);
		expect(screen.getByRole('textbox')).toBeDisabled();
	});
});
