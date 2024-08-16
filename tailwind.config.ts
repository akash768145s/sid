import type { Config } from 'tailwindcss'
const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        "royalblue": "#004aad",
      },
      fontFamily: {
        oswald: "Oswald",
        "sub-heading": "Inter",
        "font-awesome-5-pro": "'Font Awesome 5 Pro'",
      },
      borderRadius: {
        xl: "20px",
        "11xl": "30px",
      },
    },
    fontSize: {
      xl: "20px",
      base: "16px",
      "3xl": "22px",
      lg: "18px",
      "71xl": "90px",
      "5xl": "24px",
      sm: "14px",
      "17xl": "36px",
      "10xl": "29px",
      inherit: "inherit",
    },
    screens: {
      mq1350: {
        raw: "screen and (max-width: 1350px)",
      },
      mq1150: {
        raw: "screen and (max-width: 1150px)",
      },
      mq800: {
        raw: "screen and (max-width: 800px)",
      },
      mq450: {
        raw: "screen and (max-width: 450px)",
      },
    },
    
  },

  plugins: [],
}

export default config
