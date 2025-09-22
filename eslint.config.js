// eslint.config.js
import js from "@eslint/js";
import globals from "globals";
import pluginReact from "eslint-plugin-react";
import { defineConfig } from "eslint/config";

export default defineConfig([
  js.configs.recommended,               // базові правила JS
  pluginReact.configs.flat.recommended, // базові правила React
  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
    languageOptions: {
      globals: globals.browser,
    },
    settings: {
      react: { version: "detect" },
    },
    rules: {
      "react/react-in-jsx-scope": "off", // у React 17+ не потрібен import React
      "react/prop-types": "off",         // виключаємо PropTypes
    },
  },
]);
