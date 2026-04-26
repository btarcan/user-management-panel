import {
	Dialog,
	DialogPanel,
	DialogTitle,
	Transition,
	TransitionChild,
} from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { Fragment, type ReactNode } from 'react';

interface ModalProps {
	isOpen: boolean;
	onClose: () => void;
	title: string;
	children: ReactNode;
	size?: 'sm' | 'md' | 'lg';
}

const sizeClasses = {
	sm: 'max-w-sm',
	md: 'max-w-md',
	lg: 'max-w-lg',
};

export const Modal = ({
	isOpen,
	onClose,
	title,
	children,
	size = 'md',
}: ModalProps) => {
	return (
		<Transition appear show={isOpen} as={Fragment}>
			<Dialog as='div' className='relative z-50' onClose={onClose}>
				{/* Backdrop */}
				<TransitionChild
					as={Fragment}
					enter='ease-out duration-200'
					enterFrom='opacity-0'
					enterTo='opacity-100'
					leave='ease-in duration-150'
					leaveFrom='opacity-100'
					leaveTo='opacity-0'>
					<div
						className='fixed inset-0 bg-neutral-900/50 backdrop-blur-sm'
						aria-hidden='true'
					/>
				</TransitionChild>

				{/* Modal panel */}
				<div className='fixed inset-0 overflow-y-auto'>
					<div className='flex min-h-full items-center justify-center p-4'>
						<TransitionChild
							as={Fragment}
							enter='ease-out duration-200'
							enterFrom='opacity-0 scale-95'
							enterTo='opacity-100 scale-100'
							leave='ease-in duration-150'
							leaveFrom='opacity-100 scale-100'
							leaveTo='opacity-0 scale-95'>
							<DialogPanel
								className={[
									'w-full bg-white rounded-xl shadow-modal',
									'divide-y divide-neutral-100',
									sizeClasses[size],
								].join(' ')}>
								{/* Header */}
								<div className='flex items-center justify-between px-6 py-4'>
									<DialogTitle
										as='h2'
										className='text-lg font-semibold text-neutral-800'>
										{title}
									</DialogTitle>
									<button
										onClick={onClose}
										aria-label='Close modal'
										className={[
											'rounded-md p-1.5 text-neutral-400',
											'hover:bg-neutral-100 hover:text-neutral-600',
											'focus-visible:outline-none focus-visible:ring-2',
											'focus-visible:ring-primary-500',
											'transition-colors duration-150',
										].join(' ')}>
										<XMarkIcon className='w-5 h-5' aria-hidden='true' />
									</button>
								</div>

								{/* Body */}
								<div className='px-6 py-5'>{children}</div>
							</DialogPanel>
						</TransitionChild>
					</div>
				</div>
			</Dialog>
		</Transition>
	);
};
