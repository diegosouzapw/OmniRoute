# Playground Studio (Português (Portugal))

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/PLAYGROUND_STUDIO.md) · 🇪🇹 [am](../../../am/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇦🇿 [az](../../../az/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇩🇰 [da](../../../da/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇩🇪 [de](../../../de/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇬🇷 [el](../../../el/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇪🇸 [es](../../../es/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇪🇪 [et](../../../et/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇱 [he](../../../he/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇩 [id](../../../id/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇹 [it](../../../it/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇰🇭 [km](../../../km/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇲🇲 [my](../../../my/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇳🇴 [no](../../../no/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇳 [or](../../../or/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇱🇰 [si](../../../si/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇳 [te](../../../te/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇹🇭 [th](../../../th/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/PLAYGROUND_STUDIO.md)

---

> **Funcionalidade:** Playground Studio — espaço de trabalho unificado para testes de IA em `/dashboard/playground`.
> **Planos:** `17-playground-studio-redesign.plan.md` + `_orchestration/master-plan-group-C.md`
> **Estado:** Lançado na v3.8.6

---

## Visão geral

O Playground Studio transforma `/dashboard/playground`, que deixa de ser um simples editor baseado no Monaco, num espaço de trabalho de testes completo. Substitui o `page.tsx` legado por uma estrutura `PlaygroundStudio` que apresenta quatro separadores e um painel de configuração partilhado.

```
┌ Playground ──────────────────────────────────────────────────────────┐
│ [💬 Chat] [⚖ Comparar] [{} API] [🔧 Criar]    142↑ 38↓ · $0.002 </>│
├──────────────────────────────────────────┬───────────────────────────┤
│  {conteúdo do separador ativo}           │ ─ Configuração            │
│                                          │ Endpoint  [chat ∨]        │
│                                          │ Modelo    [gpt-5.4 ∨]     │
│                                          │ Sistema   [área de texto] │
│                                          │ Temp.     ▕▕▔▔ 0.7        │
│                                          │ Predef. [▾ carregar][guardar]│
│                                          │ [✨ Melhorar prompt]       │
└──────────────────────────────────────────┴───────────────────────────┘
```

---

## Separadores

### Separador Chat

Transforma o `ChatPlayground.tsx` num espaço de trabalho de streaming com vários turnos:

- Renderização completa de Markdown através de `MarkdownMessage.tsx` (blocos de código, tabelas, listas e ligações).
- Prompt de sistema proveniente do painel de Configuração partilhado.
- Tokens/custo por mensagem (tokens de prompt + conclusão).
- Possibilidade de gerar novamente a última resposta.
- Envia pedidos para `POST /v1/chat/completions` com streaming SSE.

### Separador Comparar

O principal diferenciador para um proxy: executar 1 prompt em até **4 modelos em paralelo**.

- Até 4 colunas, cada uma com streaming independente a partir de `/v1/chat/completions`.
- Botão `+ Adicionar modelo` (atalho Cmd+K) para adicionar colunas.
- `Executar todos ▶` inicia todos os streams em simultâneo através de `Promise.all` + um `AbortController` por coluna.
- A opção global **Cancelar todos** interrompe todos os streams em curso.
- O `ProviderMetrics` de cada coluna apresenta TTFT, TPS, tokens e custo estimado em tempo real.
- Métricas identificadas como **"estimativa do lado do cliente"** (D12) — medidas a partir do primeiro fragmento SSE.

### Separador API

Preserva 100% do editor Monaco original para utilizadores avançados (D14):

- 10 endpoints: conclusões de chat, conclusões, embeddings, imagens, áudio, voz, transcrições, moderações, reordenação e pesquisa.
- Carregamento de ficheiros multimodais.
- Streaming SSE com saída em tempo real.
- Encapsulado como `ApiTab.tsx` (carregado de forma diferida, `ssr: false`).

### Separador Criar

IU para ferramentas/chamada de funções e saída estruturada:

- `ToolsBuilder.tsx` — adicionar/editar/remover `tools[]` com um editor de esquema JSON por ferramenta.
  Valida os parâmetros através de `ToolDefinitionSchema` (Zod).
- `StructuredOutputEditor.tsx` — ativar/desativar o modo JSON + editor de esquema JSON.
  Valida a resposta face ao esquema através de `StructuredOutputSchema` (Zod).
- Envia o pedido para `/v1/chat/completions` com `tools[]` e/ou `response_format`.

---

## Painel de Configuração (Partilhado)

`StudioConfigPane.tsx` — sempre visível, recolhível.

| Campo             | Componente            | Notas                                                                    |
| ----------------- | --------------------- | ------------------------------------------------------------------------ |
| Endpoint          | `<select>`            | 10 opções correspondentes a `PlaygroundEndpoint`                         |
| Modelo            | `<input>`             | texto livre, por exemplo, `openai/gpt-4o`                                |
| Prompt de sistema | `<textarea>`          | fornecido a todos os separadores                                         |
| Parâmetros        | `ParamSliders`        | temperature, max_tokens, top_p, presence/frequency penalty, seed, stop   |
| Predefinições     | `PresetPicker`        | carrega/guarda instantâneos de configuração com nome (persistidos na BD) |
| Melhorar prompt   | `ImprovePromptButton` | abre um modal de aviso de quota e chama `/api/playground/improve-prompt` |

O estado é elevado para `PlaygroundStudio.tsx` e transmitido a todos os separadores. Mudar de separador
preserva o estado da configuração.

---

## Barra Superior

`StudioTopBar.tsx`:

- Seletor de separadores (role="tablist").
- `TokenCostCounter` — apresentação em tempo real dos tokens (↑/↓) e do custo estimado.
- Botão para exportar código (`</>`) — abre `ExportCodeModal`.

---

## Modal de Exportação de Código

`ExportCodeModal.tsx` utiliza `codeExport.ts` para gerar excertos de curl / Python / TypeScript
a partir do `PlaygroundState` atual. O marcador de posição da chave da API é sempre `$OMNIROUTE_API_KEY` (D11).

---

## Melhorador de Prompts

`ImprovePromptButton.tsx` → `useImprovePrompt.ts` → `POST /api/playground/improve-prompt`:

1. O modal avisa que "irá consumir quota".
2. Após a confirmação, envia `{ system, prompt, model, tone }` para a rota.
3. A rota chama internamente `/v1/chat/completions` com `promptImprover.META_SYSTEM_PROMPT`.
4. Devolve `{ improvedSystem?, improvedPrompt?, tokensIn, tokensOut }`.
5. A IU atualiza o prompt de sistema do painel de Configuração e o prompt do utilizador no separador de Chat.

---

## Predefinições

`PresetPicker.tsx` → `usePresets.ts` → `/api/playground/presets/*`:

- Armazenadas na tabela SQLite `playground_presets` (migração `084_playground_presets.sql`).
- Cada predefinição armazena: `name`, `endpoint`, `model`, `system`, `params_json`, `created_at`.
- CRUD: `GET` para listar, `POST` para criar, `GET /:id`, `PUT /:id`, `DELETE /:id`.

---

## Métricas de Streaming

`useStreamMetrics.ts` + `streamMetrics.ts` (função pura):

- `start()` — regista a hora de início do pedido.
- `onFirstChunk()` — regista o TTFT.
- `onChunk(n)` — acumula a contagem de tokens de conclusão.
- `finish(usage?)` — calcula as métricas finais: `ttftMs`, `totalMs`, `tps`, `tokensIn`, `tokensOut`, `costUsd`.
- Preços obtidos da tabela estática em `src/lib/playground/types.ts` (identificados como "estimados" — D13).

---

## Rotas de Backend

| Método   | Caminho                          | Processador                                                                                 |
| -------- | -------------------------------- | ------------------------------------------------------------------------------------------- |
| `POST`   | `/api/playground/improve-prompt` | Valida `ImprovePromptRequestSchema` com Zod; chama `/v1/chat/completions` com um metaprompt |
| `GET`    | `/api/playground/presets`        | Devolve `{ presets: PlaygroundPresetListItem[] }`                                           |
| `POST`   | `/api/playground/presets`        | Cria uma predefinição; valida `PlaygroundPresetCreateSchema`                                |
| `GET`    | `/api/playground/presets/:id`    | Devolve uma predefinição ou 404                                                             |
| `PUT`    | `/api/playground/presets/:id`    | Atualização parcial                                                                         |
| `DELETE` | `/api/playground/presets/:id`    | 204                                                                                         |

Autenticação: opcional (`REQUIRE_API_KEY`). Erros através de `buildErrorBody()` (Regra Rígida #12).

---

## Ficheiros principais

| Caminho                                                                    | Finalidade                                                         |
| -------------------------------------------------------------------------- | ------------------------------------------------------------------ |
| `src/app/(dashboard)/dashboard/playground/PlaygroundStudio.tsx`            | Componente base, orquestrador de separadores                       |
| `src/app/(dashboard)/dashboard/playground/components/StudioTopBar.tsx`     | Separadores + contador + botão de exportação                       |
| `src/app/(dashboard)/dashboard/playground/components/StudioConfigPane.tsx` | Painel de configuração partilhado                                  |
| `src/app/(dashboard)/dashboard/playground/components/tabs/ChatTab.tsx`     | Área de trabalho de conversação                                    |
| `src/app/(dashboard)/dashboard/playground/components/tabs/CompareTab.tsx`  | Comparação de vários modelos                                       |
| `src/app/(dashboard)/dashboard/playground/components/tabs/ApiTab.tsx`      | Editor Monaco (preservado)                                         |
| `src/app/(dashboard)/dashboard/playground/components/tabs/BuildTab.tsx`    | Ferramentas + saída estruturada                                    |
| `src/app/(dashboard)/dashboard/playground/components/ExportCodeModal.tsx`  | Janela modal de exportação de código                               |
| `src/app/(dashboard)/dashboard/playground/components/CompareColumn.tsx`    | Coluna de comparação individual                                    |
| `src/app/(dashboard)/dashboard/playground/components/ProviderMetrics.tsx`  | Apresentação de TTFT/TPS                                           |
| `src/app/(dashboard)/dashboard/playground/hooks/useStreamMetrics.ts`       | Hook de métricas do lado do cliente                                |
| `src/app/(dashboard)/dashboard/playground/hooks/usePresets.ts`             | Hook CRUD de predefinições                                         |
| `src/app/(dashboard)/dashboard/playground/hooks/useImprovePrompt.ts`       | Hook de melhoria de prompts                                        |
| `src/lib/playground/codeExport.ts`                                         | Gerador de curl/Python/TS (partilhado com Ferramentas de Pesquisa) |
| `src/lib/playground/promptImprover.ts`                                     | Construtor de metaprompts                                          |
| `src/lib/playground/streamMetrics.ts`                                      | Cálculo puro de métricas                                           |
| `src/lib/db/playgroundPresets.ts`                                          | Módulo de BD (CRUD)                                                |
| `src/app/api/playground/improve-prompt/route.ts`                           | Rota REST de melhoria de prompts                                   |
| `src/app/api/playground/presets/route.ts`                                  | Listagem + criação de predefinições                                |
| `src/app/api/playground/presets/[id]/route.ts`                             | Obtenção/atualização/eliminação de predefinições                   |
| `src/lib/db/migrations/084_playground_presets.sql`                         | Migração da BD                                                     |

---

## Resolução de problemas

| Sintoma                                               | Causa                                                  | Correção                                                                                                 |
| ----------------------------------------------------- | ------------------------------------------------------ | -------------------------------------------------------------------------------------------------------- |
| O editor Monaco não é apresentado no separador API    | O SSR carregou o Monaco                                | Verifique se `ApiTab` utiliza `dynamic(..., { ssr: false })`                                             |
| Os fluxos de comparação são iniciados sequencialmente | Utilização incorreta de `Promise.all`                  | Todos os fluxos devem ser iniciados numa única chamada a `Promise.all`                                   |
| As métricas apresentam TTFT como `null`               | O processador do primeiro fragmento não está associado | Verifique se `useStreamMetrics.onFirstChunk()` é chamado no ciclo de leitura de SSE                      |
| A predefinição não é mantida                          | A migração da BD não foi executada                     | Execute `npm run db:migrate` ou reinicie o servidor (a migração é executada automaticamente no arranque) |
| A melhoria do prompt devolve 502                      | O modelo não está definido em Config                   | O utilizador deve introduzir o nome de um modelo no painel Config antes de efetuar a melhoria            |
| O código exportado apresenta `MISSING_API_KEY`        | O marcador de posição não foi inserido                 | `codeExport.ts` utiliza sempre `API_KEY_PLACEHOLDER = "$OMNIROUTE_API_KEY"`                              |

---

## Referências

- Plano principal: `_tasks/features-v3.8.6/refactorpages/_orchestration/master-plan-group-C.md`
- Plano da funcionalidade: `_tasks/features-v3.8.6/refactorpages/17-playground-studio-redesign.plan.md`
- Exportação de código: `src/lib/playground/codeExport.ts`
- Melhorador de prompts: `src/lib/playground/promptImprover.ts`
- Search Tools Studio: `docs/frameworks/SEARCH_TOOLS_STUDIO.md`
