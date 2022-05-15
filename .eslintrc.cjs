module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  extends: ["airbnb-base", "airbnb-typescript/base", "prettier"],
  parserOptions: {
    project: ["tsconfig.json"],
  },
  rules: {
    "import/prefer-default-export": "off",
  },
};
