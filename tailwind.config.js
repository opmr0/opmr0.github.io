/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{svelte,js,ts}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"DM Serif Display"', 'Georgia', 'serif'],
        mono: ['"Geist Mono"', '"Space Mono"', 'monospace'],
        sans: ['"Geist"', 'system-ui', 'sans-serif'],
      },
      colors: {
        ink: '#0c0c0c',
        surface: '#111111',
        'surface-2': '#161616',
        border: '#1f1f1f',
        'border-hi': '#2e2e2e',
        dim: '#4a4a4a',
        muted: '#6b6b6b',
        subtle: '#999999',
        paper: '#e8e8e6',
      },
    },
  },
  plugins: [],
}
