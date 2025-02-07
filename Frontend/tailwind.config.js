const flowbite = require("flowbite-react/tailwind");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js, jsx,tsx}",
    flowbite.content()
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1D3557',
        secondary: '#E63A47',
      },
    },
  },
  plugins: [
    flowbite.plugin()
  ],
}