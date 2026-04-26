import { v4 as uuidv4 } from 'uuid';

export const generateId = (): string => uuidv4();

export const getCurrentISODate = (): string => new Date().toISOString();

export const formatDate = (isoString: string): string => {
	return new Intl.DateTimeFormat('tr-TR', {
		day: '2-digit',
		month: 'short',
		year: 'numeric',
	}).format(new Date(isoString));
};

// Utility to simulate async API delay
export const sleep = (ms: number): Promise<void> =>
	new Promise((resolve) => setTimeout(resolve, ms));

// Normalize string for case-insensitive comparison
export const normalizeString = (str: string): string =>
	str.toLowerCase().trim();
