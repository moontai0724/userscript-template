import html from "rollup-plugin-html";
import alias from "@rollup/plugin-alias";
import typescript from "@rollup/plugin-typescript";

export default {
  input: "src/index.ts",
  plugins: [
    alias({
      entries: [{ find: "@views", replacement: __dirname }],
    }),
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
