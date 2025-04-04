/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  safelist: [
    'bg-[#4CAF50]',
    'hover:bg-[#4CAF50]/90',
    'text-[#4CAF50]',
    'bg-[#D84315]',
    'hover:bg-[#D84315]/90',
    'text-[#D84315]',
    'text-foreground',
    'text-muted-foreground',
  ],
  theme: {
    extend: {
      colors: {
        // Anthropic-inspired dark theme palette
        'background': '#4A4A4A',    // Charcoal Black (background)
        'surface': '#4A4A4A',         // Dark Slate (panel/container)
        'panel': '#1E1E1E',         // Dark Slate (panel/container)
        'border': '#2A2A2A',        // Border/Divider
        'primary': '#1B9AAA',       // Sky Blue (accent)
        'secondary': '#F4C95D',     // Golden Sand (hospitality accent)
        'success': '#4CAF50',       // Success Green
        'error': '#D84315',         // Error Red
        'warning': '#F4C95D', 
        neutral: {
          50: '#FAF8F6',
          100: '#F0EBE5',
          200: '#E6DFD7',
          300: '#D1BFA3',
          400: '#B8A89B',
          500: '#9A8A7C',
          600: '#7C6F63',
          700: '#5E544B',
          800: '#3F3932',
          900: '#201D19',
        },
      },
      backdropBlur: {
        xs: '2px',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        shimmer: {
          '0%': { opacity: 0.5 },
          '50%': { opacity: 0.7 },
          '100%': { opacity: 0.5 },
        },
      },
      borderRadius: {
        '2xl': '1rem',
      },
      boxShadow: {
        'bubble': '0 2px 6px rgba(0, 0, 0, 0.05)',
        'dark': '0 4px 8px rgba(0, 0, 0, 0.25)',
        'glow': '0 0 8px rgba(27, 154, 170, 0.4)',
      }
    }
  },
  plugins: [],
};