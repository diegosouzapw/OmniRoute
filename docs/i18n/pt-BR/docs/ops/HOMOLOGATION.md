# Homologation Suite (`npm run homolog`) (Português (Brasil))

🌐 **Languages:** 🇺🇸 [English](../../../../ops/HOMOLOGATION.md) · 🇪🇹 [am](../../../am/docs/ops/HOMOLOGATION.md) · 🇸🇦 [ar](../../../ar/docs/ops/HOMOLOGATION.md) · 🇦🇿 [az](../../../az/docs/ops/HOMOLOGATION.md) · 🇧🇬 [bg](../../../bg/docs/ops/HOMOLOGATION.md) · 🇧🇩 [bn](../../../bn/docs/ops/HOMOLOGATION.md) · 🇧🇦 [bs](../../../bs/docs/ops/HOMOLOGATION.md) · 🇨🇿 [cs](../../../cs/docs/ops/HOMOLOGATION.md) · 🇩🇰 [da](../../../da/docs/ops/HOMOLOGATION.md) · 🇩🇪 [de](../../../de/docs/ops/HOMOLOGATION.md) · 🇬🇷 [el](../../../el/docs/ops/HOMOLOGATION.md) · 🇪🇸 [es](../../../es/docs/ops/HOMOLOGATION.md) · 🇪🇪 [et](../../../et/docs/ops/HOMOLOGATION.md) · 🇮🇷 [fa](../../../fa/docs/ops/HOMOLOGATION.md) · 🇫🇮 [fi](../../../fi/docs/ops/HOMOLOGATION.md) · 🇫🇷 [fr](../../../fr/docs/ops/HOMOLOGATION.md) · 🇮🇪 [ga](../../../ga/docs/ops/HOMOLOGATION.md) · 🇮🇳 [gu](../../../gu/docs/ops/HOMOLOGATION.md) · 🇳🇬 [ha](../../../ha/docs/ops/HOMOLOGATION.md) · 🇮🇱 [he](../../../he/docs/ops/HOMOLOGATION.md) · 🇮🇳 [hi](../../../hi/docs/ops/HOMOLOGATION.md) · 🇭🇷 [hr](../../../hr/docs/ops/HOMOLOGATION.md) · 🇭🇺 [hu](../../../hu/docs/ops/HOMOLOGATION.md) · 🇦🇲 [hy](../../../hy/docs/ops/HOMOLOGATION.md) · 🇮🇩 [id](../../../id/docs/ops/HOMOLOGATION.md) · 🇳🇬 [ig](../../../ig/docs/ops/HOMOLOGATION.md) · 🇮🇹 [it](../../../it/docs/ops/HOMOLOGATION.md) · 🇯🇵 [ja](../../../ja/docs/ops/HOMOLOGATION.md) · 🇬🇪 [ka](../../../ka/docs/ops/HOMOLOGATION.md) · 🇰🇭 [km](../../../km/docs/ops/HOMOLOGATION.md) · 🇮🇳 [kn](../../../kn/docs/ops/HOMOLOGATION.md) · 🇰🇷 [ko](../../../ko/docs/ops/HOMOLOGATION.md) · 🇱🇹 [lt](../../../lt/docs/ops/HOMOLOGATION.md) · 🇱🇻 [lv](../../../lv/docs/ops/HOMOLOGATION.md) · 🇮🇳 [ml](../../../ml/docs/ops/HOMOLOGATION.md) · 🇮🇳 [mr](../../../mr/docs/ops/HOMOLOGATION.md) · 🇲🇾 [ms](../../../ms/docs/ops/HOMOLOGATION.md) · 🇲🇹 [mt](../../../mt/docs/ops/HOMOLOGATION.md) · 🇲🇲 [my](../../../my/docs/ops/HOMOLOGATION.md) · 🇳🇵 [ne](../../../ne/docs/ops/HOMOLOGATION.md) · 🇳🇱 [nl](../../../nl/docs/ops/HOMOLOGATION.md) · 🇳🇴 [no](../../../no/docs/ops/HOMOLOGATION.md) · 🇮🇳 [or](../../../or/docs/ops/HOMOLOGATION.md) · 🇮🇳 [pa](../../../pa/docs/ops/HOMOLOGATION.md) · 🇵🇭 [phi](../../../phi/docs/ops/HOMOLOGATION.md) · 🇵🇱 [pl](../../../pl/docs/ops/HOMOLOGATION.md) · 🇵🇹 [pt](../../../pt/docs/ops/HOMOLOGATION.md) · 🇷🇴 [ro](../../../ro/docs/ops/HOMOLOGATION.md) · 🇷🇺 [ru](../../../ru/docs/ops/HOMOLOGATION.md) · 🇱🇰 [si](../../../si/docs/ops/HOMOLOGATION.md) · 🇸🇰 [sk](../../../sk/docs/ops/HOMOLOGATION.md) · 🇸🇮 [sl](../../../sl/docs/ops/HOMOLOGATION.md) · 🇷🇸 [sr](../../../sr/docs/ops/HOMOLOGATION.md) · 🇸🇪 [sv](../../../sv/docs/ops/HOMOLOGATION.md) · 🇰🇪 [sw](../../../sw/docs/ops/HOMOLOGATION.md) · 🇮🇳 [ta](../../../ta/docs/ops/HOMOLOGATION.md) · 🇮🇳 [te](../../../te/docs/ops/HOMOLOGATION.md) · 🇹🇭 [th](../../../th/docs/ops/HOMOLOGATION.md) · 🇹🇷 [tr](../../../tr/docs/ops/HOMOLOGATION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/HOMOLOGATION.md) · 🇵🇰 [ur](../../../ur/docs/ops/HOMOLOGATION.md) · 🇺🇿 [uz](../../../uz/docs/ops/HOMOLOGATION.md) · 🇻🇳 [vi](../../../vi/docs/ops/HOMOLOGATION.md) · 🇳🇬 [yo](../../../yo/docs/ops/HOMOLOGATION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/HOMOLOGATION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/HOMOLOGATION.md)

