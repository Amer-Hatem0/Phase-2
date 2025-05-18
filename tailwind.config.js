/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,html}",
  ],
  theme: {
    extend: {
      colors: {
        // From your CSS files
        'dark-bg': '#111',
        'card-bg': '#252525',
        'border-gray': '#434343',
        'primary-blue': '#007bff',
        'hover-blue': '#0062cc',
        'danger-red': '#dc3545',
        'hover-red': '#c82333',
        'success-green': '#28a745',
        'hover-green': '#218838'
      },
      // Other customizations
      boxShadow: {
        'modal': '0px 4px 10px rgba(0, 0, 0, 0.2)',
      }
    }
  },
  plugins: [],
}

