import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  // ✅ Ignore generated files, build output, etc.
  {
    ignores: [
      "**/node_modules/**",
      "**/.next/**",
      "**/dist/**",
      "lib/generated/prisma/**", // ← ignore Prisma output
    ],
  },

  // ✅ Existing Next.js + TS config
  ...compat.extends("next/core-web-vitals", "next/typescript"),
];

export default eslintConfig;
