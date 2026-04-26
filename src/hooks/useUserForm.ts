import { useState, useEffect, useCallback } from 'react';
import { useAppDispatch } from '@store/hooks';
import { addUser, updateUser } from '@features/users/usersSlice';
import { clearError } from '@features/users/usersSlice';
import { DEFAULT_PERMISSIONS } from '@utils/constants';
import type { User, UserFormValues, Role, Permission } from '@/types';

interface FormErrors {
	name?: string;
	permissions?: string;
}

interface UseUserFormReturn {
	values: UserFormValues;
	errors: FormErrors;
	handleNameChange: (value: string) => void;
	handleRoleChange: (value: Role) => void;
	handlePermissionToggle: (permission: Permission) => void;
	handleSubmit: () => void;
	isValid: boolean;
}

const DEFAULT_ROLE: Role = 'Patient';

const buildInitialValues = (user: User | null): UserFormValues => {
	if (user) {
		return {
			name: user.name,
			role: user.role,
			permissions: [...user.permissions],
		};
	}
	return {
		name: '',
		role: DEFAULT_ROLE,
		permissions: DEFAULT_PERMISSIONS[DEFAULT_ROLE],
	};
};

export const useUserForm = (
	mode: 'add' | 'edit' | null,
	selectedUser: User | null,
): UseUserFormReturn => {
	const dispatch = useAppDispatch();

	const [values, setValues] = useState<UserFormValues>(
		buildInitialValues(selectedUser),
	);
	const [errors, setErrors] = useState<FormErrors>({});

	// Reset form when modal opens with new context
	useEffect(() => {
		setValues(buildInitialValues(selectedUser));
		setErrors({});
	}, [selectedUser, mode]);

	const validate = (currentValues: UserFormValues): FormErrors => {
		const newErrors: FormErrors = {};

		if (!currentValues.name.trim()) {
			newErrors.name = 'Name is required.';
		} else if (currentValues.name.trim().length < 2) {
			newErrors.name = 'Name must be at least 2 characters.';
		}

		if (currentValues.permissions.length === 0) {
			newErrors.permissions = 'At least one permission must be selected.';
		}

		return newErrors;
	};

	const handleNameChange = useCallback(
		(value: string) => {
			setValues((prev) => ({ ...prev, name: value }));
			// Clear field error on change
			if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
			dispatch(clearError());
		},
		[errors.name, dispatch],
	);

	const handleRoleChange = useCallback((value: Role) => {
		setValues((prev) => ({
			...prev,
			role: value,
			// Auto-assign default permissions when role changes
			permissions: DEFAULT_PERMISSIONS[value],
		}));
	}, []);

	const handlePermissionToggle = useCallback(
		(permission: Permission) => {
			setValues((prev) => {
				const hasPermission = prev.permissions.includes(permission);
				const updatedPermissions = hasPermission
					? prev.permissions.filter((p) => p !== permission)
					: [...prev.permissions, permission];
				return { ...prev, permissions: updatedPermissions };
			});
			// Clear permission error on change
			if (errors.permissions)
				setErrors((prev) => ({ ...prev, permissions: undefined }));
		},
		[errors.permissions],
	);

	const handleSubmit = useCallback(() => {
		const validationErrors = validate(values);

		if (Object.keys(validationErrors).length > 0) {
			setErrors(validationErrors);
			return;
		}

		if (mode === 'edit' && selectedUser) {
			dispatch(updateUser({ id: selectedUser.id, values }));
		} else {
			dispatch(addUser(values));
		}
	}, [values, mode, selectedUser, dispatch]);

	const isValid =
		values.name.trim().length >= 2 && values.permissions.length > 0;

	return {
		values,
		errors,
		handleNameChange,
		handleRoleChange,
		handlePermissionToggle,
		handleSubmit,
		isValid,
	};
};
