import html from "rollup-plugin-html";
import license from "rollup-plugin-license";
import alias from "@rollup/plugin-alias";
import typescript from "@rollup/plugin-typescript";
import { resolve } from "path";

export default {
  input: "src/index.ts",
  plugins: [
    alias({
      entries: [
        { find: "@views", replacement: resolve(__dirname, "views/dist/pages") },
      ],
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
    license({
      banner: {
        commentStyle: "none",
        content: (() => {
          const meta = require("./package.json");
          const scriptMeta = meta["user-script-meta"] || {};

          scriptMeta.version = meta.version;
          if (!scriptMeta.name && meta.name) scriptMeta.name = meta.name;
          if (!scriptMeta.namespace && meta.homepage)
            scriptMeta.namespace = meta.homepage;
          if (!scriptMeta.description && meta.description)
            scriptMeta.description = meta.description;
          if (!scriptMeta.author && (meta.author?.name || meta.author))
            scriptMeta.author = meta.author?.name || meta.author;
          if (!scriptMeta.homepage && meta.homepage)
            scriptMeta.homepage = meta.homepage;
          if (!scriptMeta.supportURL && (meta.bugs?.url || meta.homepage))
            scriptMeta.supportURL = meta.bugs.url || meta.homepage;

          const metaString = Object.entries(scriptMeta)
            .map(([key, value]) => {
              function getMetaString(key, value) {
                return `// @${key.padEnd(15)} ${value}`;
              }

              if (Array.isArray(value)) {
                return value.map((v) => getMetaString(key, v)).join("\n");
              }

              if (typeof value === "object") {
                return Object.entries(value)
                  .map(([k, v]) => getMetaString(`${key}:${k}`, v))
                  .join("\n");
              }

              return getMetaString(key, value);
            })
            .join("\n");

          return "// ==UserScript==\n" + metaString + "\n// ==/UserScript==\n";
        })(),
      },
    }),
  ],
  output: {
    file: "dist/bundle.user.js",
    format: "umd",
    minifyInternalExports: false,
  },
};
