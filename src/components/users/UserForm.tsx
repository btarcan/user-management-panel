import { Input, Select, Button } from '@components/ui';
import { useUserForm } from '@hooks/useUserForm';
import { ROLES, PERMISSIONS, PERMISSION_LABELS } from '@utils/constants';
import type { User, Role } from '@/types';

interface UserFormProps {
	mode: 'add' | 'edit' | null;
	selectedUser: User | null;
	isLoading: boolean;
	apiError: string | null;
	onClose: () => void;
}

const roleOptions = ROLES.map((r) => ({ value: r, label: r }));

export const UserForm = ({
	mode,
	selectedUser,
	isLoading,
	apiError,
	onClose,
}: UserFormProps) => {
	const {
		values,
		errors,
		handleNameChange,
		handleRoleChange,
		handlePermissionToggle,
		handleSubmit,
		isValid,
	} = useUserForm(mode, selectedUser);

	return (
		<div className='flex flex-col gap-5'>
			{/* API error banner */}
			{apiError && (
				<div
					role='alert'
					aria-live='assertive'
					className='rounded-md bg-danger-50 border border-danger-200 px-4 py-3 text-sm text-danger-700'>
					{apiError}
				</div>
			)}

			{/* Name field */}
			<Input
				id='user-name'
				label='Full Name'
				placeholder='Enter full name'
				value={values.name}
				onChange={(e) => handleNameChange(e.target.value)}
				error={errors.name}
				required
				autoFocus
				autoComplete='off'
			/>

			{/* Role selector */}
			<Select<Role>
				id='user-role'
				label='Role'
				value={values.role}
				options={roleOptions}
				onChange={handleRoleChange}
				required
			/>

			{/* Permissions */}
			<fieldset>
				<legend className='text-sm font-medium text-neutral-700 mb-2'>
					Permissions
					<span aria-hidden='true' className='text-danger-500 ml-1'>
						*
					</span>
				</legend>

				<div className='grid grid-cols-2 gap-2'>
					{PERMISSIONS.map((permission) => {
						const isChecked = values.permissions.includes(permission);
						const checkboxId = `permission-${permission}`;

						return (
							<label
								key={permission}
								htmlFor={checkboxId}
								className={[
									'flex items-center gap-2.5 rounded-md border px-3 py-2 cursor-pointer',
									'text-sm transition-colors duration-150',
									isChecked
										? 'border-primary-400 bg-primary-50 text-primary-800'
										: 'border-neutral-200 bg-white text-neutral-600 hover:bg-neutral-50',
								].join(' ')}>
								<input
									type='checkbox'
									id={checkboxId}
									checked={isChecked}
									onChange={() => handlePermissionToggle(permission)}
									className='w-4 h-4 rounded border-neutral-300 text-primary-600 focus:ring-primary-500'
									aria-describedby={
										errors.permissions ? 'permissions-error' : undefined
									}
								/>
								{PERMISSION_LABELS[permission]}
							</label>
						);
					})}
				</div>

				{errors.permissions && (
					<p
						id='permissions-error'
						role='alert'
						className='mt-1.5 text-xs text-danger-500'>
						{errors.permissions}
					</p>
				)}
			</fieldset>

			{/* Form actions */}
			<div className='flex justify-end gap-3 pt-1'>
				<Button variant='secondary' onClick={onClose} disabled={isLoading}>
					Cancel
				</Button>
				<Button
					variant='primary'
					onClick={handleSubmit}
					isLoading={isLoading}
					disabled={!isValid || isLoading}
					aria-disabled={!isValid || isLoading}>
					{mode === 'edit' ? 'Save Changes' : 'Add User'}
				</Button>
			</div>
		</div>
	);
};
