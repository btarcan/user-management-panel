import { useAppSelector } from '@store/hooks';
import { selectUserStats } from '@features/users/usersSelectors';
import {
	UsersIcon,
	ShieldCheckIcon,
	UserGroupIcon,
	HeartIcon,
} from '@heroicons/react/24/outline';

interface StatCardProps {
	label: string;
	value: number;
	icon: React.ReactNode;
	colorClass: string;
}

const StatCard = ({ label, value, icon, colorClass }: StatCardProps) => (
	<div className='flex items-center gap-3 bg-white rounded-lg border border-neutral-200 px-4 py-3 shadow-card'>
		<div
			aria-hidden='true'
			className={`w-9 h-9 rounded-md flex items-center justify-center ${colorClass}`}>
			{icon}
		</div>
		<div>
			<p className='text-xs text-neutral-500 font-medium'>{label}</p>
			<p className='text-lg font-bold text-neutral-800'>{value}</p>
		</div>
	</div>
);

export const StatsBar = () => {
	const stats = useAppSelector(selectUserStats);

	return (
		<div
			role='region'
			aria-label='User statistics'
			className='grid grid-cols-2 sm:grid-cols-4 gap-3'>
			<StatCard
				label='Total Users'
				value={stats.total}
				icon={<UsersIcon className='w-5 h-5 text-neutral-600' />}
				colorClass='bg-neutral-100'
			/>
			<StatCard
				label='Admins'
				value={stats.admins}
				icon={<ShieldCheckIcon className='w-5 h-5 text-danger-600' />}
				colorClass='bg-danger-50'
			/>
			<StatCard
				label='Doctors'
				value={stats.doctors}
				icon={<UserGroupIcon className='w-5 h-5 text-primary-600' />}
				colorClass='bg-primary-50'
			/>
			<StatCard
				label='Patients'
				value={stats.patients}
				icon={<HeartIcon className='w-5 h-5 text-success-700' />}
				colorClass='bg-success-50'
			/>
		</div>
	);
};
