import type { Config } from "tailwindcss"

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        tunisia: "#E70013",
      },
    },
  },
  plugins: [],
}
export default config
