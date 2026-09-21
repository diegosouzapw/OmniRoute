# Homologation Suite (`npm run homolog`) (Português (Portugal))

🌐 **Languages:** 🇺🇸 [English](../../../../ops/HOMOLOGATION.md) · 🇪🇹 [am](../../../am/docs/ops/HOMOLOGATION.md) · 🇸🇦 [ar](../../../ar/docs/ops/HOMOLOGATION.md) · 🇦🇿 [az](../../../az/docs/ops/HOMOLOGATION.md) · 🇧🇬 [bg](../../../bg/docs/ops/HOMOLOGATION.md) · 🇧🇩 [bn](../../../bn/docs/ops/HOMOLOGATION.md) · 🇨🇿 [cs](../../../cs/docs/ops/HOMOLOGATION.md) · 🇩🇰 [da](../../../da/docs/ops/HOMOLOGATION.md) · 🇩🇪 [de](../../../de/docs/ops/HOMOLOGATION.md) · 🇬🇷 [el](../../../el/docs/ops/HOMOLOGATION.md) · 🇪🇸 [es](../../../es/docs/ops/HOMOLOGATION.md) · 🇪🇪 [et](../../../et/docs/ops/HOMOLOGATION.md) · 🇮🇷 [fa](../../../fa/docs/ops/HOMOLOGATION.md) · 🇫🇮 [fi](../../../fi/docs/ops/HOMOLOGATION.md) · 🇫🇷 [fr](../../../fr/docs/ops/HOMOLOGATION.md) · 🇮🇪 [ga](../../../ga/docs/ops/HOMOLOGATION.md) · 🇮🇳 [gu](../../../gu/docs/ops/HOMOLOGATION.md) · 🇳🇬 [ha](../../../ha/docs/ops/HOMOLOGATION.md) · 🇮🇱 [he](../../../he/docs/ops/HOMOLOGATION.md) · 🇮🇳 [hi](../../../hi/docs/ops/HOMOLOGATION.md) · 🇭🇷 [hr](../../../hr/docs/ops/HOMOLOGATION.md) · 🇭🇺 [hu](../../../hu/docs/ops/HOMOLOGATION.md) · 🇦🇲 [hy](../../../hy/docs/ops/HOMOLOGATION.md) · 🇮🇩 [id](../../../id/docs/ops/HOMOLOGATION.md) · 🇳🇬 [ig](../../../ig/docs/ops/HOMOLOGATION.md) · 🇮🇹 [it](../../../it/docs/ops/HOMOLOGATION.md) · 🇯🇵 [ja](../../../ja/docs/ops/HOMOLOGATION.md) · 🇬🇪 [ka](../../../ka/docs/ops/HOMOLOGATION.md) · 🇰🇭 [km](../../../km/docs/ops/HOMOLOGATION.md) · 🇮🇳 [kn](../../../kn/docs/ops/HOMOLOGATION.md) · 🇰🇷 [ko](../../../ko/docs/ops/HOMOLOGATION.md) · 🇱🇹 [lt](../../../lt/docs/ops/HOMOLOGATION.md) · 🇱🇻 [lv](../../../lv/docs/ops/HOMOLOGATION.md) · 🇮🇳 [ml](../../../ml/docs/ops/HOMOLOGATION.md) · 🇮🇳 [mr](../../../mr/docs/ops/HOMOLOGATION.md) · 🇲🇾 [ms](../../../ms/docs/ops/HOMOLOGATION.md) · 🇲🇹 [mt](../../../mt/docs/ops/HOMOLOGATION.md) · 🇲🇲 [my](../../../my/docs/ops/HOMOLOGATION.md) · 🇳🇵 [ne](../../../ne/docs/ops/HOMOLOGATION.md) · 🇳🇱 [nl](../../../nl/docs/ops/HOMOLOGATION.md) · 🇳🇴 [no](../../../no/docs/ops/HOMOLOGATION.md) · 🇮🇳 [or](../../../or/docs/ops/HOMOLOGATION.md) · 🇮🇳 [pa](../../../pa/docs/ops/HOMOLOGATION.md) · 🇵🇭 [phi](../../../phi/docs/ops/HOMOLOGATION.md) · 🇵🇱 [pl](../../../pl/docs/ops/HOMOLOGATION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/HOMOLOGATION.md) · 🇷🇴 [ro](../../../ro/docs/ops/HOMOLOGATION.md) · 🇷🇺 [ru](../../../ru/docs/ops/HOMOLOGATION.md) · 🇱🇰 [si](../../../si/docs/ops/HOMOLOGATION.md) · 🇸🇰 [sk](../../../sk/docs/ops/HOMOLOGATION.md) · 🇸🇮 [sl](../../../sl/docs/ops/HOMOLOGATION.md) · 🇷🇸 [sr](../../../sr/docs/ops/HOMOLOGATION.md) · 🇸🇪 [sv](../../../sv/docs/ops/HOMOLOGATION.md) · 🇰🇪 [sw](../../../sw/docs/ops/HOMOLOGATION.md) · 🇮🇳 [ta](../../../ta/docs/ops/HOMOLOGATION.md) · 🇮🇳 [te](../../../te/docs/ops/HOMOLOGATION.md) · 🇹🇭 [th](../../../th/docs/ops/HOMOLOGATION.md) · 🇹🇷 [tr](../../../tr/docs/ops/HOMOLOGATION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/HOMOLOGATION.md) · 🇵🇰 [ur](../../../ur/docs/ops/HOMOLOGATION.md) · 🇺🇿 [uz](../../../uz/docs/ops/HOMOLOGATION.md) · 🇻🇳 [vi](../../../vi/docs/ops/HOMOLOGATION.md) · 🇳🇬 [yo](../../../yo/docs/ops/HOMOLOGATION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/HOMOLOGATION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/HOMOLOGATION.md)

