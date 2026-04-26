import type { Permission, Role } from '@/types';

export const ROLES: Role[] = ['Admin', 'Doctor', 'Patient'];

export const PERMISSIONS: Permission[] = [
	'read',
	'write',
	'delete',
	'manage_users',
	'view_reports',
	'edit_records',
];

// Default permissions assigned per role
export const DEFAULT_PERMISSIONS: Record<Role, Permission[]> = {
	Admin: [
		'read',
		'write',
		'delete',
		'manage_users',
		'view_reports',
		'edit_records',
	],
	Doctor: ['read', 'write', 'view_reports', 'edit_records'],
	Patient: ['read'],
};

export const PAGE_SIZE_OPTIONS = [5, 10, 20] as const;
export const DEFAULT_PAGE_SIZE = 10;

// Tailwind class strings for role badge styling
export const ROLE_COLORS: Record<Role, string> = {
	Admin: 'bg-danger-50 text-danger-700 ring-danger-600/20',
	Doctor: 'bg-primary-50 text-primary-700 ring-primary-600/20',
	Patient: 'bg-success-50 text-success-700 ring-success-600/20',
};

export const PERMISSION_LABELS: Record<Permission, string> = {
	read: 'Read',
	write: 'Write',
	delete: 'Delete',
	manage_users: 'Manage Users',
	view_reports: 'View Reports',
	edit_records: 'Edit Records',
};
