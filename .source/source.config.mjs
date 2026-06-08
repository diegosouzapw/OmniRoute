// source.config.ts
import { defineDocs, defineConfig } from "fumadocs-mdx/config";
var docs = defineDocs({
  dir: "docs",
  docs: {
    files: [
      "./getting-started/**/*.md",
      "./architecture/**/*.md",
      "./guides/**/*.md",
      "./reference/**/*.md",
      "./frameworks/**/*.md",
      "./routing/**/*.md",
      "./security/**/*.md",
      "./compression/**/*.md",
      "./ops/**/*.md"
    ]
  }
});
var source_config_default = defineConfig();
export {
  source_config_default as default,
  docs
};