---

Validação E2E em ambiente real da implementação do OmniRoute em execução no VPS de homologação
(`HOMOLOG_BASE_URL`, por exemplo, `http://192.168.0.15:20128`). Um único comando substitui a lista de
verificação manual STOP #2 do lançamento por uma execução automatizada que produz evidências.

## O que abrange

| Camada                    | O que verifica                                                                                                                                                                                                                            | Implementação                                                                 |
| ------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| L0 — estado/paridade      | `/api/monitoring/health` responde com `200`, `status: "healthy"` e a versão esperada                                                                                                                                                      | `scripts/homolog/lib/parity.mjs`                                              |
| L1a — chave efémera       | Início de sessão de administrador → `POST /api/keys` cria uma chave de API com âmbito limitado à execução, revogada (`DELETE /api/keys/:id`) num bloco `finally`, independentemente do resultado                                          | `scripts/homolog/lib/adminClient.mjs`                                         |
| L1b — superfície da API   | Catálogo `/v1/models`, uma conclusão de chat real sem streaming (modelo crítico para o nível, `max_tokens: 5`), uma resposta `401` para uma chave inválida e o endpoint público `/api/monitoring/health`                                  | `tests/homolog/api/core.http` (httpYac)                                       |
| L1c — streaming SSE       | Conclusão de chat real com streaming; confirma `text/event-stream`, pelo menos um delta de conteúdo e um terminador `[DONE]`                                                                                                              | `scripts/homolog/lib/sseCheck.mjs`                                            |
| L2 — fornecedores reais   | Um pedido de chat de custo mínimo por cada fornecedor crítico presente no catálogo `/v1/models` ativo, gerado dinamicamente através do promptfoo                                                                                          | `scripts/homolog/gen-promptfoo.mjs` + `scripts/homolog/lib/providerTiers.mjs` |
| L4a — autenticação da IU  | Inicia sessão uma vez através do formulário de início de sessão real e reutiliza a sessão (`storageState`) em toda a camada da IU                                                                                                         | `tests/homolog/ui/auth.setup.ts`                                              |
| L4b — rotas da IU         | Todas as páginas `page.tsx` estáticas em `src/app/(dashboard)/dashboard` (descobertas a partir do sistema de ficheiros, ignorando as rotas dinâmicas `[param]`) são carregadas sem erro HTTP, erro de página ou limite de erro do Next.js | `tests/homolog/ui/routes.spec.ts`                                             |
| L4c — fluxo crítico da IU | Cria uma chave de API através da IU do painel e revoga-a de seguida (não deixa resíduos no VPS)                                                                                                                                           | `tests/homolog/ui/api-key-flow.spec.ts`                                       |
| L5 — relatório unificado  | Combina o httpYac (através de `junit-to-ctrf`), o adaptador promptfoo→CTRF e o gerador de relatórios CTRF do Playwright num único `homolog-ctrf.json`, além de um `homolog-report/summary.md` legível por humanos                         | `scripts/homolog/run.mjs`                                                     |

Sem qualquer intervenção de LLM na própria repetição — trata-se de uma bateria de regressão determinística,
não de uma avaliação. A IA apenas intervém em futuros trabalhos de manutenção (consulte o Roteiro abaixo).

## Pré-requisitos

