module.exports = {
  extends: ["airbnb", "plugin:prettier/recommended"],
  plugins: ["prettier"],
  rules: {
    "prettier/prettier": ["error", { endOfLine: "auto" }],
    "react/jsx-filename-extension": [1, { extensions: [".js", ".jsx"] }],
    "no-console": "off",
    "no-underscore-dangle": ["error", { allow: ["_id"] }],
  },
  env: {
    browser: true,
    node: true,
    es2021: true,
  },
};
