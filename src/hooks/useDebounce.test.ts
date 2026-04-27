import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { useDebounce } from '@hooks/useDebounce';

describe('useDebounce', () => {
	beforeEach(() => vi.useFakeTimers());
	afterEach(() => vi.useRealTimers());

	it('returns initial value immediately', () => {
		const { result } = renderHook(() => useDebounce('hello', 400));
		expect(result.current).toBe('hello');
	});

	it('does not update value before delay has passed', () => {
		const { result, rerender } = renderHook(
			({ value }) => useDebounce(value, 400),
			{ initialProps: { value: 'initial' } },
		);

		rerender({ value: 'updated' });
		act(() => vi.advanceTimersByTime(200));

		expect(result.current).toBe('initial');
	});

	it('updates value after delay has passed', () => {
		const { result, rerender } = renderHook(
			({ value }) => useDebounce(value, 400),
			{ initialProps: { value: 'initial' } },
		);

		rerender({ value: 'updated' });
		act(() => vi.advanceTimersByTime(400));

		expect(result.current).toBe('updated');
	});

	it('resets timer on rapid consecutive updates', () => {
		const { result, rerender } = renderHook(
			({ value }) => useDebounce(value, 400),
			{ initialProps: { value: 'a' } },
		);

		rerender({ value: 'ab' });
		act(() => vi.advanceTimersByTime(200));

		rerender({ value: 'abc' });
		act(() => vi.advanceTimersByTime(200));

		expect(result.current).toBe('a');

		act(() => vi.advanceTimersByTime(200));
		expect(result.current).toBe('abc');
	});
});
