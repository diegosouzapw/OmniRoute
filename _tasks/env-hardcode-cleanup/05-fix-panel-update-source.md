# Task 5: Fix Update pelo Painel (Source Mode)

## Objetivo
Permitir que instalações via `git clone` (source mode) possam usar o botão "Update Now" no painel do dashboard, em vez de mostrar "Manual Update" desabilitado.

## Contexto do Problema

### O que acontece hoje
Em `autoUpdate.ts` L68-79:
```typescript
if (config.mode === "npm") {
  const isGitRepo = existsSync(path.join(process.cwd(), ".git"));
  const currentDir = typeof __dirname !== "undefined" ? __dirname : process.cwd();
  const isGlobalNodeModules = currentDir.includes("node_modules");
  if (isGitRepo || !isGlobalNodeModules) {
    mode = "source" as any;  // ← cast como any, tipo inválido
  }
}
```

E em `validateAutoUpdateRuntime` L116-123:
```typescript
if (config.mode === ("source" as any)) {
  return {
    supported: false,  // ← SEMPRE retorna não suportado
    reason: "Manual 'git pull && npm install && npm run build' is required...",
    composeCommand: null,
  };
}
```

### Resultado
- Botão "Update Now" aparece como "Manual Update" **desabilitado**
- Usuários veem que tem update disponível mas **não podem** fazer nada

## Arquivos Alvo
1. `/home/diegosouzapw/dev/proxys/9router/src/lib/system/autoUpdate.ts`
2. `/home/diegosouzapw/dev/proxys/9router/src/app/api/system/version/route.ts`

## Mudanças em `autoUpdate.ts`

### 1. Adicionar "source" como tipo válido

```diff
-export type AutoUpdateMode = "npm" | "docker-compose";
+export type AutoUpdateMode = "npm" | "docker-compose" | "source";
```

### 2. Remover cast `as any` na detecção

```diff
-    mode = "source" as any;
+    mode = "source";
```

### 3. Implementar validação para source mode

Substituir o bloco L116-123 por:

```typescript
if (config.mode === "source") {
  // Source installs require git
  const isGitRepo = existsSync(path.join(process.cwd(), ".git"));
  if (!isGitRepo) {
    return {
      supported: false,
      reason: "Not a git repository. Download source or use npm install -g.",
      composeCommand: null,
    };
  }

  try {
    await execFileImpl("git", ["--version"], { timeout: 10_000 });
  } catch {
    return {
      supported: false,
      reason: "git is not available. Install git to enable auto-update.",
      composeCommand: null,
    };
  }

  return { supported: true, reason: null, composeCommand: null };
}
```

### 4. Adicionar `buildSourceUpdateScript()`

Nova função exportada:

```typescript
export function buildSourceUpdateScript(latest: string): string {
  const targetTag = latest.startsWith("v") ? latest : `v${latest}`;
  return [
    "set -eu",
    // Stash any local changes (shouldn't be any in production)
    "git stash --include-untracked 2>/dev/null || true",
    // Fetch latest tags
    "git fetch --tags origin",
    // Verify tag exists
    `if ! git rev-parse -q --verify "refs/tags/${targetTag}" >/dev/null 2>&1; then`,
    `  echo "[AutoUpdate] Tag ${targetTag} not found." >&2`,
    "  exit 1",
    "fi",
    // Create backup branch
    `backup_branch="pre-update/$(git rev-parse --short HEAD)-$(date +%Y%m%d-%H%M%S)"`,
    'git branch "$backup_branch" 2>/dev/null || true',
    // Checkout the target tag
    `git checkout "${targetTag}"`,
    // Install dependencies
    "npm install --legacy-peer-deps",
    // Sync .env with new .env.example keys
    "node scripts/sync-env.mjs 2>/dev/null || true",
    // Build
    "npm run build",
    // Restart PM2 if available
    "if command -v pm2 >/dev/null 2>&1; then",
    '  pm2 restart omniroute --update-env || true',
    "fi",
    `echo "[AutoUpdate] Successfully updated to ${targetTag}."`,
  ].join("\\n");
}
```

### 5. Atualizar `launchAutoUpdate` para suportar source

Na função `launchAutoUpdate`, atualizar a seleção de script:

