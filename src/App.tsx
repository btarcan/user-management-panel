import { Header } from '@components/layout';
import { UsersPage } from '@pages/index';

const App = () => {
	return (
		<div className='min-h-screen bg-neutral-50 flex flex-col'>
			<Header />
			<main
				id='main-content'
				className='flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8'>
				<UsersPage />
			</main>

			{/* Footer */}
			<footer className='border-t border-neutral-200 bg-white mt-auto'>
				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4'>
					<p className='text-xs text-neutral-400 text-center'>
						HealthPortal User Management © {new Date().getFullYear()}
					</p>
				</div>
			</footer>
		</div>
	);
};

export default App;
