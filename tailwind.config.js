/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      spacing: {
        '8xl': '96rem',
        '9xl': '128rem',
      },
      borderRadius: {
        '4xl': '2rem',
      }
    },
    colors: {
      'fern-frond': {
          '50': '#f9fbea',
          '100': '#f0f5d2',
          '200': '#e0ecaa',
          '300': '#cade78',
          '400': '#b3cd4e',
          '500': '#95b230',
          '600': '#748e22',
          '700': '#576b1e',
          '800': '#48571d',
          '900': '#3d4a1d',
          '950': '#1f280b',
      },
    },
    fontFamily: {
      sans: ['Graphik', 'sans-serif'],
      serif: ['Merriweather', 'serif'],
    }
  },
  plugins: [],    
}

