/** @type {import('tailwindcss').Config} */
import withMT from '@material-tailwind/react/utils/withMT';

export default withMT({
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // primary: "#1E40AF", // Custom blue
        // secondary: "#9333EA", // Custom purple
        accent: "#78b4fe", // Custom yellow
        'accent-light':"#e4f0ff"
        // dark: "#111827", // Custom dark gray
      },
    },
  },
  plugins: [  
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/forms')
  ],
})