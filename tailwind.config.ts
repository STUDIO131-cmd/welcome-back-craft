import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        display: ["TikTok Sans", "sans-serif"],
        heading: ["TikTok Sans", "sans-serif"],
        body: ["TikTok Sans", "sans-serif"],
        epika: ["NT Epika", "serif"],
        moneta: ["Moneta", "sans-serif"],
        tiktok: ["TikTok Sans", "sans-serif"],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
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
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
        // Studio 131 Extended Palette
        "s131-red": "hsl(var(--s131-red))",
        "s131-coral": "hsl(var(--s131-coral))",
        "s131-peach": "hsl(var(--s131-peach))",
        "s131-wine-deep": "hsl(var(--s131-wine-deep))",
        "s131-wine": "hsl(var(--s131-wine))",
        "s131-wine-light": "hsl(var(--s131-wine-light))",
        "s131-magenta": "hsl(var(--s131-magenta))",
        "s131-navy": "hsl(var(--s131-navy))",
        "s131-purple": "hsl(var(--s131-purple))",
        "s131-slate": "hsl(var(--s131-slate))",
        "s131-indigo": "hsl(var(--s131-indigo))",
        "s131-ocean": "hsl(var(--s131-ocean))",
        "s131-ocean-mid": "hsl(var(--s131-ocean-mid))",
        "s131-ocean-light": "hsl(var(--s131-ocean-light))",
        "s131-ocean-vivid": "hsl(var(--s131-ocean-vivid))",
        "s131-forest": "hsl(var(--s131-forest))",
        "s131-green": "hsl(var(--s131-green))",
        "s131-green-light": "hsl(var(--s131-green-light))",
        "s131-olive": "hsl(var(--s131-olive))",
        "s131-cream": "hsl(var(--s131-cream))",
        "s131-silver": "hsl(var(--s131-silver))",
        "s131-gray-light": "hsl(var(--s131-gray-light))",
        "s131-gray": "hsl(var(--s131-gray))",
        "s131-gray-dark": "hsl(var(--s131-gray-dark))",
        "s131-black": "hsl(var(--s131-black))",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;