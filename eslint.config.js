import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import react from "eslint-plugin-react";
import prettier from "eslint-plugin-prettier";
import simpleImportSort from "eslint-plugin-simple-import-sort";

export default tseslint.config(
  { ignores: ["dist"] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      react: react,
      prettier: prettier,
      "simple-import-sort": simpleImportSort,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
      quotes: ["error", "double"],
      "@typescript-eslint/no-unused-vars": [
        "error",
        { args: "none", argsIgnorePattern: "^_" },
      ],
      "@typescript-eslint/no-explicit-any": "error",
      "react/style-prop-object": "error",
      "react/jsx-uses-react": "error",
      "react/jsx-uses-vars": "error",
      "prettier/prettier": "error",
      "simple-import-sort/imports": [
        "error",
        {
          groups: [
            // 1. React first & Other third-party packages
            ["^react", "^@?\\w"],

            // 2. @/types, @/interfaces, @/constants, @/assets, @/path
            [
              "^@/types",
              "^@/interfaces",
              "^@/constants",
              "^@/assets",
              "^@/path",
            ],

            // 3. @/services
            ["^@/services"],

            // 4. @/hooks, @/utils, @/store
            ["^@/hooks", "^@/utils", "^@/store"],

            // 5. @/pages
            ["^@/pages"],

            // 6. @/components (including internal subcomponents)
            ["^@/components", "^@/components/.+"],

            // 7. SCSS files
            ["^.+\\.scss$"],

            // 8. Parent imports (../)
            ["^\\.\\.(?!/?$)", "^\\.\\./?$"],

            // 9. Current directory imports (./)
            ["^\\./(?=.*/)(?!/?$)", "^\\.(?!/?$)", "^\\./?$"],
          ],
        },
      ],
      "simple-import-sort/exports": "error",
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  }
);
