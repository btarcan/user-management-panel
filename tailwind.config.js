/***@type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			colors: {
				primary: {
					50: '#eff6ff',
					100: '#dbeafe',
					200: '#bfdbfe',
					300: '#93c5fd',
					400: '#60a5fa',
					500: '#3b82f6',
					600: '#2563eb',
					700: '#1d4ed8',
					800: '#1e40af',
					900: '#1e3a8a',
				},
				success: {
					50: '#f0fdf4',
					500: '#22c55e',
					700: '#15803d',
				},
				warning: {
					50: '#fffbeb',
					500: '#f59e0b',
					700: '#b45309',
				},
				danger: {
					50: '#fef2f2',
					500: '#ef4444',
					700: '#b91c1c',
				},
				neutral: {
					50: '#f8fafc',
					100: '#f1f5f9',
					200: '#e2e8f0',
					300: '#cbd5e1',
					400: '#94a3b8',
					500: '#64748b',
					600: '#475569',
					700: '#334155',
					800: '#1e293b',
					900: '#0f172a',
				},
			},
			fontFamily: {
				sans: ['Inter', 'system-ui', 'sans-serif'],
			},
			fontSize: {
				xs: ['0.75rem', { lineHeight: '1rem' }],
				sm: ['0.875rem', { lineHeight: '1.25rem' }],
				base: ['1rem', { lineHeight: '1.5rem' }],
				lg: ['1.125rem', { lineHeight: '1.75rem' }],
				xl: ['1.25rem', { lineHeight: '1.75rem' }],
				'2xl': ['1.5rem', { lineHeight: '2rem' }],
			},
			borderRadius: {
				DEFAULT: '0.5rem',
				sm: '0.25rem',
				md: '0.5rem',
				lg: '0.75rem',
				xl: '1rem',
			},
			boxShadow: {
				card: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
				modal: '0 20px 60px -10px rgb(0 0 0 / 0.25)',
			},
			spacing: {
				18: '4.5rem',
				88: '22rem',
				112: '28rem',
				128: '32rem',
			},
		},
	},
	plugins: [],
};
