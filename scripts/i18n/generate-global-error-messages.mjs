#!/usr/bin/env node
/** Generate the small, lazy-loaded error-boundary catalogs from the full translations. */
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const REPO_ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "../..");

export function generateGlobalErrorMessages(root = REPO_ROOT) {
  const config = JSON.parse(readFileSync(join(root, "config/i18n.json"), "utf8"));
  const catalogs = join(root, "src/i18n/messages");
  const output = join(root, "src/i18n/global-error-messages");
  const english = JSON.parse(readFileSync(join(catalogs, "en.json"), "utf8"));
  const keys = Object.keys(english.publicSystem.globalError);
  mkdirSync(output, { recursive: true });
  for (const { code } of config.locales) {
    const source = JSON.parse(readFileSync(join(catalogs, `${code}.json`), "utf8"));
    const translated = source.publicSystem?.globalError ?? {};
    const globalError = Object.fromEntries(
      keys.filter((key) => typeof translated[key] === "string").map((key) => [key, translated[key]])
    );
    const serialized = `${JSON.stringify({ publicSystem: { globalError } }, null, 2)}\n`;
    writeFileSync(join(output, `${code}.json`), serialized);
  }
  return config.locales.length;
}

if (process.argv[1] && pathToFileURL(resolve(process.argv[1])).href === import.meta.url) {
  console.log(`Generated ${generateGlobalErrorMessages()} compact global-error catalogs.`);
}
