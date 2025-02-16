// @ts-check
import withNuxt from "./.nuxt/eslint.config.mjs";

export default withNuxt().overrideRules({
  // Your custom configs here
  "@typescript-eslint/no-explicit-any": "warn",
  "vue/html-self-closing": "off",
});
