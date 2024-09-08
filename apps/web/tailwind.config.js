/** @type {import('tailwindcss').Config} */
<<<<<<< HEAD
import daisyui from "daisyui"
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
=======
module.exports = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdex}',
    './src/components/**/*.{js,ts,jsx,tsx,mdex}',
    './src/pages/**/*.{js,ts,jsx,tsx,mdex}',
>>>>>>> 5e6e1229faabd968e6b2d5ba2500cf4dec973d28
  ],
  theme: {
    extend: {},
  },
<<<<<<< HEAD
  plugins: [daisyui],
}
=======
  plugins: [],
};
>>>>>>> 5e6e1229faabd968e6b2d5ba2500cf4dec973d28
