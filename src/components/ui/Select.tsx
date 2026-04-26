import {
	Listbox,
	ListboxButton,
	ListboxOption,
	ListboxOptions,
} from '@headlessui/react';
import { ChevronUpDownIcon, CheckIcon } from '@heroicons/react/20/solid';

export interface SelectOption<T extends string = string> {
	value: T;
	label: string;
}

interface SelectProps<T extends string> {
	id?: string;
	label?: string;
	value: T;
	options: SelectOption<T>[];
	onChange: (value: T) => void;
	error?: string;
	disabled?: boolean;
	required?: boolean;
}

export const Select = <T extends string>({
	id,
	label,
	value,
	options,
	onChange,
	error,
	disabled,
	required,
}: SelectProps<T>) => {
	const selectId = id ?? `select-${Math.random().toString(36).slice(2, 9)}`;
	const errorId = `${selectId}-error`;
	const selectedOption = options.find((o) => o.value === value);

	return (
		<div className='flex flex-col gap-1.5 w-full'>
			{label && (
				<label
					htmlFor={selectId}
					className='text-sm font-medium text-neutral-700'>
					{label}
					{required && (
						<span aria-hidden='true' className='text-danger-500 ml-1'>
							*
						</span>
					)}
				</label>
			)}

			<Listbox value={value} onChange={onChange} disabled={disabled}>
				<div className='relative'>
					<ListboxButton
						id={selectId}
						aria-invalid={!!error}
						aria-describedby={error ? errorId : undefined}
						className={[
							'relative w-full cursor-pointer rounded-md bg-white py-2 pl-3 pr-10',
							'text-left text-sm text-neutral-900',
							'border transition-colors duration-150',
							'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent',
							'disabled:bg-neutral-50 disabled:text-neutral-400 disabled:cursor-not-allowed',
							error ? 'border-danger-500' : 'border-neutral-300',
						].join(' ')}>
						<span className='block truncate'>
							{selectedOption?.label ?? 'Select...'}
						</span>
						<span className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2'>
							<ChevronUpDownIcon
								className='w-4 h-4 text-neutral-400'
								aria-hidden='true'
							/>
						</span>
					</ListboxButton>

					<ListboxOptions
						className={[
							'absolute z-10 mt-1 w-full overflow-auto rounded-md bg-white py-1',
							'text-sm shadow-modal ring-1 ring-black/5',
							'focus:outline-none max-h-60 scrollbar-thin',
						].join(' ')}>
						{options.map((option) => (
							<ListboxOption
								key={option.value}
								value={option.value}
								className={({ focus }) =>
									[
										'relative cursor-pointer select-none py-2 pl-10 pr-4',
										focus
											? 'bg-primary-50 text-primary-900'
											: 'text-neutral-900',
									].join(' ')
								}>
								{({ selected }) => (
									<>
										<span
											className={[
												'block truncate',
												selected ? 'font-semibold' : 'font-normal',
											].join(' ')}>
											{option.label}
										</span>
										{selected && (
											<span className='absolute inset-y-0 left-0 flex items-center pl-3 text-primary-600'>
												<CheckIcon className='w-4 h-4' aria-hidden='true' />
											</span>
										)}
									</>
								)}
							</ListboxOption>
						))}
					</ListboxOptions>
				</div>
			</Listbox>

			{error && (
				<p id={errorId} role='alert' className='text-xs text-danger-500'>
					{error}
				</p>
			)}
		</div>
	);
};
