import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: [],
    include: ["src/app/(dashboard)/dashboard/cache/**/*.tsx"],
  },
  plugins: [react()],
});
