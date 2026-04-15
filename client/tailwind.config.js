/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#3b82f6',
        background: '#f8fafc',
        foreground: '#1e293b',
        muted: '#f1f5f9',
        'muted-foreground': '#64748b',
        card: '#ffffff',
        'card-foreground': '#1e293b',
        border: '#e2e8f0',
        ring: '#3b82f6',
      },
    },
  },
  plugins: [],
}
