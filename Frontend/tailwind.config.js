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
        'salmon': {
          300: '#ffa7a7',
          400: '#ff8e8e',
        }
      },
      animation : {
        "fade-in-out": "fadeInOut 3s infinite",
        "fade-in-down" :"fadeInDown 1s ease-out",
      },
      keyframes : {
        fadeInOut: {
          "0%, 100%": { opacity: 0 },
          "50%": { opacity: 1 },
        },
        fadeInDown: {
          "0%": { opacity: 0, transform: "translateY(-20px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [
    flowbite.plugin()
  ],
}