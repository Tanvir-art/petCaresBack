import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";

// export default [
//   {files: ["**/*.{js,mjs,cjs,ts}"]},
//   {languageOptions: { globals: globals.browser }},
//   rules: {
//     "no-unused-vars": "error",
//     "no-undef": "off",
//     "no-console": "warn",
//     "prefer-const": "error",
//   },
//   pluginJs.configs.recommended,
//   ...tseslint.configs.recommended,
// ];

export default [
  {
    languageOptions: { globals: globals.browser },
    ignores: ["**/node_modules/**", ".dist/"],
    rules: {
      "no-unused-vars": "error",
      "no-undef": "off",
      "no-console": "warn",
      "prefer-const": "error",
    },
    //  globals: "readonly",
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
];
