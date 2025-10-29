/** @type {import('tailwindcss').Config} */
export const content = ['./index.html', './assets/js/**/*.js'];
export const darkMode = 'class';
export const theme = {
	extend: {
		fontFamily: {
			mono: ['JetBrains Mono', 'monospace'],
			sans: ['Inter', 'sans-serif'],
		},
	},
};
export const plugins = [];
