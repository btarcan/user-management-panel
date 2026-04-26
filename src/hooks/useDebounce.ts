import { useState, useEffect } from 'react';

// Delays updating the returned value until the delay has passed
// Useful for search inputs to avoid firing on every keystroke
export const useDebounce = <T>(value: T, delay: number = 400): T => {
	const [debouncedValue, setDebouncedValue] = useState<T>(value);

	useEffect(() => {
		const timer = setTimeout(() => {
			setDebouncedValue(value);
		}, delay);

		return () => clearTimeout(timer);
	}, [value, delay]);

	return debouncedValue;
};
