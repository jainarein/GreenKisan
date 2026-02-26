/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                background: '#0a0f16',
                card: 'rgba(20, 25, 40, 0.4)',
                primary: {
                    DEFAULT: '#00f2fe',
                    dark: '#00c6eb'
                },
                accent: {
                    DEFAULT: '#4facfe',
                    green: '#00ff87',
                }
            },
            boxShadow: {
                'glow-primary': '0 0 20px rgba(0, 242, 254, 0.5)',
                'glow-green': '0 0 20px rgba(0, 255, 135, 0.5)',
                'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)'
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
                display: ['Outfit', 'system-ui', 'sans-serif'],
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'glass-gradient': 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.01) 100%)',
            },
            animation: {
                'blob': 'blob 7s infinite',
                'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
            },
            keyframes: {
                blob: {
                    '0%': { transform: 'translate(0px, 0px) scale(1)' },
                    '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
                    '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
                    '100%': { transform: 'translate(0px, 0px) scale(1)' },
                }
            }
        },
    },
    plugins: [],
}
