import { configureStore } from '@reduxjs/toolkit';
import usersReducer from '@features/users/usersSlice';

export const store = configureStore({
	reducer: {
		users: usersReducer,
	},
	devTools: import.meta.env.DEV,
});

// Infer RootState and AppDispatch from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