---

Validação E2E em ambiente real do deploy do OmniRoute em execução na VPS de homologação
(`HOMOLOG_BASE_URL`, por exemplo, `http://192.168.0.15:20128`). Um único comando substitui a
lista de verificação manual do STOP #2 da release por uma execução automatizada que produz evidências.

## O que é abrangido

| Camada                    | O que é verificado                                                                                                                                                                                                   | Implementação                                                                 |
| ------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| L0 — saúde/paridade       | `/api/monitoring/health` responde com `200`, `status: "healthy"` e a versão esperada                                                                                                                                 | `scripts/homolog/lib/parity.mjs`                                              |
| L1a — chave efêmera       | Login de administrador → `POST /api/keys` cria uma chave de API com escopo para a execução, revogada (`DELETE /api/keys/:id`) em um bloco `finally`, independentemente do resultado                                  | `scripts/homolog/lib/adminClient.mjs`                                         |
| L1b — superfície da API   | Catálogo `/v1/models`, uma conclusão de chat real sem streaming (modelo crítico para o tier, `max_tokens: 5`), uma resposta `401` para chave inválida e o endpoint público `/api/monitoring/health`                  | `tests/homolog/api/core.http` (httpYac)                                       |
| L1c — streaming SSE       | Conclusão de chat real com streaming; verifica `text/event-stream`, pelo menos um delta de conteúdo e um terminador `[DONE]`                                                                                         | `scripts/homolog/lib/sseCheck.mjs`                                            |
| L2 — provedores reais     | Uma solicitação de chat de custo mínimo por provedor crítico presente no catálogo `/v1/models` ativo, gerada dinamicamente por meio do promptfoo                                                                     | `scripts/homolog/gen-promptfoo.mjs` + `scripts/homolog/lib/providerTiers.mjs` |
| L4a — autenticação da UI  | Faz login uma vez pelo formulário de login real e reutiliza a sessão (`storageState`) em toda a camada de UI                                                                                                         | `tests/homolog/ui/auth.setup.ts`                                              |
| L4b — rotas da UI         | Cada `page.tsx` estático em `src/app/(dashboard)/dashboard` (descoberto a partir do sistema de arquivos; rotas dinâmicas `[param]` são ignoradas) carrega sem erro HTTP, erro de página ou limite de erro do Next.js | `tests/homolog/ui/routes.spec.ts`                                             |
| L4c — fluxo crítico da UI | Cria uma chave de API pela UI do dashboard e a revoga em seguida (sem deixar resíduos na VPS)                                                                                                                        | `tests/homolog/ui/api-key-flow.spec.ts`                                       |
| L5 — relatório unificado  | Combina httpYac (via `junit-to-ctrf`), o adaptador promptfoo→CTRF e o reporter CTRF do Playwright em um único `homolog-ctrf.json`, além de um `homolog-report/summary.md` legível por humanos                        | `scripts/homolog/run.mjs`                                                     |

Nenhum envolvimento de LLM na própria repetição — esta é uma bateria de regressão determinística,
não uma avaliação. A IA entra apenas em trabalhos futuros de manutenção (consulte o Roadmap abaixo).

## Pré-requisitos

