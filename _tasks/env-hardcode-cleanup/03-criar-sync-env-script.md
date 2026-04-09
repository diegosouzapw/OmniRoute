# Task 3: Criar Script `sync-env.mjs`

## Objetivo
Criar um script que garante que o `.env` exista e esteja completo em toda instalação e atualização. O script é idempotente — pode ser executado múltiplas vezes sem efeitos colaterais.

## Arquivo Alvo
`/home/diegosouzapw/dev/proxys/9router/scripts/sync-env.mjs` (NOVO)

## Comportamento Detalhado

### Cenário A: `.env` NÃO existe
1. Copiar `.env.example` inteiro como `.env`
2. Auto-gerar valores criptográficos para campos vazios:
   - `JWT_SECRET` → `crypto.randomBytes(64).toString('hex')`
   - `API_KEY_SECRET` → `crypto.randomBytes(32).toString('hex')`
   - `STORAGE_ENCRYPTION_KEY` → `crypto.randomBytes(32).toString('hex')`
3. Log: `[sync-env] ✨ Created .env from .env.example (N keys populated)`

### Cenário B: `.env` EXISTE
1. Ler `.env.example` e `.env`
2. Identificar chaves do `.env.example` que NÃO existem no `.env`
3. Para cada chave faltante:
   - Se é um secret criptográfico vazio → auto-gerar
   - Se tem valor no `.env.example` → copiar valor do `.env.example`
   - Se está comentado no `.env.example` → pular (não adicionar)
4. Appendar chaves faltantes no final do `.env` com um marcador de seção
5. **NUNCA** sobrescrever chaves que já existem no `.env` do usuário
6. Log: `[sync-env] 📦 Synced .env — added N missing keys`

### Cenário C: `.env` EXISTE e está completo
1. Ler ambos os arquivos, comparar
2. Nenhuma mudança necessária
3. Log: `[sync-env] ✅ .env is up to date (0 keys added)`

## Estrutura do Script

```javascript
#!/usr/bin/env node
/**
 * OmniRoute — Environment Sync
 *
 * Ensures .env exists and contains all keys from .env.example.
 * Runs on every `npm install` (via postinstall) and on updates.
 *
 * Rules:
 *   - NEVER overwrites existing values in .env
 *   - Auto-generates cryptographic secrets if empty
 *   - Copies default values from .env.example for new keys
 *   - Skips commented lines from .env.example
 */

import { existsSync, readFileSync, writeFileSync, copyFileSync } from "node:fs";
import { randomBytes } from "node:crypto";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
```

## Lógica de Parse do `.env.example`

```javascript
function parseEnvFile(filePath) {
  if (!existsSync(filePath)) return new Map();
  const entries = new Map();
  const content = readFileSync(filePath, "utf8");
  for (const line of content.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eqIdx = trimmed.indexOf("=");
    if (eqIdx < 1) continue;
    const key = trimmed.slice(0, eqIdx).trim();
    const value = trimmed.slice(eqIdx + 1).trim();
    entries.set(key, value);
  }
  return entries;
}
```

## Chaves que Precisam de Auto-Geração

```javascript
const CRYPTO_SECRETS = {
  JWT_SECRET: () => randomBytes(64).toString("hex"),
  API_KEY_SECRET: () => randomBytes(32).toString("hex"),
  STORAGE_ENCRYPTION_KEY: () => randomBytes(32).toString("hex"),
  MACHINE_ID_SALT: () => `omniroute-${randomBytes(8).toString("hex")}`,
};
```

## Lógica Principal

```javascript
export function syncEnv({ rootDir, quiet = false } = {}) {
  const log = quiet ? () => {} : (msg) => process.stderr.write(`[sync-env] ${msg}\n`);
  const root = rootDir || dirname(dirname(fileURLToPath(import.meta.url)));
  const envExamplePath = join(root, ".env.example");
  const envPath = join(root, ".env");

  if (!existsSync(envExamplePath)) {
    log("⚠️  .env.example not found — skipping sync");
    return { created: false, added: 0 };
  }

  const exampleEntries = parseEnvFile(envExamplePath);

  // Cenário A: .env não existe
  if (!existsSync(envPath)) {
    copyFileSync(envExamplePath, envPath);
    // Auto-generate crypto secrets in the new file
    let content = readFileSync(envPath, "utf8");
    let generated = 0;
    for (const [key, generator] of Object.entries(CRYPTO_SECRETS)) {
      const regex = new RegExp(`^${key}=\\s*$`, "m");
      if (regex.test(content)) {
        content = content.replace(regex, `${key}=${generator()}`);
        generated++;
        log(`✨ ${key} auto-generated`);
      }
    }
    writeFileSync(envPath, content, "utf8");
    log(`✨ Created .env from .env.example (${exampleEntries.size} keys, ${generated} secrets generated)`);
    return { created: true, added: exampleEntries.size };
  }

  // Cenário B/C: .env existe — verificar chaves faltantes
  const currentEntries = parseEnvFile(envPath);
  const missingKeys = [];

  for (const [key, defaultValue] of exampleEntries) {
    if (!currentEntries.has(key)) {
      // Se é um secret criptográfico e está vazio, gerar
      if (CRYPTO_SECRETS[key] && !defaultValue) {
        missingKeys.push({ key, value: CRYPTO_SECRETS[key](), generated: true });
      } else {
        missingKeys.push({ key, value: defaultValue, generated: false });
      }
    }
  }

  if (missingKeys.length === 0) {
    log("✅ .env is up to date (0 keys added)");
    return { created: false, added: 0 };
  }

  // Append missing keys
  const appendLines = [
    "",
    `# ── Auto-added by sync-env (${new Date().toISOString().slice(0, 10)}) ──`,
  ];
  for (const { key, value, generated } of missingKeys) {
    appendLines.push(`${key}=${value}`);
    log(`${generated ? "✨" : "📦"} ${key}${generated ? " (auto-generated)" : ""}`);
  }
  appendLines.push("");

  const existing = readFileSync(envPath, "utf8");
  writeFileSync(envPath, existing.trimEnd() + "\n" + appendLines.join("\n"), "utf8");
  log(`📦 Synced .env — added ${missingKeys.length} missing keys`);
  return { created: false, added: missingKeys.length };
}
```

## Execução CLI

```javascript
// CLI: node scripts/sync-env.mjs
if (process.argv[1]?.endsWith("sync-env.mjs")) {
  syncEnv();
}
```

## Critérios de Aceite
- [ ] Script cria `.env` se não existe
- [ ] Script preserva valores existentes no `.env`
- [ ] Script appenda chaves faltantes com valores do `.env.example`
- [ ] Secrets criptográficos são auto-gerados quando vazios
- [ ] Output em stderr com prefixo `[sync-env]`
- [ ] Pode ser executado múltiplas vezes sem efeito colateral (idempotente)
- [ ] Funciona cross-platform (Linux, macOS, Windows)
- [ ] `node scripts/sync-env.mjs` funciona standalone

## Teste Manual

```bash
# Teste 1: Criar do zero
cp .env .env.bak && rm .env && node scripts/sync-env.mjs
# Verificar que .env foi criado com todos os valores

# Teste 2: Idempotência  
node scripts/sync-env.mjs
# Deve mostrar "0 keys added"

# Teste 3: Preservação
echo "JWT_SECRET=meu-segredo-custom" > .env
node scripts/sync-env.mjs
grep JWT_SECRET .env  # deve ser "meu-segredo-custom", não o auto-gerado

# Restaurar
mv .env.bak .env
```
