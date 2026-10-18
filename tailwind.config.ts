import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--bg-primary)",
        surface: "var(--bg-surface)",
        elevated: "var(--bg-elevated)",
        border: "var(--border)",
        accent: {
          violet: "#7c3aed",
          cyan: "#06b6d4",
        },
        brand: {
          dark: "#0a0e1a",
          surface: "#111827",
          card: "#1a2332",
          border: "#1e2d4a",
          purple: "#7c3aed",
          cyan: "#06b6d4",
          text: "#f1f5f9",
          muted: "#9ca3af",
        },
      },
    },
  },
  plugins: [],
};
export default config;
