module.exports = {
  extends: ["airbnb", "plugin:prettier/recommended"],
  plugins: ["prettier"],
  rules: {
    "prettier/prettier": "error",
    "react/jsx-filename-extension": [1, { extensions: [".js", ".jsx"] }],
    "no-console": "off"
  },
  env: {
    browser: true,
    node: true,
    es2021: true
  }
};
