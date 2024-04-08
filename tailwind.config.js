// tailwind.config.js

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // Remove default button styles
      // Reference: https://tailwindcss.com/docs/theme#removing-defaults
      borderWidth: {
        DEFAULT: '0',
      },
      // Add any other customizations or overrides here
    },
  },
  plugins: [],
};
