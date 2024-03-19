// export default config
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'main-bright': '#47D7EA',
        'main-medium': '#5566d8',
        'main-dark': '#4065ED',
        'main-too-dark': '#4654b2',
        green: '#00FFCF',
        default: '#222222',
      },
      boxShadow: {
        light: '0 2px 4px 0px rgba(0,0,0,5%)',
      },
    },
  },
  plugins: [],
}
