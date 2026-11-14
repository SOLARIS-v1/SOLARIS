/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Core Palette
        burgundy: {
          DEFAULT: '#542B38',
          50: '#F9F5F6',
          100: '#F0E6E9',
          200: '#DCC3C9',
          300: '#C49CA7',
          400: '#8A4A5D',
          500: '#542B38', // Primary
          600: '#47242F',
          700: '#3A1C26',
          800: '#2E151E',
          900: '#200D14',
          dark: '#3E1F29',
          light: '#6E3B4B'
        },
        rose: {
          DEFAULT: '#A56F73', // Secondary Dusty Rose
          light: '#C9A4A7',
          dark: '#855458'
        },
        champagne: {
          DEFAULT: '#D5BDA4', // Champagne Gold
          light: '#EAE0D5',
          dark: '#BBA086'
        },
        ivory: {
          DEFAULT: '#F5F0E9', // Warm Ivory Background
          light: '#FAF7F2',
          dark: '#EBE2D7'
        },
        charcoal: {
          DEFAULT: '#33302E', // Primary Text
          muted: '#524E4B',
          light: '#6E6965'
        },
        muted: {
          DEFAULT: '#817A76', // Muted Grey
          light: '#A39C98',
          dark: '#625D59'
        },
        soft: {
          border: '#E4DAD0', // Soft Border
          subtle: '#EFE8E1'
        },
        surface: {
          DEFAULT: '#FFFCF8', // White Surface
          card: '#FFFCF8',
          alt: '#FAF5EE'
        },
        // Health Status Muted Colors
        vital: {
          nominal: '#4E7D63', // Muted sage green
          nominalBg: '#EBF3EE',
          nominalBorder: '#C6DCCF',
          caution: '#B87D3B', // Muted amber
          cautionBg: '#FAF3E8',
          cautionBorder: '#EBD7BE',
          alert: '#8B3A42', // Muted red / wine
          alertBg: '#F9EBEF',
          alertBorder: '#E8C4CB'
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
        orbitron: ['Orbitron', 'sans-serif'],
      },
      boxShadow: {
        'warm-sm': '0 1px 3px rgba(51, 48, 46, 0.05)',
        'warm': '0 4px 20px -2px rgba(84, 43, 56, 0.07), 0 2px 6px -1px rgba(84, 43, 56, 0.04)',
        'warm-md': '0 10px 25px -4px rgba(84, 43, 56, 0.09), 0 4px 10px -2px rgba(84, 43, 56, 0.04)',
        'warm-lg': '0 20px 35px -6px rgba(84, 43, 56, 0.12), 0 8px 16px -3px rgba(84, 43, 56, 0.05)',
      }
    },
  },
  plugins: [],
}
