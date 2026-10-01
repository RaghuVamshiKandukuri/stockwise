import type { Config } from 'tailwindcss'

const config: Config = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                brand: {
                    emerald: '#064E3B', // Emerald Ink[cite: 2]
                    champagne: '#F8E7C9', // Champagne[cite: 2]
                }
            }
        },
    },
    plugins: [],
}
export default config