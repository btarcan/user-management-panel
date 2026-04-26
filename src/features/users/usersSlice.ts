import {
	createSlice,
	createAsyncThunk,
	type PayloadAction,
} from '@reduxjs/toolkit';
import type { User, UserFormValues, UserFilters, ModalMode } from '@/types';
import { fakeApi } from '@services/fakeApi';
import { initialUsers } from '@services/initialData';
import { DEFAULT_PAGE_SIZE } from '@utils/constants';

// ─── State Shape ─────────────────────────────────────────────
export interface UsersState {
	items: User[];
	status: 'idle' | 'loading' | 'succeeded' | 'failed';
	error: string | null;
	filters: UserFilters;
	pagination: {
		currentPage: number;
		pageSize: number;
	};
	modal: {
		mode: ModalMode;
		selectedUser: User | null;
	};
}

const initialState: UsersState = {
	items: [],
	status: 'idle',
	error: null,
	filters: {
		search: '',
		role: 'All',
	},
	pagination: {
		currentPage: 1,
		pageSize: DEFAULT_PAGE_SIZE,
	},
	modal: {
		mode: null,
		selectedUser: null,
	},
};

// ─── Async Thunks ────────────────────────────────────────────
export const fetchUsers = createAsyncThunk(
	'users/fetchUsers',
	async (_, { rejectWithValue }) => {
		// Seed the mock database on first load
		fakeApi.seedUsers(initialUsers);
		const response = await fakeApi.getUsers();
		if (!response.success) return rejectWithValue(response.message);
		return response.data;
	},
);

export const addUser = createAsyncThunk(
	'users/addUser',
	async (values: UserFormValues, { rejectWithValue }) => {
		const response = await fakeApi.addUser(values);
		if (!response.success) return rejectWithValue(response.message);
		return response.data;
	},
);

export const updateUser = createAsyncThunk(
	'users/updateUser',
	async (
		{ id, values }: { id: string; values: Partial<UserFormValues> },
		{ rejectWithValue },
	) => {
		const response = await fakeApi.updateUser(id, values);
		if (!response.success) return rejectWithValue(response.message);
		return response.data;
	},
);

export const deleteUser = createAsyncThunk(
	'users/deleteUser',
	async (id: string, { rejectWithValue }) => {
		const response = await fakeApi.deleteUser(id);
		if (!response.success) return rejectWithValue(response.message);
		return id;
	},
);

// ─── Slice ───────────────────────────────────────────────────
const usersSlice = createSlice({
	name: 'users',
	initialState,
	reducers: {
		// Filter actions
		setSearchFilter(state, action: PayloadAction<string>) {
			state.filters.search = action.payload;
			state.pagination.currentPage = 1; // Reset to first page on filter change
		},
		setRoleFilter(state, action: PayloadAction<UserFilters['role']>) {
			state.filters.role = action.payload;
			state.pagination.currentPage = 1;
		},
		resetFilters(state) {
			state.filters = initialState.filters;
			state.pagination.currentPage = 1;
		},

		// Pagination actions
		setCurrentPage(state, action: PayloadAction<number>) {
			state.pagination.currentPage = action.payload;
		},
		setPageSize(state, action: PayloadAction<number>) {
			state.pagination.pageSize = action.payload;
			state.pagination.currentPage = 1;
		},

		// Modal actions
		openAddModal(state) {
			state.modal.mode = 'add';
			state.modal.selectedUser = null;
			state.error = null;
		},
		openEditModal(state, action: PayloadAction<User>) {
			state.modal.mode = 'edit';
			state.modal.selectedUser = action.payload;
			state.error = null;
		},
		closeModal(state) {
			state.modal.mode = null;
			state.modal.selectedUser = null;
			state.error = null;
		},

		// Clear error manually (e.g. on form change)
		clearError(state) {
			state.error = null;
		},
	},
	extraReducers: (builder) => {
		// ── fetchUsers ──────────────────────────────────────────
		builder
			.addCase(fetchUsers.pending, (state) => {
				state.status = 'loading';
				state.error = null;
			})
			.addCase(fetchUsers.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.items = action.payload;
			})
			.addCase(fetchUsers.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.payload as string;
			});

		// ── addUser ─────────────────────────────────────────────
		builder
			.addCase(addUser.pending, (state) => {
				state.status = 'loading';
				state.error = null;
			})
			.addCase(addUser.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.items.push(action.payload);
				state.modal.mode = null;
				state.modal.selectedUser = null;
			})
			.addCase(addUser.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.payload as string;
			});

		// ── updateUser ──────────────────────────────────────────
		builder
			.addCase(updateUser.pending, (state) => {
				state.status = 'loading';
				state.error = null;
			})
			.addCase(updateUser.fulfilled, (state, action) => {
				state.status = 'succeeded';
				const index = state.items.findIndex((u) => u.id === action.payload.id);
				if (index !== -1) state.items[index] = action.payload;
				state.modal.mode = null;
				state.modal.selectedUser = null;
			})
			.addCase(updateUser.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.payload as string;
			});

		// ── deleteUser ──────────────────────────────────────────
		builder
			.addCase(deleteUser.pending, (state) => {
				state.status = 'loading';
				state.error = null;
			})
			.addCase(deleteUser.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.items = state.items.filter((u) => u.id !== action.payload);
			})
			.addCase(deleteUser.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.payload as string;
			});
	},
});

export const {
	setSearchFilter,
	setRoleFilter,
	resetFilters,
	setCurrentPage,
	setPageSize,
	openAddModal,
	openEditModal,
	closeModal,
	clearError,
} = usersSlice.actions;

export default usersSlice.reducer;
