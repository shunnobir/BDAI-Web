import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          navy: "rgb(15 33 68 / <alpha-value>)",
          blue: "rgb(26 58 107 / <alpha-value>)",
          sky: "rgb(46 111 181 / <alpha-value>)",
          gold: "rgb(201 168 76 / <alpha-value>)",
          cream: "rgb(248 245 239 / <alpha-value>)",
          paper: "rgb(253 252 250 / <alpha-value>)",
          muted: "rgb(107 114 128 / <alpha-value>)",
          border: "rgb(221 216 206 / <alpha-value>)",
        },
      },
      fontFamily: {
        serif: ["'Playfair Display'", "Georgia", "serif"],
        sans: ["'DM Sans'", "system-ui", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
        body: ["'Source Serif 4'", "Georgia", "serif"],
      },
      maxWidth: {
        content: "1200px",
        prose: "72ch",
      },
      boxShadow: {
        card: "0 1px 3px 0 rgba(15,33,68,0.08), 0 1px 2px -1px rgba(15,33,68,0.06)",
        panel: "0 4px 24px -4px rgba(15,33,68,0.12)",
        float: "0 12px 40px -8px rgba(15,33,68,0.18)",
      },
      borderRadius: {
        DEFAULT: "6px",
        lg: "10px",
        xl: "14px",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.5s ease forwards",
        "fade-in": "fade-in 0.4s ease forwards",
      },
      typography: () => ({
        DEFAULT: {
          css: {
            "--tw-prose-body": "rgb(107 114 128)",
            "--tw-prose-headings": "rgb(15 33 68)",
            "--tw-prose-links": "rgb(46 111 181)",
            "--tw-prose-code": "rgb(15 33 68)",
            maxWidth: "72ch",
          },
        },
      }),
    },
  },
  plugins: [animate],
};

export default config;
