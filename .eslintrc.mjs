const config = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
    "plugin:import/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "tsconfig.json",
  },
  settings: {
    "import/extensions": [".js", ".jsx", ".ts", ".tsx"],
    "import/resolver": {
      node: {
        extensions: [".js", ".jsx", ".ts", ".tsx"],
      },
    },
    "import/parsers": {
      "@typescript-eslint/parser": [".ts", ".tsx"],
    },
  },
  plugins: ["react-refresh", "import"],
  rules: {
    // sort imports
    "import/order": "error",

    // no let exports
    "import/no-mutable-exports": "error",

    "import/no-cycle": "error",

    // allow {} even though it's unsafe but comes handy
    "@typescript-eslint/ban-types": [
      "error",
      {
        types: {
          "{}": false,
        },
      },
    ],

    "@typescript-eslint/consistent-type-imports": [
      "error",
      {
        prefer: "type-imports",
        fixStyle: "inline-type-imports",
        disallowTypeAnnotations: false,
      },
    ],

    "import/no-duplicates": ["error", { "prefer-inline": true }],

    // false negatives
    "import/namespace": ["off"],

    // we allow empty interfaces
    "no-empty-pattern": "off",
    "@typescript-eslint/no-empty-interface": "off",
    "@typescript-eslint/no-explicit-any": "warn",

    // we allow empty functions
    "@typescript-eslint/no-empty-function": "off",
    "@typescript-eslint/no-unnecessary-type-assertion": "off",

    // we sometimes use async functions that don't await anything
    "@typescript-eslint/require-await": "off",

    // allow unused vars prefixed with `_`
    "@typescript-eslint/no-unused-vars": [
      "error",
      { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
    ],
  },
  overrides: [
    {
      files: ["src/app/**/*.ts?(x)"],
      rules: {
        "import/no-default-export": "off",
      },
    },
  ],
  ignorePatterns: ["*.js", "*.jsx", "*.config.js", "*.config.ts"],
};

export default config;
