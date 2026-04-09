# Feature 84 — Atualização de Headers de Provider (Beta Flags e Versões)

**Fonte:** Análise do repositório `kaitranntt/ccs` — módulos `src/cliproxy/types.ts`, `model-catalog.ts`, e análise comparativa de headers
**Prioridade:** 🔴 P0 — Risco de bloqueio por versão
**Complexidade:** Baixa (apenas alterações de configuração)

---

## Motivação

Os providers de API (Claude, Codex, Antigravity, GitHub Copilot) verificam os headers enviados pelos clientes para **identificar versão e features habilitadas**. Headers desatualizados podem causar:

1. **Bloqueio de acesso** — provider recusa conexões com versão muito antiga
2. **Features não habilitadas** — novas betas não são ativadas sem o header correto
3. **Rate limiting diferenciado** — versões antigas podem receber quotas menores
4. **Respostas degradadas** — sem headers de beta, features como `interleaved-thinking` não funcionam

O CCS mantém esses headers atualizados agressivamente. A comparação com o OmniRoute revelou vários valores que precisam de atualização.

---

## O Que Ganhamos

1. **Compatibilidade com features mais recentes** — `context-management-2025-06-27` para Claude
2. **Prevenção de bloqueio** — versões atualizadas evitam rejeição por obsolescência
3. **Fine-grained tool streaming** — nova beta flag habilita streaming granular de ferramentas
4. **Zero risco** — alterações são apenas em constantes, sem mudança de lógica

---

## Situação Atual vs Desejada

### Claude Provider

```diff
# open-sse/config/providerRegistry.js — claude entry

 headers: {
   "Anthropic-Version": "2023-06-01",
-  "Anthropic-Beta": "claude-code-20250219,interleaved-thinking-2025-05-14",
+  "Anthropic-Beta": "claude-code-20250219,oauth-2025-04-20,interleaved-thinking-2025-05-14,fine-grained-tool-streaming-2025-05-14,context-management-2025-06-27",
   "Anthropic-Dangerous-Direct-Browser-Access": "true",
-  "User-Agent": "claude-cli/1.0.81 (external, cli)",
+  "User-Agent": "claude-cli/1.0.83 (external, cli)",
   "X-App": "cli",
   "X-Stainless-Helper-Method": "stream",
   ...
 }
```

**Novas Beta Flags adicionadas:**

| Flag                                     | Propósito                          |
| ---------------------------------------- | ---------------------------------- |
| `oauth-2025-04-20`                       | Habilita flow OAuth 2.0 atualizado |
| `fine-grained-tool-streaming-2025-05-14` | Streaming granular de tool results |
| `context-management-2025-06-27`          | Gerenciamento de contexto avançado |

### Codex Provider

```diff
# open-sse/config/providerRegistry.js — codex entry

 headers: {
-  Version: "0.90.0",
+  Version: "0.92.0",
   "Openai-Beta": "responses=experimental",
-  "User-Agent": "codex-cli/0.90.0 (Windows 10.0.26100; x64)",
+  "User-Agent": "codex-cli/0.92.0 (Windows 10.0.26100; x64)",
 }
```

### Antigravity Provider

```diff
# open-sse/config/providerRegistry.js — antigravity entry

 headers: {
-  "User-Agent": "antigravity/1.102.0 darwin/arm64",
+  "User-Agent": "antigravity/1.104.0 darwin/arm64",
 }
```

### GLM Provider

```diff
# open-sse/config/providerRegistry.js — glm entry

 headers: {
   "Anthropic-Version": "2023-06-01",
-  "Anthropic-Beta": "claude-code-20250219,interleaved-thinking-2025-05-14",
+  "Anthropic-Beta": "claude-code-20250219,interleaved-thinking-2025-05-14,fine-grained-tool-streaming-2025-05-14",
 }
```

### MiniMax Provider

```diff
# open-sse/config/providerRegistry.js — minimax entry

 headers: {
   "Anthropic-Version": "2023-06-01",
-  "Anthropic-Beta": "claude-code-20250219,interleaved-thinking-2025-05-14",
+  "Anthropic-Beta": "claude-code-20250219,interleaved-thinking-2025-05-14,fine-grained-tool-streaming-2025-05-14",
 }
```

---

## Implementação

### Arquivo Único a Modificar: `open-sse/config/providerRegistry.js`

Todas as alterações estão concentradas em um único arquivo. As mudanças são:

1. **Claude `claude`:** Adicionar 3 beta flags + bump User-Agent para 1.0.83
2. **Codex `codex`:** Bump Version e User-Agent para 0.92.0
3. **Antigravity `antigravity`:** Bump User-Agent para 1.104.0
4. **GLM `glm`:** Adicionar `fine-grained-tool-streaming-2025-05-14`
5. **MiniMax `minimax` e `minimax-cn`:** Adicionar `fine-grained-tool-streaming-2025-05-14`
6. **Kimi Coding `kimi-coding`:** Adicionar `fine-grained-tool-streaming-2025-05-14`

### Verificação Pós-Alteração

Após modificar, executar:

```bash
# Verificar que o providerRegistry ainda exporta corretamente
node -e "import('./open-sse/config/providerRegistry.js').then(m => {
  const r = m.REGISTRY;
  console.log('Claude UA:', r.claude.headers['User-Agent']);
  console.log('Claude Beta:', r.claude.headers['Anthropic-Beta']);
  console.log('Codex Version:', r.codex.headers.Version);
  console.log('Antigravity UA:', r.antigravity.headers['User-Agent']);
  console.log('Providers:', Object.keys(r).length);
})"
```

---

## Arquivos a Modificar

| Ação          | Arquivo                               | Descrição                        |
| ------------- | ------------------------------------- | -------------------------------- |
| **MODIFICAR** | `open-sse/config/providerRegistry.js` | Atualizar headers de 6 providers |

---

## Testes Necessários

1. `npm run test:unit` — todos os testes existentes passam (sem regressão)
2. Verificar que headers são enviados corretamente em request real para Claude
3. Verificar que `Anthropic-Beta` inclui novos flags no header da request
4. Verificar que `Version` do Codex aparece como `0.92.0` no header

---

## Referência do CCS

- [providerRegistry.js do OmniRoute](file:///home/diegosouzapw/dev/proxys/9router/open-sse/config/providerRegistry.js) — arquivo alvo das alterações
- CCS `src/cliproxy/types.ts` — definição de versões atuais
- CCS `src/cursor/cursor-config.ts` — headers Cursor para referência
