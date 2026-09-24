# Playground Studio (Português (Brasil))

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/PLAYGROUND_STUDIO.md) · 🇪🇹 [am](../../../am/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇦🇿 [az](../../../az/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇩🇰 [da](../../../da/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇩🇪 [de](../../../de/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇬🇷 [el](../../../el/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇪🇸 [es](../../../es/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇪🇪 [et](../../../et/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇱 [he](../../../he/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇩 [id](../../../id/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇹 [it](../../../it/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇰🇭 [km](../../../km/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇲🇲 [my](../../../my/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇳🇴 [no](../../../no/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇳 [or](../../../or/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇱🇰 [si](../../../si/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇳 [te](../../../te/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇹🇭 [th](../../../th/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/PLAYGROUND_STUDIO.md)

---

> **Recurso:** Playground Studio — espaço de trabalho unificado para testes de IA em `/dashboard/playground`.
> **Planos:** `17-playground-studio-redesign.plan.md` + `_orchestration/master-plan-group-C.md`
> **Status:** Lançado na v3.8.6

---

## Visão geral

O Playground Studio transforma `/dashboard/playground`, antes um simples editor baseado no Monaco, em
um espaço de trabalho completo para testes. Ele substitui o `page.tsx` legado por um shell `PlaygroundStudio`
que renderiza quatro abas e um painel de configuração compartilhado.

```
┌ Playground ──────────────────────────────────────────────────────────┐
│ [💬 Chat] [⚖ Comparar] [{} API] [🔧 Criar]    142↑ 38↓ · $0.002 </>│
├──────────────────────────────────────────┬───────────────────────────┤
│  {conteúdo da aba ativa}                 │ ─ Configuração            │
│                                          │ Endpoint  [chat ∨]        │
│                                          │ Modelo    [gpt-5.4 ∨]     │
│                                          │ Sistema   [área de texto] │
│                                          │ Temp.     ▕▕▔▔ 0.7        │
│                                          │ Predef. [▾ carregar][salvar]│
│                                          │ [✨ Melhorar prompt]       │
└──────────────────────────────────────────┴───────────────────────────┘
```

---

## Abas

### Aba Chat

Transforma `ChatPlayground.tsx` em uma bancada de trabalho com streaming e múltiplos turnos:

- Renderização completa de markdown por meio de `MarkdownMessage.tsx` (blocos de código, tabelas, listas e links).
- Prompt de sistema obtido do painel compartilhado de Configuração.
- Tokens/custo por mensagem (tokens de prompt + conclusão).
- Possibilidade de gerar novamente a última resposta.
- Envia para `POST /v1/chat/completions` com streaming via SSE.

### Aba Comparar

O principal diferencial de um proxy: executar 1 prompt em até **4 modelos em paralelo**.

- Até 4 colunas, cada uma transmitindo de forma independente a partir de `/v1/chat/completions`.
- Botão `+ Adicionar modelo` (atalho Cmd+K) para adicionar colunas.
- `Executar todos ▶` inicia todos os streams simultaneamente por meio de `Promise.all` + um `AbortController` por coluna.
- A opção global **Cancelar todos** interrompe todos os streams em andamento.
- O `ProviderMetrics` de cada coluna exibe TTFT, TPS, tokens e custo estimado em tempo real.
- Métricas identificadas como **"estimativa no lado do cliente"** (D12) — medidas a partir do primeiro trecho SSE.

### Aba API

Preserva 100% do editor Monaco original para usuários avançados (D14):

- 10 endpoints: conclusões de chat, conclusões, embeddings, imagens, áudio, fala, transcrições, moderações, reclassificação e pesquisa.
- Upload de arquivos multimodais.
- Streaming via SSE com saída em tempo real.
- Encapsulado como `ApiTab.tsx` (carregamento sob demanda, `ssr: false`).

### Aba Criar

Interface para ferramentas/chamada de funções e saída estruturada:

- `ToolsBuilder.tsx` — adiciona/edita/remove `tools[]` com um editor de esquema JSON para cada ferramenta.
  Valida os parâmetros por meio de `ToolDefinitionSchema` (Zod).
- `StructuredOutputEditor.tsx` — alterna o modo JSON + editor de esquema JSON.
  Valida a resposta em relação ao esquema por meio de `StructuredOutputSchema` (Zod).
- Envia a solicitação para `/v1/chat/completions` com `tools[]` e/ou `response_format`.

## Painel de Configuração (Compartilhado)

`StudioConfigPane.tsx` — sempre visível, recolhível.

| Campo             | Componente            | Observações                                                                   |
| ----------------- | --------------------- | ----------------------------------------------------------------------------- |
| Endpoint          | `<select>`            | 10 opções correspondentes a `PlaygroundEndpoint`                              |
| Modelo            | `<input>`             | texto livre, por exemplo, `openai/gpt-4o`                                     |
| Prompt do sistema | `<textarea>`          | fornecido a todas as abas                                                     |
| Parâmetros        | `ParamSliders`        | temperature, max_tokens, top_p, penalidade de presença/frequência, seed, stop |
| Predefinições     | `PresetPicker`        | carrega/salva snapshots nomeados da configuração (persistidos no BD)          |
| Melhorar prompt   | `ImprovePromptButton` | abre o modal de aviso de cota, chama `/api/playground/improve-prompt`         |

O estado é elevado para `PlaygroundStudio.tsx` e repassado a todas as abas. Alternar entre abas
preserva o estado da configuração.

---

## Barra Superior

`StudioTopBar.tsx`:

- Seletor de abas (role="tablist").
- `TokenCostCounter` — exibição em tempo real dos tokens (↑/↓) e do custo estimado.
- Botão de exportação de código (`</>`) — abre `ExportCodeModal`.

---

## Modal de Exportação de Código

`ExportCodeModal.tsx` usa `codeExport.ts` para gerar snippets de curl / Python / TypeScript
a partir do `PlaygroundState` atual. O placeholder da chave de API é sempre `$OMNIROUTE_API_KEY` (D11).

---

## Melhorador de Prompt

`ImprovePromptButton.tsx` → `useImprovePrompt.ts` → `POST /api/playground/improve-prompt`:

1. O modal avisa que "consumirá cota".
2. Após a confirmação, envia `{ system, prompt, model, tone }` para a rota.
3. A rota chama `/v1/chat/completions` internamente com `promptImprover.META_SYSTEM_PROMPT`.
4. Retorna `{ improvedSystem?, improvedPrompt?, tokensIn, tokensOut }`.
5. A interface atualiza o prompt do sistema no painel de Configuração e o prompt do usuário na aba de Chat.

---

## Predefinições

`PresetPicker.tsx` → `usePresets.ts` → `/api/playground/presets/*`:

- Armazenadas na tabela SQLite `playground_presets` (migração `084_playground_presets.sql`).
- Cada predefinição armazena: `name`, `endpoint`, `model`, `system`, `params_json`, `created_at`.
- CRUD: lista via `GET`, cria via `POST`, consulta via `GET /:id`, atualiza via `PUT /:id`, exclui via `DELETE /:id`.

---

## Métricas de Streaming

`useStreamMetrics.ts` + `streamMetrics.ts` (função pura):

- `start()` — registra o horário de início da solicitação.
- `onFirstChunk()` — registra o TTFT.
- `onChunk(n)` — acumula a contagem de tokens da conclusão.
- `finish(usage?)` — calcula as métricas finais: `ttftMs`, `totalMs`, `tps`, `tokensIn`, `tokensOut`, `costUsd`.
- Preços provenientes da tabela estática em `src/lib/playground/types.ts` (rotulados como "estimados" — D13).

---

## Rotas do Backend

| Método   | Caminho                          | Manipulador                                                                              |
| -------- | -------------------------------- | ---------------------------------------------------------------------------------------- |
| `POST`   | `/api/playground/improve-prompt` | Valida `ImprovePromptRequestSchema` com Zod; chama `/v1/chat/completions` com metaprompt |
| `GET`    | `/api/playground/presets`        | Retorna `{ presets: PlaygroundPresetListItem[] }`                                        |
| `POST`   | `/api/playground/presets`        | Cria uma predefinição; valida `PlaygroundPresetCreateSchema`                             |
| `GET`    | `/api/playground/presets/:id`    | Retorna uma predefinição ou 404                                                          |
| `PUT`    | `/api/playground/presets/:id`    | Atualização parcial                                                                      |
| `DELETE` | `/api/playground/presets/:id`    | 204                                                                                      |

Autenticação: opcional (`REQUIRE_API_KEY`). Erros via `buildErrorBody()` (Regra Rígida nº 12).

---

## Arquivos principais

| Caminho                                                                    | Finalidade                                                 |
| -------------------------------------------------------------------------- | ---------------------------------------------------------- |
| `src/app/(dashboard)/dashboard/playground/PlaygroundStudio.tsx`            | Componente de estrutura, orquestrador de abas              |
| `src/app/(dashboard)/dashboard/playground/components/StudioTopBar.tsx`     | Abas + contador + botão de exportação                      |
| `src/app/(dashboard)/dashboard/playground/components/StudioConfigPane.tsx` | Painel de configuração compartilhado                       |
| `src/app/(dashboard)/dashboard/playground/components/tabs/ChatTab.tsx`     | Área de trabalho de chat                                   |
| `src/app/(dashboard)/dashboard/playground/components/tabs/CompareTab.tsx`  | Comparação entre vários modelos                            |
| `src/app/(dashboard)/dashboard/playground/components/tabs/ApiTab.tsx`      | Editor Monaco (preservado)                                 |
| `src/app/(dashboard)/dashboard/playground/components/tabs/BuildTab.tsx`    | Ferramentas + saída estruturada                            |
| `src/app/(dashboard)/dashboard/playground/components/ExportCodeModal.tsx`  | Modal de exportação de código                              |
| `src/app/(dashboard)/dashboard/playground/components/CompareColumn.tsx`    | Coluna individual de comparação                            |
| `src/app/(dashboard)/dashboard/playground/components/ProviderMetrics.tsx`  | Exibição de TTFT/TPS                                       |
| `src/app/(dashboard)/dashboard/playground/hooks/useStreamMetrics.ts`       | Hook de métricas no lado do cliente                        |
| `src/app/(dashboard)/dashboard/playground/hooks/usePresets.ts`             | Hook de CRUD de predefinições                              |
| `src/app/(dashboard)/dashboard/playground/hooks/useImprovePrompt.ts`       | Hook de aprimoramento de prompt                            |
| `src/lib/playground/codeExport.ts`                                         | Gerador de curl/Python/TS (compartilhado com Search Tools) |
| `src/lib/playground/promptImprover.ts`                                     | Construtor de metaprompt                                   |
| `src/lib/playground/streamMetrics.ts`                                      | Cálculo puro de métricas                                   |
| `src/lib/db/playgroundPresets.ts`                                          | Módulo de banco de dados (CRUD)                            |
| `src/app/api/playground/improve-prompt/route.ts`                           | Rota REST de aprimoramento de prompt                       |
| `src/app/api/playground/presets/route.ts`                                  | Listagem + criação de predefinições                        |
| `src/app/api/playground/presets/[id]/route.ts`                             | Obtenção/atualização/exclusão de predefinições             |
| `src/lib/db/migrations/084_playground_presets.sql`                         | Migração do banco de dados                                 |

---

## Solução de problemas

| Sintoma                                               | Causa                                              | Correção                                                                                                      |
| ----------------------------------------------------- | -------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| O editor Monaco não é renderizado na aba API          | O SSR carregou o Monaco                            | Verifique se `ApiTab` usa `dynamic(..., { ssr: false })`                                                      |
| Os fluxos de comparação são iniciados sequencialmente | Uso incorreto de `Promise.all`                     | Todos os fluxos devem ser iniciados em uma única chamada a `Promise.all`                                      |
| As métricas mostram TTFT como `null`                  | O manipulador do primeiro bloco não está conectado | Verifique se `useStreamMetrics.onFirstChunk()` é chamado no loop do leitor de SSE                             |
| A predefinição não é persistida                       | A migração do banco de dados não foi executada     | Execute `npm run db:migrate` ou reinicie o servidor (a migração é executada automaticamente na inicialização) |
| O aprimoramento do prompt retorna 502                 | O modelo não foi definido em Config                | O usuário deve inserir o nome de um modelo no painel Config antes de aprimorar                                |
| O código exportado mostra `MISSING_API_KEY`           | O espaço reservado não foi inserido                | `codeExport.ts` sempre usa `API_KEY_PLACEHOLDER = "$OMNIROUTE_API_KEY"`                                       |

---

## Referências

- Plano mestre: `_tasks/features-v3.8.6/refactorpages/_orchestration/master-plan-group-C.md`
- Plano do recurso: `_tasks/features-v3.8.6/refactorpages/17-playground-studio-redesign.plan.md`
- Exportação de código: `src/lib/playground/codeExport.ts`
- Aprimorador de prompts: `src/lib/playground/promptImprover.ts`
- Search Tools Studio: `docs/frameworks/SEARCH_TOOLS_STUDIO.md`
