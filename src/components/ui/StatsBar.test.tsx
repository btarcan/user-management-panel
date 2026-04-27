import { screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { StatsBar } from '@components/users/StatsBar';
import {
	renderWithStore,
	loadedState,
	mockUsers,
} from '@tests/utils/renderWithStore';

describe('StatsBar', () => {
	it('renders the stats region with correct aria-label', () => {
		renderWithStore(<StatsBar />, { preloadedState: loadedState });
		expect(
			screen.getByRole('region', { name: 'User statistics' }),
		).toBeInTheDocument();
	});

	it('displays correct total user count', () => {
		renderWithStore(<StatsBar />, { preloadedState: loadedState });
		expect(screen.getByText(String(mockUsers.length))).toBeInTheDocument();
	});

	it('displays correct admin count', () => {
		renderWithStore(<StatsBar />, { preloadedState: loadedState });
		const adminCount = mockUsers.filter((u) => u.role === 'Admin').length;
		// Find the stat card for Admins
		const adminLabel = screen.getByText('Admins');
		const adminValue = adminLabel.nextElementSibling;
		expect(adminValue).toHaveTextContent(String(adminCount));
	});

	it('displays correct doctor count', () => {
		renderWithStore(<StatsBar />, { preloadedState: loadedState });
		const doctorCount = mockUsers.filter((u) => u.role === 'Doctor').length;
		const doctorLabel = screen.getByText('Doctors');
		expect(doctorLabel.nextElementSibling).toHaveTextContent(
			String(doctorCount),
		);
	});

	it('displays correct patient count', () => {
		renderWithStore(<StatsBar />, { preloadedState: loadedState });
		const patientCount = mockUsers.filter((u) => u.role === 'Patient').length;
		const patientLabel = screen.getByText('Patients');
		expect(patientLabel.nextElementSibling).toHaveTextContent(
			String(patientCount),
		);
	});
});
