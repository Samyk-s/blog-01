/** @type {import('tailwindcss').Config} */
import flowbitePlugin from 'flowbite/plugin';

export default {
  content: [
    "./index.html", "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js",  // Ensure this path is correct based on your setup
  ],
  theme: {
    extend: {},
  },
  plugins: [flowbitePlugin],  // Use the imported plugin
};
