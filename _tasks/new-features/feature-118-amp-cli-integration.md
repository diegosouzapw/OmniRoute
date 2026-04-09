# Feature 118 — Amp CLI Integration com Model Mapping Regex

## Objetivo

Implementar suporte ao Amp CLI (Sourcegraph) como client compatível, incluindo model mapping bidirecional (exato + regex), preservação de thinking suffix, verificação de disponibilidade de providers no momento do mapeamento e hot-reload das configurações de mapping.

## Motivação

O Amp CLI é uma ferramenta de coding assistente da Sourcegraph que está ganhando adoção significativa. O CLIProxyAPI possui um módulo dedicado (`internal/api/modules/amp/`) que permite que o Amp CLI use o proxy com mapeamento automático de modelos — por exemplo, quando o Amp pede `g25p`, o proxy redireciona para `gemini-2.5-pro`. Esse tipo de "shorthand" é muito popular em cenários CLI.

Além disso, o CLIProxyAPI suporta **regex mappings**, o que permite regras genéricas como "qualquer modelo começando com `g25` → Gemini 2.5". Isso é mais poderoso que aliasing estático.

## O que Ganhamos

- **Compatibilidade Amp CLI**: Suporte direto a mais um CLI tool popular
- **Regex model mapping**: Regras genéricas que cobrem famílias de modelos
- **Thinking suffix preservation**: `g25p(8192)` → `gemini-2.5-pro(8192)` — budget preservado
- **Provider verification**: Mapping só ativa se o provider alvo tem credenciais válidas
- **Hot-reload**: Mappings atualizáveis sem restart

## Situação Atual (Antes)

```
Amp CLI → Pede modelo "g25p"
  → Proxy não reconhece
  → Erro 404: model not found
  → User precisa saber o ID completo: "gemini-2.5-pro"
```

## Situação Proposta (Depois)

```
Amp CLI → Pede modelo "g25p(8192)"
  → Proxy resolve mapping: g25p → gemini-2.5-pro
  → Preserva suffix: gemini-2.5-pro(8192)
  → Verifica: gemini-2.5-pro tem providers? Sim ✓
  → Requisição enviada para gemini-2.5-pro com thinking budget 8192
  → Resposta retornada com sucesso

Amp CLI → Pede modelo "my-custom-model"
  → Regex mapping: /^my-.*/ → claude-sonnet-4-5-20250929
  → Requisição roteada para Claude
```

## Especificação Técnica

### Configuração de Mappings

```json
// config/ampModelMappings.json
{
  "mappings": [
    { "from": "g25p", "to": "gemini-2.5-pro" },
    { "from": "g25f", "to": "gemini-2.5-flash" },
    { "from": "cs45", "to": "claude-sonnet-4-5-20250929" },
    { "from": "co46", "to": "claude-opus-4-6" },
    { "from": "g53c", "to": "gpt-5.3-codex" },
    { "from": "^gpt-latest$", "to": "gpt-5.3-codex", "regex": true },
    { "from": "^g2[0-9].*", "to": "gemini-2.5-pro", "regex": true }
  ]
}
```

### ModelMapper (Thread-safe)

```javascript
// src/lib/amp/modelMapper.js

export class ModelMapper {
  constructor(mappings = []) {
    this.exactMappings = new Map();  // normalized lowercase → to
    this.regexMappings = [];         // { re: RegExp, to: string }[]
    this.updateMappings(mappings);
  }

  /**
   * Map a requested model to the target, preserving thinking suffix.
   * Returns empty string if no mapping or target has no providers.
   */
  mapModel(requestedModel) {
    if (!requestedModel) return '';

    // Extract thinking suffix: "g25p(8192)" → base="g25p", suffix="8192"
    const { base, suffix, hasSuffix } = this.parseSuffix(requestedModel);
    const normalized = base.toLowerCase().trim();

    // 1. Exact lookup
    let target = this.exactMappings.get(normalized);

    // 2. Regex fallback
    if (!target) {
      for (const { re, to } of this.regexMappings) {
        if (re.test(base)) {
          target = to;
          break;
        }
      }
    }

    if (!target) return '';

    // 3. Check target has providers (via model registry)
    const { registry } = await import('@/lib/registry/modelRegistry');
    const targetBase = this.parseSuffix(target).base;
    const models = registry.getAvailableModelsByProvider(targetBase);
    if (!models || models.length === 0) return '';

    // 4. Preserve suffix (config suffix > user suffix)
    const targetParsed = this.parseSuffix(target);
    if (targetParsed.hasSuffix) return target; // Config suffix wins
    if (hasSuffix && suffix) return `${target}(${suffix})`;

    return target;
  }

  parseSuffix(model) {
    const match = model.match(/^(.+?)\(([^)]*)\)$/);
    if (match) return { base: match[1], suffix: match[2], hasSuffix: true };
    return { base: model, suffix: '', hasSuffix: false };
  }

  /** Hot-reload mappings from config */
  updateMappings(mappings) {
    this.exactMappings = new Map();
    this.regexMappings = [];

    for (const m of mappings) {
      if (!m.from || !m.to) continue;
      if (m.regex) {
        try {
          this.regexMappings.push({ re: new RegExp(m.from, 'i'), to: m.to });
        } catch (e) {
          console.warn(`Invalid regex mapping: ${m.from}`, e);
        }
      } else {
        this.exactMappings.set(m.from.toLowerCase().trim(), m.to);
      }
    }
  }
}
```

### Rotas Amp

```javascript
// src/api/routes/amp.js

router.post("/api/provider/:provider/v1/chat/completions", authMiddleware, async (req, res) => {
  const { provider } = req.params;
  const requestedModel = req.body.model;

  // Try mapping first
  const mappedModel = ampMapper.mapModel(requestedModel);
  if (mappedModel) {
    req.body.model = mappedModel;
    logger.info(`Amp model mapped: ${requestedModel} → ${mappedModel}`);
  }

  // Route to standard chat handler
  return chatHandler(req, res);
});
```

## Arquivos a Criar/Modificar

| Arquivo                        | Ação                                |
| ------------------------------ | ----------------------------------- |
| `src/lib/amp/modelMapper.js`   | **NOVO** — Model mapper com regex   |
| `config/ampModelMappings.json` | **NOVO** — Configuração de mappings |
| `src/api/routes/amp.js`        | **NOVO** — Rotas Amp CLI            |
| `src/sse/handlers/chat.js`     | **MODIFICAR** — Integrar mapper     |
| `open-sse/sse-server.js`       | **MODIFICAR** — Registrar rotas Amp |

## Critérios de Aceite

- [ ] Mappings exatos funcionam (case-insensitive)
- [ ] Mappings regex funcionam com flags case-insensitive
- [ ] Thinking suffix `(8192)` é preservado no modelo mapeado
- [ ] Config suffix tem prioridade sobre user suffix
- [ ] Mapping é ignorado se provider alvo não tem credenciais
- [ ] Hot-reload de mappings sem restart
- [ ] Log indica quando mapping foi aplicado

## Referência

- [CLIProxyAPI: internal/api/modules/amp/model_mapping.go](https://github.com/router-for-me/CLIProxyAPI) — 172 linhas
- [CLIProxyAPI: internal/api/modules/amp/proxy.go](https://github.com/router-for-me/CLIProxyAPI) — Proxy handler Amp
