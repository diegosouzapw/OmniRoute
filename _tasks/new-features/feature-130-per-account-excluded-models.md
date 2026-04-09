# Feature 130 — Per-Account Excluded Models

## Objetivo

Implementar exclusão de modelos a nível de credencial individual (per-account), permitindo que cada API key ou OAuth token tenha sua própria lista de modelos que NÃO deve servir — complementando a exclusão global/por-canal já planejada na feature-109.

## Motivação

A feature-109 (Model Exclusion Wildcards) cobre exclusão global (por canal) e por credencial, mas usa um arquivo de configuração centralizado (`config/excludedModels.json`). O CLIProxyAPI recently adicionou suporte a `excluded_models` **embutido na configuração de cada key**, o que é mais intuitivo e gerenciável via dashboard.

Cenários:

- Conta Free da Anthropic não tem acesso a Opus → excluir `claude-opus-*` nessa conta
- Conta Google com quota apenas para Flash → excluir `gemini-*-pro*`
- Conta de teste → excluir modelos que consomem muita quota

## O que Ganhamos

- **Gerenciamento intuitivo**: Exclusões junto à credencial, não em config separada
- **Dashboard-friendly**: Admin exclui modelos direto na tela da credencial
- **Atomicidade**: Quando credencial é removida, exclusões vão junto
- **CLIProxyAPI parity**: Compatível com config format do upstream

## Situação Atual (Antes)

```
Credencial A: gemini-pro (Free)
  → Expõe gemini-2.5-pro, gemini-2.5-flash, gemini-3-pro-preview...
  → User tenta usar gemini-2.5-pro → Erro 429 (quota)
  → Experiência ruim — modelo não deveria aparecer para esta conta

Para excluir: editar config/excludedModels.json separadamente
  → Desconexão entre credencial e suas restrições
```

## Situação Proposta (Depois)

```
Credencial A: gemini-pro (Free)
  excluded_models: ["gemini-2.5-pro*", "gemini-3-pro*"]
  → Somente gemini-2.5-flash listado para esta credencial
  → User Não vê modelos inacessíveis ✓

Dashboard:
  ┌─ Credencial: gemini-free-account ──────────┐
  │ Provider: Gemini CLI                        │
  │ Status: ✅ Ativo                             │
  │ Excluded Models:                            │
  │   [x] gemini-2.5-pro*                       │
  │   [x] gemini-3-pro*                         │
  │   [ ] Add exclusion pattern...              │
  └─────────────────────────────────────────────┘
```

## Especificação Técnica

### Schema de Credencial

```javascript
// Extensão do schema de credencial existente
{
  id: "cred-gemini-free-123",
  provider: "gemini-cli",
  name: "Gemini Free Account",
  apiKey: "AIzaSy...",
  priority: 3,

  // NOVO: per-account excluded models
  excludedModels: [
    "gemini-2.5-pro*",    // Wildcard: todos que começam com gemini-2.5-pro
    "gemini-3-pro*",      // Wildcard: todos que começam com gemini-3-pro
    "gemini-3-flash-preview" // Exato: este modelo específico
  ]
}
```

### Filtragem no Model Listing

```javascript
// src/sse/services/model.js

import { isModelExcluded } from "@/lib/models/wildcardMatcher";

function getModelsForCredential(credential, allModels) {
  if (!credential.excludedModels || credential.excludedModels.length === 0) {
    return allModels;
  }

  return allModels.filter((model) => !isModelExcluded(model.id, credential.excludedModels));
}
```

### Filtragem no Roteamento

```javascript
// src/sse/handlers/chat.js — ao selecionar credencial

function selectCredentialForModel(credentials, modelId) {
  return credentials.filter((cred) => {
    // Pular credenciais que excluem este modelo
    if (isModelExcluded(modelId, cred.excludedModels)) return false;
    return true;
  });
}
```

### Migration do DB

```javascript
// Adicionar coluna excluded_models do tipo JSON ao DB de credenciais

// Para SQLite (localDb.js):
ALTER TABLE provider_connections ADD COLUMN excluded_models TEXT DEFAULT '[]';

// Acesso:
function getCredentialExclusions(credentialId) {
  const row = db.prepare('SELECT excluded_models FROM provider_connections WHERE id = ?')
    .get(credentialId);
  return JSON.parse(row?.excluded_models || '[]');
}
```

### CRUD via API

```javascript
// PUT /api/credentials/:id/excluded-models
router.put("/api/credentials/:id/excluded-models", async (req, res) => {
  const { id } = req.params;
  const { patterns } = req.body; // ["gemini-2.5-pro*", "gemini-3-*"]

  // Validar patterns
  for (const p of patterns) {
    if (p.length === 0 || p === "**") {
      return res.status(400).json({ error: "Invalid exclusion pattern" });
    }
  }

  await db.updateCredentialExclusions(id, patterns);
  res.json({ excludedModels: patterns });
});
```

## Arquivos a Criar/Modificar

| Arquivo                         | Ação                                             |
| ------------------------------- | ------------------------------------------------ |
| `src/lib/localDb.js`            | **MODIFICAR** — Schema com excluded_models JSON  |
| `src/sse/services/model.js`     | **MODIFICAR** — Filtrar na listagem per-cred     |
| `src/sse/handlers/chat.js`      | **MODIFICAR** — Validar na seleção de credencial |
| `src/api/routes/credentials.js` | **MODIFICAR** — CRUD de exclusions               |
| Dashboard credentials UI        | **MODIFICAR** — UI para gerenciar exclusions     |

## Relação com feature-109

A feature-109 (Model Exclusion Wildcards) define o **sistema de wildcards e a lógica de matching**. Esta feature (130) adiciona um **ponto de configuração per-credential** que reutiliza a mesma infraestrutura de wildcard matching.

```
feature-109: wildcardMatch(), isModelExcluded()  ← Infraestrutura
feature-130: credential.excludedModels           ← Ponto de configuração per-account
```

Implementar feature-109 primeiro é pré-requisito para esta feature.

## Critérios de Aceite

- [ ] Cada credencial pode ter uma lista `excludedModels` (wildcard patterns)
- [ ] Modelos excluídos per-credential não aparecem em `/v1/models` para essa cred
- [ ] Roteador não seleciona credencial se ela exclui o modelo solicitado
- [ ] Dashboard permite adicionar/remover patterns de exclusão por credencial
- [ ] Exclusões são persistidas no DB local
- [ ] API CRUD para gerenciar exclusões programaticamente
- [ ] Reutiliza `wildcardMatch` da feature-109

## Referência

- [CLIProxyAPI: commit recente](https://github.com/router-for-me/CLIProxyAPI) — Per-account excluded_models feature
- [CLIProxyAPI: config.example.yaml linhas 108-111](https://github.com/router-for-me/CLIProxyAPI) — per-key excluded-models
