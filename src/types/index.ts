// ─── Role Types ──────────────────────────────────────────────
export type Role = 'Admin' | 'Doctor' | 'Patient';

// ─── Permission Types ────────────────────────────────────────
export type Permission =
	| 'read'
	| 'write'
	| 'delete'
	| 'manage_users'
	| 'view_reports'
	| 'edit_records';

// ─── User Model ──────────────────────────────────────────────
export interface User {
	id: string;
	name: string;
	role: Role;
	permissions: Permission[];
	createdAt: string;
}

// ─── Form Types ──────────────────────────────────────────────
export interface UserFormValues {
	name: string;
	role: Role;
	permissions: Permission[];
}

// ─── API Response Types ──────────────────────────────────────
export interface ApiResponse<T> {
	data: T;
	success: boolean;
	message?: string;
}

// ─── Filter / Pagination Types ───────────────────────────────
export interface UserFilters {
	search: string;
	role: Role | 'All';
}

export interface PaginationState {
	currentPage: number;
	pageSize: number;
	totalItems: number;
}

// ─── UI State Types ──────────────────────────────────────────
export type ModalMode = 'add' | 'edit' | null;

export interface UserModalState {
	mode: ModalMode;
	selectedUser: User | null;
}