1. Copie `.env.homolog.example` para `.env.homolog` (ignorado pelo git — nunca faça commit dele) e preencha:
   - `HOMOLOG_BASE_URL` — o deploy de destino, por exemplo, `http://192.168.0.15:20128`.
   - `HOMOLOG_ADMIN_PASSWORD` — a senha de gerenciamento do dashboard desse deploy.
   - `HOMOLOG_CRITICAL_PROVIDERS` — prefixos de provedores separados por vírgulas que recebem uma
     solicitação real de chat de smoke test (por exemplo, `openai,anthropic,gemini,codex,grok,glm,deepseek,openrouter`).
   - `HOMOLOG_API_KEY` — deixe vazio nas execuções normais; a suíte cria e revoga sua
     própria chave efêmera. Defina-a apenas para depurar uma única camada isoladamente.
2. Execute `npm install` no repositório (as dependências da suíte — `httpyac`, `promptfoo`,
   `playwright-ctrf-json-reporter`, `junit-to-ctrf`, `ctrf` — são devDependencies comuns).
3. Execute `npx playwright install` se os binários do navegador ainda não estiverem presentes.

## Como executar

```bash
npm run homolog
```

Para validar em um deploy cuja versão não corresponda ao `package.json` local
(por exemplo, um ambiente de homologação que ainda esteja em uma versão de patch anterior), substitua
explicitamente a versão esperada:

```bash
HOMOLOG_EXPECT_VERSION=3.8.47 npm run homolog
```

A execução termina com um código diferente de zero se qualquer camada falhar e sempre tenta revogar a chave
de API efêmera que criou, mesmo em caso de falha (bloco `finally` em `scripts/homolog/run.mjs`).

## Como ler o relatório

Toda a saída é gravada em `homolog-report/` (ignorado pelo git):

- `summary.md` — a mesma tabela exibida em stdout, com uma linha por camada (✅/❌ + detalhes).
- `homolog-ctrf.json` — o relatório CTRF unificado (mesclagem dos resultados de API/SSE, smoke test de provedores e
  UI) — este é o artefato que deve ser anexado ao checklist do STOP #2 de uma release.
- `httpyac-junit.xml`, `api-ctrf.json`, `providers-ctrf.json`, `ui-ctrf.json` — os
  relatórios brutos/intermediários de cada camada.
- `promptfooconfig.yaml`, `provider-misses.json` — a configuração gerada do promptfoo para
  a execução atual e quaisquer provedores críticos que estejam ausentes do catálogo ativo.

Uma falha em L0 interrompe a execução imediatamente (nenhuma chave efêmera é criada), pois uma incompatibilidade
de versão/saúde significa que todas as camadas posteriores estariam validando o deploy incorreto.

## Redefinição da linha de base quando a UI muda legitimamente

L4b (smoke test de rotas) e L4c (fluxo de UI da chave de API) usam localizadores reais do DOM, e não
snapshots, portanto, a maioria das alterações legítimas na UI não exige nenhuma atualização da suíte. Quando uma alteração
quebrar um localizador (por exemplo, o rótulo de um botão renomeado ou uma página de configurações movida):

1. Confirme novamente o localizador no código-fonte atual (as especificações já documentam em qual
   arquivo/linha cada localizador foi confirmado — siga o mesmo padrão, não tente adivinhar).
2. Atualize a especificação em `tests/homolog/ui/`.
3. Execute novamente `npm run homolog` (ou apenas a especificação afetada do Playwright) no VPS para
   confirmar a correção e, depois, faça o commit.

Não há uma linha de base visual/de pixels nesta suíte (F1) — consulte o Roadmap para isso.

## Roadmap (F2 / F3)

O design e a implantação em fases estão na especificação interna de planejamento
`_tasks/superpowers/specs/2026-07-13-homolog-e2e-suite-design.md` (sem link — artefato interno de
`_tasks/`, não faz parte da documentação rastreada deste repositório). Resumo:

- **F2** — gravação completa do passo a passo → os Playwright Test Agents (`planner`/`generator`)
  a transformam em especificações de fluxo (criar combo, testar provedor, editar configurações, ferramentas MCP) +
  linha de base de regressão visual (Lost Pixel) com máscaras sobre dados dinâmicos (métricas,
  timestamps, logs) + uma rotina de manutenção `healer` por release.
- **F3** — cobertura de resiliência/contrato/integração: toxiproxy + um provedor falso compatível com OpenAI
  no devbox, um combo `homolog-resilience` no VPS apontando para ele
  (timeout injetado → verificar fallback + abertura/fechamento do circuit breaker por meio de
  `/api/monitoring/health`); testes de contrato controlados com Schemathesis em
  `docs/openapi.yaml` (`--max-examples` baixo, seeds fixas, apenas endpoints não relacionados a LLM); e
  integração de `npm run homolog` + seu `summary.md` à fase STOP #2 de `/generate-release`.
