/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: ["class"],
	content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./context/**/*.{js,jsx}",
    "./lib/**/*.{js,jsx}"
  ],
	theme: {
	  extend: {
		colors: {
		  border: "hsl(var(--border))",
		  input: "hsl(var(--input))",
		  ring: "hsl(var(--ring))",
		  background: "hsl(var(--background))",
		  foreground: "hsl(var(--foreground))",
		  primary: {
			DEFAULT: "hsl(var(--primary))",
			foreground: "hsl(var(--primary-foreground))",
			50: "#f0f9ff",
			100: "#e0f2fe",
			200: "#bae6fd",
			300: "#7dd3fc",
			400: "#38bdf8",
			500: "#0ea5e9",
			600: "#0284c7",
			700: "#0369a1",
			800: "#075985",
			900: "#0c4a6e",
		  },
		  secondary: { // Changed from purple to indigo
			DEFAULT: "hsl(var(--secondary))", // You might want to update the HSL variable too, but leaving for now
			foreground: "hsl(var(--secondary-foreground))",
			50: '#eef2ff',
			100: '#e0e7ff',
			200: '#c7d2fe',
			300: '#a5b4fc',
			400: '#818cf8',
			500: '#6366f1',
			600: '#4f46e5',
			700: '#4338ca',
			800: '#3730a3', // The target color
			900: '#312e81',
		  },
		  destructive: {
			DEFAULT: "hsl(var(--destructive))",
			foreground: "hsl(var(--destructive-foreground))",
		  },
		  muted: {
			DEFAULT: "hsl(var(--muted))",
			foreground: "hsl(var(--muted-foreground))",
		  },
		  accent: {
			DEFAULT: "hsl(var(--accent))",
			foreground: "hsl(var(--accent-foreground))",
		  },
		  popover: {
			DEFAULT: "hsl(var(--popover))",
			foreground: "hsl(var(--popover-foreground))",
		  },
		  card: {
			DEFAULT: "hsl(var(--card))",
			foreground: "hsl(var(--card-foreground))",
		  },
		},
		borderRadius: {
		  lg: "var(--radius)",
		  md: "calc(var(--radius) - 2px)",
		  sm: "calc(var(--radius) - 4px)",
		},
        keyframes: { // Add keyframes definition
          'fade-in-down': { // Added fade-in-down
            '0%': {
              opacity: '0',
              transform: 'translateY(-10px)'
            },
            '100%': {
              opacity: '1',
              transform: 'translateY(0)'
            },
          },
          marquee: {
            '0%': { transform: 'translateX(0%)' },
            '100%': { transform: 'translateX(-100%)' }, // Adjust based on duplication
          },
        },
        animation: { // Add animation utility
          marquee: 'marquee 30s linear infinite', // Adjust duration as needed
          'fade-in-down': 'fade-in-down 0.5s ease-out' // Added fade-in-down animation utility
        },
	  },
	},
	plugins: [require("tailwindcss-animate")],
  }
