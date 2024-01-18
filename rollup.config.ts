import html from "rollup-plugin-html";
import typescript from "@rollup/plugin-typescript";

export default {
  input: "src/index.ts",
  plugins: [
    typescript({
      tsconfig: "src/tsconfig.json",
    }),
    html({
      include: "**/*.html",
      htmlMinifierOptions: {
        collapseWhitespace: true,
        collapseBooleanAttributes: true,
        conservativeCollapse: true,
        minifyJS: true,
      },
    }),
  ],
  output: {
    file: "dist/bundle.user.js",
    format: "umd",
    minifyInternalExports: false,
  },
};