1. Copie `.env.homolog.example` para `.env.homolog` (ignorado pelo git — nunca faça commit deste ficheiro) e preencha:
   - `HOMOLOG_BASE_URL` — a implementação de destino, por exemplo, `http://192.168.0.15:20128`.
   - `HOMOLOG_ADMIN_PASSWORD` — a palavra-passe de gestão do dashboard dessa implementação.
   - `HOMOLOG_CRITICAL_PROVIDERS` — prefixos de fornecedores separados por vírgulas que recebem um
     pedido real de chat para teste de fumo (por exemplo, `openai,anthropic,gemini,codex,grok,glm,deepseek,openrouter`).
   - `HOMOLOG_API_KEY` — deixe vazio nas execuções normais; a suite cria e revoga a sua
     própria chave efémera. Defina este valor apenas para depurar uma única camada isoladamente.
2. Execute `npm install` no repositório (as dependências da suite — `httpyac`, `promptfoo`,
   `playwright-ctrf-json-reporter`, `junit-to-ctrf`, `ctrf` — são devDependencies normais).
3. Execute `npx playwright install` se os binários dos browsers ainda não estiverem presentes.

## Como executar

```bash
npm run homolog
```

Para validar uma implementação cuja versão não corresponde ao `package.json` local
(por exemplo, um ambiente de homologação que ainda esteja numa versão de correção anterior), substitua
explicitamente a versão esperada:

```bash
HOMOLOG_EXPECT_VERSION=3.8.47 npm run homolog
```

A execução termina com um código diferente de zero se alguma camada falhar e tenta sempre revogar a chave de
API efémera que criou, mesmo em caso de falha (bloco `finally` em `scripts/homolog/run.mjs`).

## Consultar o relatório

Todos os resultados são guardados em `homolog-report/` (ignorado pelo git):

- `summary.md` — a mesma tabela apresentada na saída padrão, uma linha por camada (✅/❌ + detalhes).
- `homolog-ctrf.json` — o relatório CTRF unificado (fusão dos resultados de API/SSE, testes de fumo dos fornecedores e
  interface) — este é o artefacto a anexar à lista de verificação STOP #2 de uma versão.
- `httpyac-junit.xml`, `api-ctrf.json`, `providers-ctrf.json`, `ui-ctrf.json` — os
  relatórios brutos/intermédios de cada camada.
- `promptfooconfig.yaml`, `provider-misses.json` — a configuração do promptfoo gerada para
  a execução atual e quaisquer fornecedores críticos em falta no catálogo ativo.

Uma falha em L0 interrompe imediatamente a execução (não é criada nenhuma chave efémera), uma vez que uma
incompatibilidade de versão/estado significa que todas as camadas subsequentes estariam a validar a implementação errada.

## Reestabelecer a referência quando a interface muda legitimamente

L4b (teste de fumo das rotas) e L4c (fluxo da interface para chaves de API) utilizam localizadores DOM reais, não
instantâneos, pelo que a maioria das alterações legítimas à interface não exige qualquer atualização da suite. Quando uma alteração
invalida um localizador (por exemplo, a alteração do nome de um botão ou a mudança de localização de uma página de definições):

1. Volte a confirmar o localizador no código-fonte atual (as especificações já documentam em que
   ficheiro/linha cada localizador foi confirmado — siga o mesmo padrão, não tente adivinhar).
2. Atualize a especificação em `tests/homolog/ui/`.
3. Volte a executar `npm run homolog` (ou apenas a especificação Playwright afetada) no VPS para
   confirmar a correção e, em seguida, faça commit.

Esta suite não possui uma referência visual/de píxeis (F1) — consulte o roteiro para mais informações.

## Roteiro (F2 / F3)

A conceção e implementação faseada encontram-se na especificação de planeamento interna
`_tasks/superpowers/specs/2026-07-13-homolog-e2e-suite-design.md` (sem ligação — artefacto
interno de `_tasks/`, não faz parte da documentação controlada deste repositório). Resumo:

- **F2** — gravação completa do percurso → os Playwright Test Agents (`planner`/`generator`)
  transformam-na em especificações de fluxos (criar uma combinação, testar um fornecedor, editar definições, ferramentas MCP) +
  referência de regressão visual (Lost Pixel) com máscaras sobre dados dinâmicos (métricas,
  carimbos de data/hora, registos) + uma rotina de manutenção `healer` por versão.
- **F3** — cobertura de resiliência/contratos/interligações: toxiproxy + um fornecedor falso compatível com OpenAI
  na máquina de desenvolvimento, uma combinação `homolog-resilience` no VPS que aponta para esse fornecedor
  (tempo limite injetado → confirmar fallback + abertura/fecho do disjuntor através de
  `/api/monitoring/health`); testes de contrato Schemathesis condicionais com base em
  `docs/openapi.yaml` (`--max-examples` baixo, sementes fixas, apenas endpoints não LLM); e
  integração de `npm run homolog` + respetivo `summary.md` na fase STOP #2 de `/generate-release`.
