import { defineConfig } from "tsup";

export default defineConfig({
  entry: {
    artificer: "src/index.ts",
  },
  format: ["esm", "cjs"],
  splitting: false,
  sourcemap: true,
  clean: true,
});
