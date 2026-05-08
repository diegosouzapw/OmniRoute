import { existsSync, readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { dirname, isAbsolute, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const CLI_DIR = dirname(fileURLToPath(import.meta.url));
const DEFAULT_ROOT_DIR = join(CLI_DIR, "..", "..");
const require = createRequire(import.meta.url);

export const COMMON_PROVIDERS = [
  { id: "openai", name: "OpenAI" },
  { id: "anthropic", name: "Anthropic" },
  { id: "google", name: "Google AI" },
  { id: "openrouter", name: "OpenRouter" },
  { id: "groq", name: "Groq" },
  { id: "mistral", name: "Mistral" },
];

function normalizeCatalogCategory(exportName) {
  const raw = exportName
    .replace(/_PROVIDERS$/, "")
    .toLowerCase()
    .replaceAll("_", "-");
  if (raw === "apikey") return "api-key";
  return raw;
}

function loadTypeScript() {
  try {
    return require("typescript");
  } catch {
    return null;
  }
}

function getPropertyName(ts, name) {
  if (ts.isIdentifier(name) || ts.isStringLiteral(name) || ts.isNumericLiteral(name)) {
    return name.text;
  }
  return null;
}

function getObjectProperty(ts, objectLiteral, propertyName) {
  return objectLiteral.properties.find(
    (property) =>
      ts.isPropertyAssignment(property) && getPropertyName(ts, property.name) === propertyName
  );
}

function getStringProperty(ts, objectLiteral, propertyName) {
  const property = getObjectProperty(ts, objectLiteral, propertyName);
  const initializer = property?.initializer;
  if (!initializer) return null;
  if (ts.isStringLiteral(initializer) || ts.isNoSubstitutionTemplateLiteral(initializer)) {
    return initializer.text;
  }
  return null;
}

function getBooleanProperty(ts, objectLiteral, propertyName) {
  const property = getObjectProperty(ts, objectLiteral, propertyName);
  const initializer = property?.initializer;
  return initializer?.kind === ts.SyntaxKind.TrueKeyword;
}

function extractProviderBlocks(source, filePath) {
  const ts = loadTypeScript();
  if (!ts) return [];

  const providers = [];
  const sourceFile = ts.createSourceFile(filePath, source, ts.ScriptTarget.Latest, true);

  sourceFile.forEachChild((node) => {
    if (!ts.isVariableStatement(node)) return;

    for (const declaration of node.declarationList.declarations) {
      if (!ts.isIdentifier(declaration.name)) continue;
      const exportName = declaration.name.text;
      if (!exportName.endsWith("_PROVIDERS")) continue;
      if (!declaration.initializer || !ts.isObjectLiteralExpression(declaration.initializer)) {
        continue;
      }

      const category = normalizeCatalogCategory(exportName);
      for (const property of declaration.initializer.properties) {
        if (!ts.isPropertyAssignment(property)) continue;
        if (!ts.isObjectLiteralExpression(property.initializer)) continue;

        const key = getPropertyName(ts, property.name);
        if (!key) continue;

        const id = getStringProperty(ts, property.initializer, "id") || key;
        const name = getStringProperty(ts, property.initializer, "name") || id;

        providers.push({
          id,
          name,
          category,
          alias: getStringProperty(ts, property.initializer, "alias"),
          website: getStringProperty(ts, property.initializer, "website"),
          deprecated: getBooleanProperty(ts, property.initializer, "deprecated"),
          hasFree: getBooleanProperty(ts, property.initializer, "hasFree"),
          passthroughModels: getBooleanProperty(ts, property.initializer, "passthroughModels"),
        });
      }
    }
  });

  return providers;
}

function fallbackAvailableProviders() {
  return COMMON_PROVIDERS.map((provider) => ({
    ...provider,
    category: "api-key",
    alias: null,
    website: null,
    deprecated: false,
    hasFree: false,
    passthroughModels: false,
  }));
}

function resolveProviderCatalogPath(rootDir, options = {}) {
  const configuredPath = options.catalogPath || process.env.OMNIROUTE_PROVIDER_CATALOG_PATH;
  if (configuredPath) {
    return isAbsolute(configuredPath) ? configuredPath : resolve(rootDir, configuredPath);
  }
  return join(rootDir, "src", "shared", "constants", "providers.ts");
}

export function loadAvailableProviders(options = {}) {
  const rootDir = typeof options === "string" ? options : options.rootDir || DEFAULT_ROOT_DIR;
  const providersPath = resolveProviderCatalogPath(rootDir, options);

  if (!existsSync(providersPath)) {
    return fallbackAvailableProviders();
  }

  try {
    const source = readFileSync(providersPath, "utf-8");
    const providers = extractProviderBlocks(source, providersPath);
    if (providers.length === 0) return fallbackAvailableProviders();

    const seen = new Set();
    return providers.filter((provider) => {
      if (seen.has(provider.id)) return false;
      seen.add(provider.id);
      return true;
    });
  } catch {
    return fallbackAvailableProviders();
  }
}

export function getAvailableProviderCategories(providers = loadAvailableProviders()) {
  return [...new Set(providers.map((provider) => provider.category))].sort();
}

export function getProviderDisplayName(providerId) {
  return COMMON_PROVIDERS.find((provider) => provider.id === providerId)?.name || providerId;
}

export function formatProviderChoices() {
  return COMMON_PROVIDERS.map((provider, index) => `${index + 1}. ${provider.name}`).join("\n");
}

export function resolveProviderChoice(value) {
  const trimmed = String(value || "").trim();
  const numeric = Number.parseInt(trimmed, 10);
  if (Number.isInteger(numeric) && numeric >= 1 && numeric <= COMMON_PROVIDERS.length) {
    return COMMON_PROVIDERS[numeric - 1].id;
  }
  return trimmed || "openai";
}
