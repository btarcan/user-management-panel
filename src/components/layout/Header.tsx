export const Header = () => {
	return (
		<header className='bg-white border-b border-neutral-200 shadow-card'>
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
				<div className='flex items-center justify-between h-16'>
					{/* Logo + Brand */}
					<div className='flex items-center gap-3'>
						<div
							aria-hidden='true'
							className='w-9 h-9 rounded-lg bg-primary-600 flex items-center justify-center'>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								className='w-5 h-5 text-white'
								viewBox='0 0 24 24'
								fill='none'
								stroke='currentColor'
								strokeWidth={2}
								strokeLinecap='round'
								strokeLinejoin='round'
								aria-hidden='true'>
								<path d='M22 12h-4l-3 9L9 3l-3 9H2' />
							</svg>
						</div>
						<div>
							<p className='text-sm font-bold text-neutral-800 leading-none'>
								HealthPortal
							</p>
							<p className='text-xs text-neutral-400 mt-0.5'>Admin Dashboard</p>
						</div>
					</div>

					{/* Right side — placeholder for future nav items */}
					<div className='flex items-center gap-3'>
						<div
							aria-hidden='true'
							className='w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center'>
							<span className='text-sm font-semibold text-primary-700'>A</span>
						</div>
						<div className='hidden sm:block'>
							<p className='text-sm font-medium text-neutral-700 leading-none'>
								Admin
							</p>
							<p className='text-xs text-neutral-400 mt-0.5'>
								System Administrator
							</p>
						</div>
					</div>
				</div>
			</div>
		</header>
	);
};