```diff
   const script =
     config.mode === "docker-compose"
       ? buildDockerComposeUpdateScript({
           latest,
           config,
           composeCommand: validation.composeCommand || "docker-compose",
         })
-      : buildNpmUpdateScript(latest);
+      : config.mode === "source"
+        ? buildSourceUpdateScript(latest)
+        : buildNpmUpdateScript(latest);
```

## Mudanças em `version/route.ts`

### Adicionar handler SSE para source mode no POST

Após a checagem do docker-compose mode (L111-133), adicionar handler para source:

```typescript
// Source mode — use SSE stream with step-by-step git + build
if (config.mode === "source") {
  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      const send = (data: Record<string, unknown>) => {
        controller.enqueue(encoder.encode(`data: ${JSON.stringify(data)}\n\n`));
      };

      try {
        // Step 1: Fetch tags
        send({ step: "install", status: "running", message: "Fetching latest tags..." });
        await execFileAsync("git", ["fetch", "--tags", "origin"], {
          timeout: 60000,
          cwd: process.cwd(),
        });
        send({ step: "install", status: "done", message: "Tags fetched" });

        // Step 2: Checkout tag
        send({ step: "install", status: "running", message: `Checking out v${latest}...` });
        // Stash local changes
        try {
          await execFileAsync("git", ["stash", "--include-untracked"], {
            timeout: 30000,
            cwd: process.cwd(),
          });
        } catch {
          // No changes to stash
        }
        await execFileAsync("git", ["checkout", `v${latest}`], {
          timeout: 30000,
          cwd: process.cwd(),
        });
        send({ step: "install", status: "done", message: `Checked out v${latest}` });

        // Step 3: Install dependencies
        send({ step: "rebuild", status: "running", message: "Installing dependencies..." });
        await execFileAsync("npm", ["install", "--legacy-peer-deps"], {
          timeout: 300000,
          cwd: process.cwd(),
        });
        send({ step: "rebuild", status: "done", message: "Dependencies installed" });

        // Step 4: Build
        send({ step: "rebuild", status: "running", message: "Building application..." });
        await execFileAsync("npm", ["run", "build"], {
          timeout: 600000,
          cwd: process.cwd(),
        });
        send({ step: "rebuild", status: "done", message: "Build complete" });

        // Step 5: Sync env
        try {
          await execFileAsync("node", ["scripts/sync-env.mjs"], {
            timeout: 10000,
            cwd: process.cwd(),
          });
        } catch {
          // Non-fatal
        }

        // Step 6: Restart
        send({ step: "restart", status: "running", message: "Restarting service..." });
        try {
          await execFileAsync("pm2", ["restart", "omniroute", "--update-env"], { timeout: 30000 });
          send({ step: "restart", status: "done", message: "Service restarted" });
        } catch {
          send({ step: "restart", status: "skipped", message: "PM2 not available — manual restart needed" });
        }

        send({
          step: "complete",
          status: "done",
          from: current,
          to: latest,
          message: `Update to v${latest} complete!`,
        });
        console.log(`[AutoUpdate] Successfully updated to v${latest} via source mode`);
      } catch (err: any) {
        const errMsg = err?.stderr || err?.message || String(err);
        send({ step: "error", status: "failed", message: errMsg });
        console.error(`[AutoUpdate] Source update failed:`, err);
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}
```

## Testes

### Verificar que source mode é detectado corretamente
```bash
# Em um git clone:
node -e "
  const { getAutoUpdateConfig, validateAutoUpdateRuntime } = await import('./src/lib/system/autoUpdate.ts');
  const config = getAutoUpdateConfig();
  console.log('Mode:', config.mode);
  const val = await validateAutoUpdateRuntime(config);
  console.log('Supported:', val.supported, 'Reason:', val.reason);
"
```

### Testes unitários existentes
```bash
node --import tsx/esm --test tests/unit/auto-update.test.mjs
```

## Critérios de Aceite
- [ ] `AutoUpdateMode` inclui `"source"` como tipo válido
- [ ] Sem uso de `as any` para source mode
- [ ] `validateAutoUpdateRuntime` retorna `supported: true` para source repos com git
- [ ] `buildSourceUpdateScript` gera script completo com git checkout, npm install, build
- [ ] POST `/api/system/version` faz SSE stream para source mode
- [ ] Botão "Update Now" aparece habilitado no painel para source installs
- [ ] Testes unitários passam
- [ ] Panel update funciona end-to-end em source install (git clone)
