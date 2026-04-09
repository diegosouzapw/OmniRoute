# Task 2: Remover Fallbacks Hardcoded de `oauth.ts`

## Objetivo
Eliminar todas as credenciais hardcoded do arquivo `src/lib/oauth/constants/oauth.ts`, substituindo os fallbacks `|| "valor"` por `|| ""`. Depois desta mudança, o código depende inteiramente das variáveis de ambiente (que serão auto-populadas pelo `sync-env.mjs`).

## Pré-Requisito
- Task 01 concluída (`.env.example` tem todos os valores reais)
- Task 03 concluída (sync-env garante que `.env` existe com os valores)

## Arquivo Alvo
`/home/diegosouzapw/dev/proxys/9router/src/lib/oauth/constants/oauth.ts`

## Mudanças Linha por Linha

### Linha 12 — CLAUDE_OAUTH_CLIENT_ID
```diff
-  clientId: process.env.CLAUDE_OAUTH_CLIENT_ID || "9d1c250a-e61b-44d9-88ed-5944d1962f5e",
+  clientId: process.env.CLAUDE_OAUTH_CLIENT_ID || "",
```

### Linha 29 — CODEX_OAUTH_CLIENT_ID (CODEX_CONFIG)
```diff
-  clientId: process.env.CODEX_OAUTH_CLIENT_ID || "app_EMoamEEZ73f0CkXaXp7hrann",
+  clientId: process.env.CODEX_OAUTH_CLIENT_ID || "",
```

### Linhas 44-47 — GEMINI_OAUTH_CLIENT_ID e SECRET
```diff
   clientId:
-    process.env.GEMINI_OAUTH_CLIENT_ID ||
-    "681255809395-oo8ft2oprdrnp9e3aqf6av3hmdib135j.apps.googleusercontent.com",
-  clientSecret: process.env.GEMINI_OAUTH_CLIENT_SECRET || "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",
+    process.env.GEMINI_OAUTH_CLIENT_ID || "",
+  clientSecret: process.env.GEMINI_OAUTH_CLIENT_SECRET || "",
```

### Linha 60 — QWEN_OAUTH_CLIENT_ID
```diff
-  clientId: process.env.QWEN_OAUTH_CLIENT_ID || "f0304373b74a44d2b584a3fb70ca9e56",
+  clientId: process.env.QWEN_OAUTH_CLIENT_ID || "",
```

### Linha 95 — KIMI_CODING_OAUTH_CLIENT_ID
```diff
-  clientId: process.env.KIMI_CODING_OAUTH_CLIENT_ID || "17e5f671-d194-4dfb-9706-5516cb48c098",
+  clientId: process.env.KIMI_CODING_OAUTH_CLIENT_ID || "",
```

### Linhas 118-122 — ANTIGRAVITY_OAUTH_CLIENT_ID e SECRET
```diff
   clientId:
-    process.env.ANTIGRAVITY_OAUTH_CLIENT_ID ||
-    "1071006060591-tmhssin2h21lcre235vtolojh4g403ep.apps.googleusercontent.com",
+    process.env.ANTIGRAVITY_OAUTH_CLIENT_ID || "",
   clientSecret:
-    process.env.ANTIGRAVITY_OAUTH_CLIENT_SECRET || "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",
+    process.env.ANTIGRAVITY_OAUTH_CLIENT_SECRET || "",
```

### Linha 145 — CODEX_OAUTH_CLIENT_ID (OPENAI_CONFIG)
```diff
-  clientId: process.env.CODEX_OAUTH_CLIENT_ID || "app_EMoamEEZ73f0CkXaXp7hrann",
+  clientId: process.env.CODEX_OAUTH_CLIENT_ID || "",
```

### Linha 158 — GITHUB_OAUTH_CLIENT_ID
```diff
-  clientId: process.env.GITHUB_OAUTH_CLIENT_ID || "Iv1.b507a08c87ecfe98",
+  clientId: process.env.GITHUB_OAUTH_CLIENT_ID || "",
```

## Atualizar Comentário do Cabeçalho

```diff
 /**
- * OAuth Configuration Constants
- *
- * Credentials read from env vars with hardcoded fallbacks.
- * The hardcoded values are the application's built-in credentials
- * used when users log in via the UI for the first time.
- * Override via env vars or provider-credentials.json for custom setups.
+ * OAuth Configuration Constants
+ *
+ * All credentials are read exclusively from environment variables.
+ * Default values are provided via .env.example and auto-populated by
+ * scripts/sync-env.mjs on install. See .env.example for the built-in
+ * credentials used for localhost setups.
  */
```

## Testes que Podem Precisar de Atualização

Verificar se algum test importa de `oauth.ts` e espera valores hardcoded:
```bash
grep -rn 'GOCSPX\|9d1c250a\|app_EMo\|681255809395\|1071006060591' tests/
```

Se houver testes que dependem dos valores hardcoded, eles precisam:
- Mocar `process.env.X` com o valor esperado, OU
- Usar a variável que vem do `.env` do projeto (que já terá os valores)

## Critérios de Aceite
- [ ] Zero ocorrências de `GOCSPX` em `oauth.ts`
- [ ] Zero ocorrências de `9d1c250a`, `app_EMo`, `681255809395`, `1071006060591` em `oauth.ts`
- [ ] Todos os `||` em clientId/clientSecret têm `""` como fallback
- [ ] Comentário do cabeçalho atualizado
- [ ] `npm run typecheck:core` passa sem erros
- [ ] Todos os testes passam com `.env` contendo os valores
