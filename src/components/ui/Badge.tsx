import type { Role } from '@/types';
import { ROLE_COLORS } from '@utils/constants';

interface BadgeProps {
	label: string;
	variant?: 'role' | 'permission' | 'neutral';
	role?: Role;
}

const permissionClass = 'bg-neutral-100 text-neutral-600 ring-neutral-500/20';

const neutralClass = 'bg-neutral-100 text-neutral-600 ring-neutral-500/20';

export const Badge = ({ label, variant = 'neutral', role }: BadgeProps) => {
	const colorClass =
		variant === 'role' && role
			? ROLE_COLORS[role]
			: variant === 'permission'
				? permissionClass
				: neutralClass;

	return (
		<span
			className={[
				'inline-flex items-center rounded-full px-2.5 py-0.5',
				'text-xs font-medium ring-1 ring-inset',
				colorClass,
			].join(' ')}>
			{label}
		</span>
	);
};
