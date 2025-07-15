/** @type {import('tailwindcss').Config} */
import tailwindcssAnimate from "tailwindcss-animate";
export default {
  darkMode: ["class"],
  content: [
  "./index.html",
  "./src/**/*.{js,ts,jsx,tsx}",
],
theme: {
	extend: {
		borderRadius: {
			lg: 'var(--radius)',
			md: 'calc(var(--radius) - 2px)',
			sm: 'calc(var(--radius) - 4px)'
		},
		colors: {
			background: 'hsl(var(--background))',
			foreground: 'hsl(var(--foreground))',
			card: {
				DEFAULT: 'hsl(var(--card))',
				foreground: 'hsl(var(--card-foreground))'
			},
			popover: {
				DEFAULT: 'hsl(var(--popover))',
				foreground: 'hsl(var(--popover-foreground))'
			},
			primary: {
				DEFAULT: 'hsl(var(--primary))',
				foreground: 'hsl(var(--primary-foreground))'
			},
			secondary: {
				DEFAULT: 'hsl(var(--secondary))',
				foreground: 'hsl(var(--secondary-foreground))'
			},
			muted: {
				DEFAULT: 'hsl(var(--muted))',
				foreground: 'hsl(var(--muted-foreground))'
			},
			accent: {
				DEFAULT: 'hsl(var(--accent))',
				foreground: 'hsl(var(--accent-foreground))'
			},
			destructive: {
				DEFAULT: 'hsl(var(--destructive))',
				foreground: 'hsl(var(--destructive-foreground))'
			},
			border: 'hsl(var(--border))',
			input: 'hsl(var(--input))',
			ring: 'hsl(var(--ring))',
			chart: {
				'1': 'hsl(var(--chart-1))',
				'2': 'hsl(var(--chart-2))',
				'3': 'hsl(var(--chart-3))',
				'4': 'hsl(var(--chart-4))',
				'5': 'hsl(var(--chart-5))'
			},

			textBlack: '#414141',
			textOrange: '#E5810C',
			bgDarkBlue: '#22384D',

		},
		screens: {
			'400': '400px',
			'420': '420px',
			'430px': '430px',
			'450': '450px',
			'500': '500px',
			'550': '550px',
			'600': '600px',
			'700': '700px',
			'768': '768px',
			'800': '800px',
			'xs850': '850px',
			'900': '900px',
			'950px': '950px',
			'1000': '1000px',
			'1050': '1050px',
			'1100': '1100px',
			'1150': '1150px',
			'1200': '1200px',
			'1250': '1250px',
			'1300': '1300px',
			'1325': '1325px',
			'1350': '1350px',
			'xs1350': '1350px',
			'xs1400': '1400px',
			'xs1450': '1450px',
			'xs1480': '1480px',
			'1515': '1515px',
			'1550': '1550px',

			'1760': '1760px',

			'430-less': { 'max': '430px' },
			'468-less': { 'max': '468px' },
			'688-less': { 'max': '688px' },
			'820-less': { 'max': '820px' },
			'820-large': { 'min': '820px' },
			'1000-less': { 'max': '1000px' },
			'1024-less': { 'max': '1024px' },
			'1100-less': { 'max': '1100px' },
			'1150-less': { 'max': '1150px' },
			'1200-less': { 'max': '1200px' },
			'1220-less': { 'max': '1220px' },
			'1280-less': { 'max': '1280px' },
			'1350-less': { 'max': '1350px' },
			'1366-less': { 'max': '1366px' },
			'1400-less': { 'max': '1400px' },
			'1450-less': { 'max': '1450px' },
			'1559-less': { 'max': '1559px' },
		},
		keyframes: {
			'accordion-down': {
				from: {
					height: '0'
				},
				to: {
					height: 'var(--radix-accordion-content-height)'
				}
			},
			'accordion-up': {
				from: {
					height: 'var(--radix-accordion-content-height)'
				},
				to: {
					height: '0'
				}
			}
		},
		animation: {
			'accordion-down': 'accordion-down 0.2s ease-out',
			'accordion-up': 'accordion-up 0.2s ease-out'
		}
	}
},
plugins: [tailwindcssAnimate],
}