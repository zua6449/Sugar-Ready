/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      boxShadow: {
        'text-sm': '1px 1px 0 rgba(0, 0, 0, 0.2)',
        'text-md': '2px 2px 0 rgba(0, 0, 0, 0.2)',
        'text-lg': '3px 3px 0 rgba(0, 0, 0, 0.2)',
        'text-xl': '4px 4px 0 rgba(0, 0, 0, 0.2)',
        'text-2xl': '5px 5px 0 rgba(0, 0, 0, 0.2)',
      }
    },
  },
  plugins: [
    function({ addUtilities }) {
      addUtilities({
        '.text-shadow-sm': {
          textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)',
        },
        '.text-shadow-md': {
          textShadow: '2px 2px 3px rgba(0, 0, 0, 0.5)',
        },
        '.text-shadow-lg': {
          textShadow: '3px 3px 4px rgba(0, 0, 0, 0.5)',
        },
        '.text-shadow-xl': {
          textShadow: '4px 4px 5px rgba(0, 0, 0, 0.5)',
        },
      }, ['responsive', 'hover']);
    }
  ],
};
