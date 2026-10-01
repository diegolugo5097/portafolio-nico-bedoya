/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['selector', '[data-theme="dark"]'],
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        paper: 'rgb(var(--paper) / <alpha-value>)',
        blush: 'rgb(var(--blush) / <alpha-value>)',
        ember: 'rgb(var(--ember) / <alpha-value>)',
        rust: 'rgb(var(--rust) / <alpha-value>)',
        cocoa: 'rgb(var(--cocoa) / <alpha-value>)',
        cream: '#FFF8EF',
      },
      fontFamily: {
        display: ['Fraunces', 'Georgia', 'serif'],
        sans: ['"Instrument Sans"', '"Helvetica Neue"', 'Arial', 'sans-serif'],
        script: ['"Pinyon Script"', 'Georgia', 'serif'],
      },
      keyframes: {
        marquee: { from: { transform: 'translateX(0)' }, to: { transform: 'translateX(-50%)' } },
        kenburns: { from: { transform: 'scale(1.18)' }, to: { transform: 'scale(1.02)' } },
        rise: { from: { transform: 'translateY(110%)' }, to: { transform: 'translateY(0)' } },
        write: { from: { clipPath: 'inset(0 100% 0 0)' }, to: { clipPath: 'inset(0 0% 0 0)' } },
        fadein: { from: { opacity: 0 }, to: { opacity: 1 } },
        dash: { to: { strokeDashoffset: '0' } },
        drift: { '0%,100%': { transform: 'translate(0,0) scale(1)' }, '50%': { transform: 'translate(3%,-4%) scale(1.08)' } },
      },
      animation: {
        marquee: 'marquee 38s linear infinite',
        kenburns: 'kenburns 2.8s cubic-bezier(.2,.7,.2,1) both',
        rise: 'rise 1s cubic-bezier(.2,.8,.2,1) both',
        write: 'write 1.6s cubic-bezier(.6,0,.2,1) both',
        fadein: 'fadein 1.2s ease both',
        drift: 'drift 18s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
