# Guardrails (Português (Portugal))

🌐 **Languages:** 🇺🇸 [English](../../../../security/GUARDRAILS.md) · 🇪🇹 [am](../../../am/docs/security/GUARDRAILS.md) · 🇸🇦 [ar](../../../ar/docs/security/GUARDRAILS.md) · 🇦🇿 [az](../../../az/docs/security/GUARDRAILS.md) · 🇧🇬 [bg](../../../bg/docs/security/GUARDRAILS.md) · 🇧🇩 [bn](../../../bn/docs/security/GUARDRAILS.md) · 🇧🇦 [bs](../../../bs/docs/security/GUARDRAILS.md) · 🇨🇿 [cs](../../../cs/docs/security/GUARDRAILS.md) · 🇩🇰 [da](../../../da/docs/security/GUARDRAILS.md) · 🇩🇪 [de](../../../de/docs/security/GUARDRAILS.md) · 🇬🇷 [el](../../../el/docs/security/GUARDRAILS.md) · 🇪🇸 [es](../../../es/docs/security/GUARDRAILS.md) · 🇪🇪 [et](../../../et/docs/security/GUARDRAILS.md) · 🇮🇷 [fa](../../../fa/docs/security/GUARDRAILS.md) · 🇫🇮 [fi](../../../fi/docs/security/GUARDRAILS.md) · 🇫🇷 [fr](../../../fr/docs/security/GUARDRAILS.md) · 🇮🇪 [ga](../../../ga/docs/security/GUARDRAILS.md) · 🇮🇳 [gu](../../../gu/docs/security/GUARDRAILS.md) · 🇳🇬 [ha](../../../ha/docs/security/GUARDRAILS.md) · 🇮🇱 [he](../../../he/docs/security/GUARDRAILS.md) · 🇮🇳 [hi](../../../hi/docs/security/GUARDRAILS.md) · 🇭🇷 [hr](../../../hr/docs/security/GUARDRAILS.md) · 🇭🇺 [hu](../../../hu/docs/security/GUARDRAILS.md) · 🇦🇲 [hy](../../../hy/docs/security/GUARDRAILS.md) · 🇮🇩 [id](../../../id/docs/security/GUARDRAILS.md) · 🇳🇬 [ig](../../../ig/docs/security/GUARDRAILS.md) · 🇮🇹 [it](../../../it/docs/security/GUARDRAILS.md) · 🇯🇵 [ja](../../../ja/docs/security/GUARDRAILS.md) · 🇬🇪 [ka](../../../ka/docs/security/GUARDRAILS.md) · 🇰🇭 [km](../../../km/docs/security/GUARDRAILS.md) · 🇮🇳 [kn](../../../kn/docs/security/GUARDRAILS.md) · 🇰🇷 [ko](../../../ko/docs/security/GUARDRAILS.md) · 🇱🇹 [lt](../../../lt/docs/security/GUARDRAILS.md) · 🇱🇻 [lv](../../../lv/docs/security/GUARDRAILS.md) · 🇮🇳 [ml](../../../ml/docs/security/GUARDRAILS.md) · 🇮🇳 [mr](../../../mr/docs/security/GUARDRAILS.md) · 🇲🇾 [ms](../../../ms/docs/security/GUARDRAILS.md) · 🇲🇹 [mt](../../../mt/docs/security/GUARDRAILS.md) · 🇲🇲 [my](../../../my/docs/security/GUARDRAILS.md) · 🇳🇵 [ne](../../../ne/docs/security/GUARDRAILS.md) · 🇳🇱 [nl](../../../nl/docs/security/GUARDRAILS.md) · 🇳🇴 [no](../../../no/docs/security/GUARDRAILS.md) · 🇮🇳 [or](../../../or/docs/security/GUARDRAILS.md) · 🇮🇳 [pa](../../../pa/docs/security/GUARDRAILS.md) · 🇵🇭 [phi](../../../phi/docs/security/GUARDRAILS.md) · 🇵🇱 [pl](../../../pl/docs/security/GUARDRAILS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/GUARDRAILS.md) · 🇷🇴 [ro](../../../ro/docs/security/GUARDRAILS.md) · 🇷🇺 [ru](../../../ru/docs/security/GUARDRAILS.md) · 🇱🇰 [si](../../../si/docs/security/GUARDRAILS.md) · 🇸🇰 [sk](../../../sk/docs/security/GUARDRAILS.md) · 🇸🇮 [sl](../../../sl/docs/security/GUARDRAILS.md) · 🇷🇸 [sr](../../../sr/docs/security/GUARDRAILS.md) · 🇸🇪 [sv](../../../sv/docs/security/GUARDRAILS.md) · 🇰🇪 [sw](../../../sw/docs/security/GUARDRAILS.md) · 🇮🇳 [ta](../../../ta/docs/security/GUARDRAILS.md) · 🇮🇳 [te](../../../te/docs/security/GUARDRAILS.md) · 🇹🇭 [th](../../../th/docs/security/GUARDRAILS.md) · 🇹🇷 [tr](../../../tr/docs/security/GUARDRAILS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/GUARDRAILS.md) · 🇵🇰 [ur](../../../ur/docs/security/GUARDRAILS.md) · 🇺🇿 [uz](../../../uz/docs/security/GUARDRAILS.md) · 🇻🇳 [vi](../../../vi/docs/security/GUARDRAILS.md) · 🇳🇬 [yo](../../../yo/docs/security/GUARDRAILS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/GUARDRAILS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/GUARDRAILS.md)

---

> **Fonte fidedigna:** `src/lib/guardrails/`
> **Última atualização:** 2026-08-29 — v3.8.51 (a proveniência da transcrição do Video Bridge é declarada pelo chamador,
> ainda não é verificada pelo servidor — clarificado de acordo com #11661)

As guardrails aplicam transformações de segurança, políticas e conteúdo na fronteira
entre o OmniRoute e os fornecedores a montante. Cada guardrail pode inspecionar (e
opcionalmente rejeitar, transformar ou anotar) os payloads dos pedidos (`preCall`) e
as respostas a montante (`postCall`).

O sistema é **fail-open**: se uma guardrail lançar uma exceção durante a execução, o registo
regista o erro e prossegue para a guardrail seguinte, em vez de fazer o pedido
falhar. O bloqueio é uma decisão explícita (`block: true`), nunca um acidente.

## Guardrails Integrados

O registo carrega automaticamente seis guardrails por ordem de prioridade na importação (ver `registry.ts` → `registerDefaultGuardrails()`):

| Prioridade | Nome                | Fase(s)        | Ficheiro              |
| ---------- | ------------------- | -------------- | --------------------- |
| `5`        | `vision-bridge`     | `preCall`      | `visionBridge.ts`     |
| `6`        | `audio-bridge`      | `preCall`      | `audioBridge.ts`      |
| `7`        | `video-bridge`      | `preCall`      | `videoBridge.ts`      |
| `10`       | `pii-masker`        | `pre` + `post` | `piiMasker.ts`        |
| `20`       | `prompt-injection`  | `preCall`      | `promptInjection.ts`  |
| `95`       | `credential-masker` | `pre` + `post` | `credentialMasker.ts` |

Números de prioridade mais baixos são executados **primeiro**.

### Vision Bridge (`visionBridge.ts`) — Ponte de Modalidade PR-1

Interceta pedidos com imagens destinados a **modelos sem capacidade de visão** e redireciona todo o pedido para um modelo com capacidade de visão ou substitui as partes da imagem por descrições de texto produzidas por um modelo de visão configurável antes da chamada a montante. Isto permite que os fornecedores apenas de texto lidem transparentemente com cargas multimodais.

Fluxo:

1.  Ignorar se o modelo de destino já suporta visão (a menos que apareça na lista de ponte forçada `isVisionBridgeForcedModel`).
2.  Extrair partes da imagem via `extractImageParts(messages)` (`visionBridgeHelpers.ts`), que delega ao **detetor de multimédia unificado** `detectMediaParts()` em `open-sse/utils/mediaParts.ts` — a única fonte de verdade partilhada com o filtro de compatibilidade combinado. A extração é permitida para partes de nível superior das formas que `replaceImageParts` pode reinserir (o contrato extrair↔substituir): OpenAI `image_url`, Anthropic base64 `source.type:"base64"`, Anthropic URL `source.type:"url"`, e Responses API `input_image`. Acertos aninhados e formas apenas indicadoras são material de filtro combinado e nunca são extraídos. Ignorar se nenhum for encontrado.
3.  Resolver a configuração de tempo de execução via `resolveVisionBridgeRuntimeSettings()` (`src/shared/constants/modalityBridgeDefaults.ts`): as novas chaves de configuração `modalityBridge*` prevalecem; as chaves `visionBridge*` legadas permanecem como um **fallback de um ciclo** (janela de reversão). Ignorar antes de qualquer travessia de multimédia quando a ponte está desativada.
4.  O seletor de modo (`modalityBridgeVisionMode`, ver tabela abaixo) decide entre redirecionar ou descrever. O redirecionamento retorna `modifiedPayload` com apenas o `model` trocado, mais meta `{ rerouted, fromModel, toModel, imagesKept }`.
5.  Caminho de descrição: limitar imagens a `maxImages`, compor o prompt sensível à tarefa, consultar a cache de descrição, chamar o modelo de visão **em paralelo** (`Promise.allSettled`), e injetar partes de texto `[Imagem N]: <descrição>` no seu lugar. Uma descrição falhada resulta em `null` e a parte original da imagem é **preservada** (#4012) — exceto no caminho de descrição combinado, quando todas as descrições falharam, onde um upstream não-visão confirmado recebe um stub `(indisponível — nenhum fornecedor com capacidade de visão conectado)` em vez disso (#8430).
6.  Retornar `modifiedPayload` + meta (`imagesProcessed`, `descriptions`, `processingTimeMs`, `visionModel`).

#### Seletor de modo (`modalityBridgeVisionMode`)

| Modo       | Predefinição | Comportamento                                                                                                                                                                                                                                                                                                   |
| ---------- | ------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `auto`     | ✔            | Heurística legada, intocada (#6640/#7204): modelos não-combinados/`auto/` redirecionam para o melhor modelo de visão, a menos que o modelo original já tenha credenciais utilizáveis (então descrevem); alvos combinados sempre descrevem.                                                                      |
| `describe` |              | Sempre descrever — o bloco de redirecionamento é totalmente ignorado; o modelo escolhido pelo utilizador sempre responde.                                                                                                                                                                                       |
| `reroute`  |              | Forçar redirecionamento: a guarda de modelo com credenciais é ignorada. A guarda de credenciais do **alvo** de redirecionamento ainda se aplica — quando não existe um alvo de visão utilizável, o pedido passa para a descrição para que as imagens brutas nunca cheguem a um backend apenas de texto (#8430). |

Os modos forçados fazem um curto-circuito **antes** da heurística automática ser executada; o comportamento `auto` é byte-idêntico ao guardrail pré-PR-1.

#### Prompt de descrição sensível à tarefa (`modalityBridgeVisionTaskAware`)

Predefinição **verdadeiro**. `composeVisionPrompt()` (`visionBridgeHelpers.ts`) anexa o texto da **última mensagem do utilizador** (truncado a 500 caracteres) ao prompt de descrição base, direcionando a descrição para o que o utilizador realmente perguntou (padrão codex-vision-proxy) e pedindo ao modelo de visão para transcrever texto visível. Com a flag desativada — ou sem texto do utilizador — o prompt base é usado inalterado.

O pedido compatível com OpenAI do próprio self-loop de descrição (`callVisionModelSingle()` em `visionBridgeHelpers.ts`) solicita sempre `image_url.detail: "high"` — incondicionalmente, para cada chamador/fornecedor, não condicionado por qualquer sinal do cliente. A amostragem de baixo detalhe degrada a precisão do OCR exatamente para a tarefa de transcrição de texto que este prompt solicita, pelo que a própria chamada de descrição pede sempre alto detalhe, independentemente do nível de detalhe que o pedido de entrada original utilizou. Isto afeta apenas o corpo do pedido de descrição interno; não altera a forma como o OmniRoute reencaminha o `image_url.detail` do próprio chamador no pedido principal — esse padrão é aplicado separadamente, e apenas para clientes OpenCode detetados, em `defaultImageDetail()` (`open-sse/handlers/chatCore/upstreamBody.ts`). O ramo de formato de fio Anthropic do self-loop de descrição não tem campo `detail` e não é afetado por nenhum dos padrões.

#### Limite de saída da descrição (`modalityBridgeVisionMaxChars`)

| Chave                          | Padrão | Intervalo        |
| :----------------------------- | :----- | :--------------- |
| `modalityBridgeVisionMaxChars` | `0`    | `0` ou 100–50000 |

`0` (padrão) significa **sem limite** — a descrição devolvida por `callVisionModel()` é passada sem modificações, preservando o comportamento existente. Qualquer valor no intervalo de 100–50000 trunca a descrição com um sufixo `…` antes de ser reintroduzida como `[Image N]: <descrição>` (`VisionBridgeGuardrail.preCall()` em `src/lib/guardrails/visionBridge.ts`). Aumente este valor para tarefas de OCR com muitos detalhes, onde o modelo a jusante necessita da transcrição completa; diminua-o para limitar o uso de tokens em modelos de visão "tagarelas". O campo do painel de controlo encontra-se no painel Avançado do separador Visão (`modality-bridge-max-chars` em `ModalityBridgeVisionTab.tsx`) e ajusta qualquer valor entre 1 e 99 para o limite inferior de 100, deixando um `0` explícito intocado — `0` é um valor Zod válido por si só (`z.union([z.literal(0), z.number().int().min(100).max(50000)])`), não apenas o padrão "não definido".

#### Cache de descrição (`modalityBridge/bridgeCache.ts`)

Cache LRU + TTL em memória para saídas de descrição, partilhada por todo o processo. A chave = `sha256(imageRef + composedPrompt + configuredBridgeModel)` com enquadramento de prefixo de comprimento (sem colisões de limites de campo). O componente do modelo é o modelo de ponte **configurado**, não o modelo que realmente respondeu — `callVisionModel` pode recorrer internamente, e a indexação por tentativa fragmentaria a cache. Descrições falhadas nunca são armazenadas em cache. Definições:

| Chave                           | Padrão | Intervalo |
| :------------------------------ | :----- | :-------- |
| `modalityBridgeCacheEnabled`    | `true` | —         |
| `modalityBridgeCacheTtlMinutes` | `60`   | 1–1440    |
| `modalityBridgeCacheMaxEntries` | `200`  | 10–5000   |

#### Normalização de imagem remota (descrição self-loop/busca base64)

Quando a ponte busca uma imagem **remota** — a auto-chamada de descrição Anthropic e a conversão base64 no formato claude-wire (`ensureBase64ImagesForClaudeWire`), ambas via `fetchRemoteImageAsDataUri()` em `visionBridgeHelpers.ts` — o URI de dados resultante é passado por `normalizeDataUri()` (`open-sse/utils/imageNormalize.ts`) antes de ser incorporado no pedido do modelo de visão. Imagens de tamanho excessivo são reduzidas para uma **borda longa de 2048px** (correspondendo ao limite de redimensionamento que OpenAI/Anthropic já aplicam no lado do servidor), o que reduz os bytes/latência de upload sem alterar o que o modelo de visão vê. O redimensionamento usa `sharp`, carregado via importação dinâmica: numa plataforma onde o seu binário nativo falha ao carregar, `normalizeDataUri()` **nunca lança um erro** — ele recorre a uma passagem dos bytes originais, de modo que o caminho de descrição/conversão base64 continua sempre a funcionar. Bytes não-imagem (uma busca que não retornou uma imagem decodificável) também são passados intocados. Esta normalização é limitada às imagens que a ponte busca para a sua própria auto-chamada — nunca é aplicada ao payload de passagem bruto do chamador, consistente com o princípio de mutação apenas por opção (Regra Rígida #20).

#### Esquema de configurações + migração

As novas chaves `modalityBridge*` são validadas por Zod em `updateSettingsSchema` (`src/shared/validation/settingsSchemas.ts`): `modalityBridgeVisionEnabled`, `modalityBridgeVisionMode`, `modalityBridgeVisionModel`, `modalityBridgeVisionTaskAware`, `modalityBridgeVisionPrompt`, `modalityBridgeVisionTimeout`, `modalityBridgeVisionMaxImages`, `modalityBridgeVisionMaxChars`, o trio `modalityBridgeCache*` e o grupo `modalityBridgeAudio*` usado pela Ponte de Áudio. A migração `141_modality_bridge_settings.sql` copia os valores `visionBridge*` legados existentes para as novas chaves correspondentes (idempotente, nunca sobrescreve um valor `modalityBridge*` definido pelo operador); as chaves legadas permanecem aceites como um fallback de leitura por um ciclo de lançamento.

#### Cabeçalho de transparência + estatísticas

As respostas transformadas pela descrição contêm `x-omniroute-modality-bridge: image->text;model=<visionModel>;parts=<n>` (construído por `buildModalityBridgeHeader()` em `modalityBridge/bridgeStats.ts`, carimbado por `withModalityBridgeHeader()` em `src/sse/handlers/chatHelpers.ts`). Os pedidos redirecionados **não** recebem cabeçalho — o payload não foi alterado e a troca de modelo já é visível no campo `model` do corpo da resposta.

`GET /api/modality-bridge/stats` (autenticação de gestão, mesmo nível que `GET /api/settings`) devolve os contadores em memória por modalidade `{ attempts, successes, bridged, cacheHits, failures, totalLatencyMs, latencySamples, averageLatencyMs, lastUsedAt }` para `vision`, `audio` e `video`. `averageLatencyMs` usa `latencySamples`, não todas as tentativas, como seu denominador; uma operação sem temporização não fabrica uma amostra de zero milissegundos. `bridged` permanece o alias retrocompatível para conversões bem-sucedidas; tentativas falhadas não o incrementam. Os contadores são reiniciados na reinicialização do processo por design (telemetria, não contabilidade).

#### Configuração do painel de controlo

A página dedicada do painel de controlo é
`/dashboard/settings/modality-bridge`. Os seus separadores `Vision`, `Audio` e
`Video`, endereçáveis por URL, preservam os parâmetros de consulta ao mudar o valor de `tab`.
O separador Vision expõe a ativação, modo, seleção de modelo (incluindo o padrão
automático), prompting sensível à tarefa, limites avançados de tempo limite/imagem/comprimento de descrição/cache,
contadores de tempo de execução e um pedido de amostra protegido. O separador Audio também está ativo: expõe
a ativação, um seletor de modelo apenas STT com Auto, limites de tempo limite/clip máximo, contadores de áudio
e um teste de amostra `input_audio`. O separador Video é funcional: reporta
o estado de tempo de execução do FFmpeg/ffprobe — um de quatro estados explícitos da UI (`unknown` enquanto
a sonda está em curso ou não pôde ser concluída, `restricted` num anfitrião de painel de controlo não-loopback
onde a sonda é ignorada do lado do cliente, `unavailable` uma vez sondada
e confirmada como ausente, ou `available` com as versões FFmpeg/ffprobe) — persiste
os limites de ativação/modelo/frame/vídeo/tempo limite, filtra o seletor de modelo para modelos com capacidade de visão
e expõe contadores de vídeo.

O antigo cartão Vision Bridge nas definições de IA é um link de compatibilidade para a
nova página; já não possui uma segunda cópia do formulário. Os Media Providers também
ligam os fluxos de trabalho de Imagem para Texto e Fala para Texto aos separadores correspondentes do Modality
Bridge sem remover o playground de Fala para Texto existente.

**Ignorar admissão de self-loop:** quando a chamada de descrição é encaminhada através do self-loop `/v1` do
próprio OmniRoute (modelo de fornecedor não padrão), o sub-pedido envia
`x-omniroute-admission-bypass: internal` e é autenticado com a credencial de self-loop resolvida —
o sentinela local `sk_omniroute` no modo local, ou a chave de ambiente `OMNIROUTE_API_KEY` / `ROUTER_API_KEY`
configurada pelo operador (#1350) para que as implementações `REQUIRE_API_KEY=true` ainda possam executar a chamada de descrição.
O bypass só é respeitado para essas credenciais exatas, portanto, clientes externos não podem usar o cabeçalho para ignorar a admissão.

Os padrões legados residem em `src/shared/constants/visionBridgeDefaults.ts`; os
novos padrões de modo/sensíveis à tarefa/cache e o resolvedor de configurações residem em
`src/shared/constants/modalityBridgeDefaults.ts`. O guardrail expõe uma
opção de construtor `deps` para que os testes possam injetar implementações falsas de `getSettings` e
`callVisionModel`.

### Audio Bridge (`audioBridge.ts`) — Modality Bridge PR-3

Interceta pedidos de chat com áudio antes que cheguem a um destino que não é
conhecido por aceitar entrada de áudio. Nunca redireciona o pedido de chat: as partes de áudio são
transcritas através do endpoint multipart existente compatível com OpenAI e o
modelo de chat escolhido continua com transcrições de texto.

Fluxo:

1.  Resolve `supportsAudio` através de `getResolvedModelCapabilities()`. Os metadados
    explícitos do registo do fornecedor prevalecem, depois os metadados estáticos do modelo, e depois `modalities_input`
    sincronizados. Uma lista de entrada declarada sem `audio` é `false`; nenhuma
    evidência de capacidade permanece `null`. Tanto `false` quanto `null` ativam a
    ponte conservadora, enquanto `true` a ignora.
2.  Resolve as configurações `modalityBridgeAudio*` e extrai partes de áudio de nível superior
    passíveis de serem emendadas de cada mensagem através do detetor `detectMediaParts()` partilhado.
    Os formatos de dados suportados são OpenAI `input_audio`, `audio_url` e
    `source.media_type: "audio/*"`. O áudio aninhado é detetado para encaminhamento, mas não
    é removido pelo caminho de emenda. O trabalho é limitado por `modalityBridgeAudioMaxClips`;
    as partes posteriores permanecem intocadas.
3.  Respeita um `provider/model` configurado, ou permite que `selectAudioBridgeModel()` percorra
    `AUDIO_TRANSCRIPTION_PROVIDERS` na ordem estável do catálogo e selecione o primeiro
    modelo com uma credencial de fornecedor ativa utilizável.
4.  `callAudioTranscription()` converte áudio base64/data-URI para um `file` multipart,
    ou descarrega um `audio_url` remoto através da guarda de saída apenas pública com
    fixação de DNS e um limite de 25 MB. Em seguida, envia o ficheiro e o modelo selecionado
    para o self-loop local `/v1/audio/transcriptions`, autenticado com `resolveSelfLoopBearer()`.
    A rota de transcrição existente executa a pesquisa normal de credenciais, o tratamento de
    cooldown/limite de taxa e o despacho do fornecedor.
5.  Chamadas bem-sucedidas substituem as suas partes por `[Audio N]: <transcript>`. As chamadas
    são executadas com `Promise.allSettled`: uma falha individual preserva essa parte de áudio original
    (contrato #4012). Se todas as chamadas falharem e o destino for comprovadamente `supportsAudio === false`,
    as partes tornam-se `[Audio N]: (indisponível — nenhum fornecedor STT conectado)` (contrato #8430). Para
    um destino desconhecido (`null`), um resultado de todas as falhas permanece intocado. Um destino
    comprovadamente apenas de texto sem credencial STT utilizável recebe o mesmo stub explícito sem emitir uma chamada de rede.

Transcrições bem-sucedidas usam a cache LRU/TTL do Modality Bridge em todo o processo. A
chave combina a referência de áudio, o rótulo de operação estável `audio-transcription`
e o modelo STT selecionado; as falhas nunca são armazenadas em cache. As tentativas de áudio
atualizam os contadores partilhados `bridged`, `cacheHits`, `failures` e `lastUsedAt`.
As respostas transformadas contêm
`x-omniroute-modality-bridge: audio->text;model=<sttModel>;parts=<n>`; os pedidos
intocados não recebem um segmento Audio Bridge.

As configurações de tempo de execução são suportadas por DB e validadas por Zod:

| Chave                         | Padrão  | Intervalo      |
| :---------------------------- | :------ | :------------- |
| `modalityBridgeAudioEnabled`  | `true`  | —              |
| `modalityBridgeAudioModel`    | `""`    | Auto ou ID STT |
| `modalityBridgeAudioTimeout`  | `60000` | 1000–300000    |
| `modalityBridgeAudioMaxClips` | `3`     | 1–10           |

A cache partilhada permanece controlada por `modalityBridgeCacheEnabled`,
`modalityBridgeCacheTtlMinutes` e `modalityBridgeCacheMaxEntries`.

### Video Bridge (`videoBridge.ts`, `videoBridgePipeline.ts`)

Interceta partes de vídeo de nível superior em `messages` de Conclusões de Chat e `input` da API de Respostas antes de um destino sem suporte de vídeo nativo conhecido ser chamado.
As formas suportadas são `input_video`, `video_url`, `video_source`, URLs HTTPS e URIs de dados `data:video/*;base64,...`. Nomes de ficheiro simples em texto não são tratados como vídeo.

`VideoBridgeGuardrail.preCall` (`videoBridge.ts`) é responsável pela travessia do pedido, pela verificação de capacidade/política, pela agregação por pedido e pela carga útil da resposta. O trabalho por vídeo — aquisição, a cache de resultados completos, a descrição de uma sequência de frames (que funde qualquer transcrição de áudio declarada pelo chamador) e métricas/aborto/limpeza por tentativa — está oculto atrás de `processVideoPart` em `videoBridgePipeline.ts`, chamado uma vez por parte de vídeo dentro do ciclo de `preCall`. Esse módulo também define os limites de porta explícitos `VideoMediaBrokerPort` (aquisição de bytes e extração de frames amostrados), `VideoAudioTranscriptionPort` (fusão de uma transcrição de áudio declarada pelo chamador com as legendas amostradas) e `VideoDrilldownPort` (o limite de persistência de detalhe de frame; ainda não ligado a `processVideoPart` — apenas a rota separada `/api/modality-bridge/video/drilldown` escreve entradas de detalhe hoje).

O caminho de pedido público `/v1` nunca importa nem invoca um subprocesso. Vídeos remotos são descarregados sob um limite de 50 MiB; vídeos base64 inline têm um limite conservador de 36 MiB descodificados por vídeo para que o modelo/mensagens/envelope de enquadramento possa permanecer dentro do limite de admissão de pedido JSON público de 50 MiB. O comprimento inline e as estimativas de tamanho descodificado são verificados antes da alocação. HTTPS é exigido no URL remoto inicial e em cada redirecionamento, usando a guarda de saída existente apenas pública com fixação de DNS. Os bytes atravessam então o limite exato do broker interno `POST /api/modality-bridge/video/extract`. Essa rota é `LOCAL_ONLY` e `SPAWN_CAPABLE`, aceita apenas um pedido autenticado por processo, de loopback confiável, e nunca aceita um URL, caminho de sistema de ficheiros, executável ou lista de argumentos. O pipeline de tamanho de corpo da API e o leitor de corpo incremental do manipulador impõem independentemente um limite de entrada de broker de 50 MiB. A sua fila limitada executa uma extração de cada vez, permite quatro trabalhos pendentes e limita a entrada pendente a 100 MiB.

Dentro do broker, `ffprobe` lê um ficheiro local privado; a lista de permissões de formato fixo exclui formatos de playlist e manifest. Para contentores da família MOV permitidos, as referências de dados MOV externos permanecem desativadas por predefinição, e o comando fixo não as opta. Tanto `ffprobe` como `ffmpeg` usam a lista de permissões de protocolo apenas `file`, um thread, arrays de argumentos fixos, sem shell, e executáveis resolvidos a partir de `PATH`. Streams de capa de imagem anexada não são candidatos reproduzíveis. Todos os streams reproduzíveis devem satisfazer os limites, e um stream predefinido explícito é preferido antes do fallback determinístico de índice mais baixo. Os vídeos são limitados a 600 segundos, 8.192 pixels por dimensão e 33.554.432 pixels de origem. O FFmpeg amostra 1–16 frames JPEG de ponto médio, reduz a borda mais longa para no máximo 1.024 pixels sem aumentar a escala de entradas menores, e nunca recebe um URL. A amostragem é `uniform` por predefinição. As políticas opcionais `scene_aware` e experimental `segment_aware` realizam uma passagem FFmpeg fixa adicional sobre o stream local já validado, selecionam timestamps de cena `showinfo` limitados e retornam deterministicamente aos mesmos pontos médios uniformes em caso de falha do detetor, tempo limite, saída malformada ou um conjunto de candidatos vazio. O modo `segment_aware` aloca amostras de ponto médio proporcionalmente aos intervalos de cena validados; a evidência `segment_aware` e o comportamento de fallback são detalhados abaixo. O limite rígido de 16 frames é aplicado após a seleção em cada política. Quando um pedido `scene_aware` tem apenas um orçamento de um frame, ele usa o ponto médio uniforme do vídeo completo ativo ou da janela de foco e reporta `policyEffective: uniform`: um único frame de cena selecionado não pode preservar ambas as extremidades temporais. Um chamador pode opcionalmente fornecer uma janela de foco finita (segundos `start`/`end`); os limites são fixados à duração da mídia, janelas invertidas ou não finitas são rejeitadas, e todas as políticas de amostragem são realizadas apenas dentro do intervalo normalizado. A janela resultante é incluída nos metadados de amostragem e no prefixo de descrição não confiável para que os modelos a jusante possam distinguir um excerto focado da linha do tempo completa.

O foco de legenda semântica é uma configuração separada e explícita. O modo de análise `full` predefinido preserva o prompt de frame existente e nunca encaminha o texto do pedido para o modelo de legenda. No modo `focused`, a ponte lê apenas o `text`/`input_text` mais recente não vazio, criado pelo utilizador, do mesmo contentor de Chat ou Respostas, normaliza-o para NFC, colapsa caracteres de controlo e espaços em branco, e limita-o a 500 pontos de código Unicode. Um resultado vazio retorna ao prompt `full` exato. Uma dica utilizável é serializada como JSON num bloco dedicado de contexto de utilizador não confiável e pode apenas priorizar detalhes observáveis; não pode anular o aviso separado contra seguir instruções visíveis ou audíveis na mídia. O foco textual nunca infere `start`/`end` nem altera o amostrador temporal.

#### FU-07 evidência de segmento estrutural

`segment_aware` usa uma passagem de pré-análise limitada sobre o stream de vídeo local já validado. A cadeia de filtros fixa primeiro escala para no máximo 320 pixels de largura, deteta mudanças de cena e intervalos congelados, depois amostra a 1 frame por segundo para desfoque, luma média e informação espacial/temporal. A passagem é limitada a 600 amostras estruturais, um thread FFmpeg/filtro, as mesmas listas de permissões de protocolo e contentor apenas `file`, um limite de saída de processo de 1 MiB e no máximo 30 segundos dentro do aborto/prazo compartilhado do broker. Nunca aceita um comando, filtro, caminho ou URL do pedido.

Os valores estruturais são evidências de amostragem determinísticas, não compreensão semântica de vídeo. Não inferem sujeitos, ações, legendas, fala ou intenção do utilizador. Os limites de cena e de congelamento formam segmentos; a cobertura de congelamento, o desfoque, a exposição, o detalhe espacial e a mudança temporal apenas influenciam como o orçamento existente de 1 a 16 fotogramas é alocado. Um segmento totalmente congelado é limitado a um fotograma, enquanto os segmentos não congelados competem pelo orçamento restante. Quando os limites excedem o número de fotogramas, a cobertura uniforme da linha do tempo é mantida para que cortes rápidos e iniciais não possam ocultar um longo segmento final. Os limites de cena dentro da resolução de análise de 1 segundo de um limite de congelamento são coalescidos.

Filtros em falta, evidências malformadas/vazias, um erro do detetor ou o tempo limite de pré-análise limitado falham abertamente para a política exata de ponto médio uniforme. Um aborto do chamador ou um prazo do broker não falha abertamente: termina o subprocesso em execução, impede a extração posterior de fotogramas e a árvore temporária privada é removida em `finally`.

`scripts/perf/video-bridge-fu07-eval.ts` gera acessórios FFmpeg reais determinísticos para poupanças de chamadas de legendas pós-deduplicação, alocação de orçamento de movimento denso, evidências de desfoque/exposição/SI-TI, cortes rápidos com uma cauda longa e falsos positivos de desvanecimento gradual. Regista o tempo de parede de pré-análise e, onde `/usr/bin/time` está disponível, o CPU do filho e o RSS de pico. As suas verificações de qualidade são apenas oráculos estruturais. A qualidade real do modelo de legendagem permanece `HOLD` porque este arnês não tem um endpoint autorizado ou um juiz fixo. As poupanças monetárias também permanecem `HOLD` a menos que `--caption-cost-per-call-usd` forneça uma estimativa explícita positiva por chamada; o script nunca fabrica nenhum dos resultados.

Cada fotograma é limitado a 4 MiB, todos os fotogramas brutos juntos a 23 MiB e a resposta serializada do broker a 32 MiB. Um diretório temporário privado é removido em `finally`. OmniRoute não inclui FFmpeg e não aceita um caminho de executável personalizado. Antes da legendagem, a ponte aplica uma passagem de deduplicação visual conservadora: cada JPEG é reduzido a um buffer de escala de cinzentos de 16×16 e é comparado apenas com o último fotograma retido. Para um orçamento de legendagem solicitado acima de um fotograma, a extração fornece um conjunto limitado de candidatos de até o dobro desse orçamento e nunca mais de 16 fotogramas. O limite solicitado é aplicado apenas após a deduplicação, com os primeiros e últimos candidatos selecionados preservados durante o desbaste final quando o orçamento é de pelo menos dois. A política versionada `grayscale-16x16-mean-cells-v2` usa o maior entre o delta médio de luma e a proporção de células de miniaturas cujo delta normalizado é de pelo menos 0,05. O limiar de duplicação é a constante 0,04, escolhida pela previsibilidade em vez de ser exposta como uma configuração de tempo de execução. Este sinal secundário de alto contraste preserva pequenos movimentos e mudanças de texto visíveis que uma comparação apenas pela média pode ocultar. Erros do comparador ou do descodificador falham abertamente e mantêm a cobertura. Os metadados de saída separam os candidatos extraídos, os fotogramas usados com sucesso e as duplicatas visuais descartadas.

Uma parte de vídeo explicitamente marcada pode solicitar uma folha de contacto com carimbo de data/hora. A ponte constrói no máximo uma grelha JPEG de 4 colunas e 16 fotogramas. Cada célula de 512 pixels grava o seu carimbo de data/hora de origem numa faixa inferior de alto contraste, enquanto os mesmos carimbos de data/hora permanecem nos metadados textuais para associação e auditoria a jusante. O JPEG completo permanece limitado a 32 MiB. Se `sharp` não conseguir descodificar ou compor a grelha, a ponte reverte para os fotogramas JPEG individuais; um aborto do cliente ainda se propaga através da operação da folha.

A evidência de promoção é deliberadamente separada do microbenchmark de composição sintética. `scripts/perf/video-bridge-contact-sheet-eval.ts` define um arnês A/B com versão de esquema para modelos de visão reais compatíveis com OpenAI. Mede os tokens reportados pelo fornecedor, a latência de parede de ponta a ponta (incluindo a composição da folha), a contagem de chamadas do modelo e a retenção de factos definidos no manifesto. As respostas brutas do modelo não são escritas no relatório; apenas os resumos SHA-256 e os IDs de factos correspondentes são retidos. O arnês não faz chamadas de rede ou chamadas de modelo pagas a menos que `--execute-real` seja passado e `--model`, `OMNIROUTE_BASE_URL` e `OMNIROUTE_API_KEY` estejam configurados. Sem essa execução real explícita, o seu veredito legível por máquina permanece `HOLD`; as medições sintéticas de carga útil/contagem de chamadas por si só não são evidência de promoção.

Os chamadores podem anexar um array opcional `transcript.cues` a uma parte de vídeo suportada quando já possuem texto alinhado. Cada "cue" deve conter `text`, um intervalo finito `start`/`end` dentro da duração sondada, e uma `source` na lista branca (`client`, `embedded` ou `audio-bridge`); `confidence` assume o valor predefinido `1` e deve permanecer entre `0` e `1`. Cues duplicados exatos são colapsados. OmniRoute nunca inicia a transcrição a partir destes metadados: os cues validados são copiados para o resultado descrito com a fonte, confiança e intervalo, e são renderizados como observações não confiáveis ao lado das legendas dos fotogramas. Texto inválido, fora do intervalo ou sem proveniência é rejeitado em vez de ser misturado no fluxo de legendas. O campo `source` é atualmente declarado pelo chamador, não verificado pelo servidor: OmniRoute impõe que o valor seja uma das três strings permitidas, mas ainda não confirma criptograficamente que um rótulo `embedded` ou `audio-bridge` realmente veio de uma extração de propriedade do servidor. Trate `source` como uma dica não confiável até que essa verificação seja implementada; não construa decisões de autorização com base nela.

Um chamador avançado pode fornecer uma faixa `audioTranscript` já autorizada para o mesmo vídeo. A junção de fusão executa observações visuais e de áudio sob um único prazo e sinal de aborto, ordena-as numa linha temporal comum, colapsa duplicados exatos e reporta um resultado parcial quando apenas um lado é bem-sucedido. Um `audioTranscript` inválido degrada para esse resultado parcial — a descrição visual é mantida e o ramo de áudio regista um código de falha sanitizado — em vez de falhar o vídeo inteiro. A disponibilidade por ramo, a flag parcial e os códigos de falha sanitizados são preservados no resultado descrito, nos metadados do guardrail (`audioFusionRuns`/`audioFusionPartials`/`audioFusionFailureCodes`), nos metadados da cache de resultados e nos contadores de fusão da ponte. O caminho padrão do Video Bridge não invoca a conversão de voz em texto nem descarrega uma segunda cópia de multimédia; sem essa faixa explícita, permanece apenas vídeo.

**Retenção de transcrição (#12150 P1).** Isto aplica-se automaticamente sempre que o Video Bridge (que é opt-in) renderiza uma deixa de transcrição — não existe uma flag de retenção separada. Quando um pedido renderiza qualquer deixa de transcrição (uma `transcript` declarada pelo chamador ou um `audioTranscript` fundido), o guardrail marca-o como `videoBridgeObserved` e produz uma sombra redigida da descrição do vídeo — uma renderização idêntica em que o corpo de texto livre de cada deixa é substituído por `[redacted-video-transcript]`, construído pela substituição do campo de deixa estruturado antes de a string ser montada (nunca pela análise do texto achatado, para que nenhum conteúdo de deixa — adversário ou comum, incluindo corpos que contenham `]` como `[inaudible]`/`[music]` — possa sobreviver). O corpo do pedido do registo de chamadas persistido troca cada parte de texto derivada do vídeo por essa sombra redigida, correspondida por igualdade de conteúdo; o âncora `fullText` é relido do payload do guardrail pré-chamada finalizado, para que a correspondência ainda seja bem-sucedida após guardrails de cadeia posteriores (os mascaradores de PII e credenciais, prioridades 10/95) reescreverem o texto da descrição no local e após a injeção de system-prompt/handoff/memory remodelar o array de mensagens. O corpo enviado a montante para o modelo permanece inalterado. Um pedido observado também não preenche nenhuma Memory durável (ambas as extrações derivadas do pedido e da resposta são ignoradas), para que a própria resposta do modelo não possa ecoar texto de transcrição para a Memory.

Cópias retidas adicionais usam o mesmo sinal de pedido observado. O snapshot bruto do pedido do cliente pré-guardrail, o pedido pendente em memória e o registo de pedidos rejeitados precoces substituem estruturalmente os campos de transcrição nas partes do vídeo; os prompts de string sintetizados por fases do pipeline e a transferência de contexto são redigidos no sink do corpo do pedido persistido. O marcador `video_content_removed` persistido faz com que a continuação de `previous_response_id` falhe fechada em vez de reconstruir texto que foi intencionalmente descartado. Se um pedido observado perder a sua sombra de redação por parte antes do registo, ou mesmo se uma de várias sombras de vídeo falhar a correspondência após mutações posteriores do pedido, o corpo do pedido retido é omitido inteiramente em vez de reter uma transcrição parcialmente redigida.

Para um pedido observado, uma resposta do modelo pode citar qualquer porção da transcrição sem um limite de deixa estruturado. O seu `responseBody` do registo de chamadas persistido é, portanto, substituído por um marcador de omissão; o artefacto detalhado do pipeline (que pode incluir corpos a montante/cliente e blocos de stream) não é retido. As caches semânticas, de idempotência e de repetição de raciocínio ignoram leituras e escritas para esse pedido. O pedido do fornecedor e a resposta visível para o cliente permanecem inalterados. Os bytes keepalive iniciais são drenados do buffer temporário quando o artefacto detalhado é omitido. O aviso de `EventStream` malformado de Kiro reporta apenas a contagem de bytes do payload, nunca o seu conteúdo ou o erro bruto do parser JSON. Isto não afirma que todos os diagnósticos de fornecedor/plugin não relacionados foram auditados; a varredura mais ampla do sink retido é acompanhada em #11658.

O ciclo de vida interno `/api/modality-bridge/video/drilldown` é um substrato de cache separado, com autenticação por loopback/token. Cada operação também requer um ID de principal opaco canónico. Antes de um chamador de produção ser ativado, deve derivar esse ID do inquilino autenticado e nunca deve encaminhar um valor selecionado pelo cliente. As chaves da cache vinculam esse principal a IDs de sessão e de referência de vídeo canónicos, armazenam apenas as suas chaves derivadas de SHA-256 e limitam tanto as leituras quanto a eliminação ao mesmo principal. A cache armazena no máximo 16 frames JPEG derivados por entrada, expira-os após dez minutos e suporta leituras `start`/`end` limitadas ou eliminação explícita de sessão.

Cada principal está limitado a 16 entradas e 64 MiB de dados JPEG canónicos. Esses limites são independentes do teto global de 64 entradas/256 MiB: a pressão da quota do principal expulsa apenas as entradas menos recentemente usadas desse principal antes que a expulsão global LRU seja considerada. As entradas expiradas são removidas da contabilidade do principal e global na atividade da cache, enquanto o cancelamento e a falha de validação não efetuam uma substituição parcial.

A cache rejeita Base64 não canónico, preenchimento excessivo, multimédia não-JPEG, JPEGs malformados ou truncados, e JPEGs que produzem um aviso durante uma descodificação `sharp` de imagem completa limitada. Re-codifica cada imagem aceite como um JPEG canónico, deriva a largura e a altura dos bytes descodificados em vez de confiar nos campos do chamador, e descarta quaisquer bytes poliglota finais em vez de os reter. Apenas o buffer comprimido canónico limitado é cobrado a ambas as quotas. O limite de transmissão JSON inclui a sobrecarga de Base64 para o teto de entrada descodificada de 32 MiB. Cada derivação armazenada regista o seu formato/resolução JPEG validado, política de amostragem, versão de derivação, tempo de criação, hash de conteúdo calculado pelo servidor e referência pai com hash, mais o hash de conteúdo pai do chamador confiável. O cancelamento é verificado entre as fases assíncronas de descodificação/hash antes do commit atómico da cache.

Este segmento ainda não conecta um produtor de produção à rota e não oferece seleção de variantes de multi-resolução. O caminho de solicitação transparente do Video Bridge, portanto, não acarreta trabalho adicional, enquanto a derivação principal vinculada ao inquilino e o ciclo de vida completo de multi-resolução FU-08 permanecem como trabalho de acompanhamento explícito, em vez de serem documentados como comportamento completo.

Os fotogramas são legendados sequencialmente com o modelo de Vídeo configurado. Uma substituição de Vídeo vazia herda a configuração de Visão; se ambos estiverem vazios, o auto-roteador de Visão seleciona o modelo efetivo capaz de visão. Legendas bem-sucedidas substituem a parte original por um prefixo estável `[Video description:` que também marca o texto como uma observação não confiável derivada de mídia e instrui os modelos a jusante a não seguir as instruções encontradas na mídia. As chaves de cache de legendas de fotogramas incluem os bytes JPEG, o prompt, o carimbo de data/hora e o modelo efetivo; apenas as legendas bem-sucedidas são armazenadas em cache. As entradas de cache retêm o modelo de produtor bem-sucedido real, incluindo um modelo de fallback; a ponte reporta `mixed` quando diferentes fotogramas foram produzidos por diferentes modelos. Um acerto de cache reutiliza essa identidade de produtor em vez de a rotular novamente como o plano de roteamento solicitado. O cache de resultados de vídeo completo é indexado por cada entrada que altera a saída — prompt, modelo efetivo, política de amostragem, contagem de fotogramas, modo de análise semântica, a impressão digital SHA-256 da dica de foco normalizada, janela de foco, `transcript`, `audioTranscript` e a flag de folha de contacto — portanto, alterar qualquer uma dessas dimensões resulta numa falha de cache, nunca numa reutilização obsoleta. A versão da política de deduplicação visual, o limiar e a contagem limitada de fotogramas candidatos também são explícitos na chave de cache de resultados e nos metadados; uma alteração de política, portanto, não pode reutilizar uma descrição de vídeo completo obsoleta. Os metadados da cache de resultados v4 mantêm o modo e a impressão digital, nunca a tarefa bruta do utilizador. Os metadados do guardrail reportam os modos de análise solicitados e efetivos; um modo `focused` solicitado sem texto de utilizador utilizável é reportado como efetivamente `full`.

O guardrail extrai todas as partes de vídeo suportadas, mas descreve no máximo `modalityBridgeVideoMaxVideos`. Para um alvo comprovadamente com `supportsVideo === false`, os vídeos falhados e acima do limite tornam-se marcadores de texto seguros explícitos para que nenhum vídeo bruto sobreviva. Quando a capacidade é desconhecida, essas partes permanecem intocadas. Alvos com `supportsVideo === true` ignoram a ponte. O sinal de aborto da solicitação do cliente propaga-se através do download, fila do broker, subprocessos e chamadas de legendagem; os abortos param entre vídeos e nunca falham abrindo para mídia bruta.

As configurações de tempo de execução são suportadas por DB e validadas por Zod:

| Key                                 | Default     | Range / behavior                                                                                               |
| :---------------------------------- | :---------- | :------------------------------------------------------------------------------------------------------------- |
| `modalityBridgeVideoEnabled`        | `false`     | Tempo de execução opcional, adesão voluntária                                                                  |
| `modalityBridgeVideoAnalysisMode`   | `"full"`    | `full` preserva legendas genéricas; `focused` usa contexto de utilizador mais recente limitado e não confiável |
| `modalityBridgeVideoModel`          | `""`        | Herda o modelo Vision Bridge                                                                                   |
| `modalityBridgeVideoFrameCount`     | `8`         | 1–16                                                                                                           |
| `modalityBridgeVideoSamplingPolicy` | `"uniform"` | `uniform`, `scene_aware`, ou `segment_aware` proporcional; falha do detetor reverte para `uniform`             |
| `modalityBridgeVideoMaxVideos`      | `1`         | 1–4                                                                                                            |
| `modalityBridgeVideoTimeout`        | `120000`    | 1000–120000 ms                                                                                                 |

Valores de tempo limite de Vídeo persistidos legados acima de 120 segundos são limitados ao prazo do broker; novas gravações de configurações acima desse limite são rejeitadas. `GET /api/modality-bridge/video/runtime` requer localidade de loopback carimbada e confiável antes da autenticação ou sondagem em tempo de execução, e depois requer autenticação de gestão. Retorna apenas `available`, versões sanitizadas de FFmpeg/ffprobe e uma razão fixa quando o tempo de execução não está disponível. O endpoint de extração interno não é uma API de upload pública: a saturação da fila retorna `503` mais `Retry-After`, uma desconexão do chamador retorna `499`, e o prazo fixo do broker retorna `504`. As respostas convertidas adicionam `video->text;model=<visionModel>;parts=<videos>` ao cabeçalho central `x-omniroute-modality-bridge` sem remover os segmentos de Visão ou Áudio.

### Máscara de PII (`piiMasker.ts`)

Executa em **ambas** as fases.

- **`preCall`** clona o payload, percorre `system`, `messages`, `input` e `prompt` (incluindo itens de string simples), e aplica `processPII()` (de `@/shared/utils/inputSanitizer`) aos campos de string `content`/`text`. Quando `PII_REDACTION_ENABLED=true`, PII detetada é redigida no payload de saída. Isto é independente de `INPUT_SANITIZER_MODE` (que apenas controla a política de injeção de prompt). Quando a redação está desativada, a chamada regista as contagens de deteção sem reescrever o conteúdo.
- **`postCall`** clona profundamente a resposta, executa `sanitizePIIResponse()` mais o mascarador de formato da API de Respostas (`maskResponsesOutput` — cobre `output_text` e `output[].content[].text`). Se ocorrer alguma redação, a resposta modificada substitui a original.

O guardrail nunca bloqueia; apenas anota (`meta.detections`, `meta.redacted`) ou reescreve.

### Injeção de Prompt (`promptInjection.ts`)

Deteta estruturas adversárias em conteúdo fornecido pelo utilizador e impõe a política configurada. O comportamento é impulsionado por variáveis de ambiente e opções do construtor:

| Definição          | Variável de ambiente                                                                                  | Predefinição | Efeito                                                                                                                                                                                                  |
| :----------------- | :---------------------------------------------------------------------------------------------------- | :----------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Ativado            | `INPUT_SANITIZER_ENABLED`                                                                             | `true`       | Quando `false`, o guardrail é desativado.                                                                                                                                                               |
| Modo               | `INJECTION_GUARD_MODE` / `INPUT_SANITIZER_MODE`                                                       | `warn`       | Política de injeção: `block`, `warn`, ou `log`. (`redact` é aceite por compatibilidade retroativa, mas **não** remove o texto de injeção; a reescrita de PII é controlada por `PII_REDACTION_ENABLED`.) |
| Limite de bloqueio | `blockThreshold` option / `INPUT_SANITIZER_BLOCK_THRESHOLD` (alias `INJECTION_GUARD_BLOCK_THRESHOLD`) | `high`       | Gravidade mínima necessária para bloquear. Médio é apenas para observação por predefinição.                                                                                                             |

**Precedência do modo** (`getMode`): `options.mode` do chamador →
`INJECTION_GUARD_MODE` **substituição de feature-flag da BD** (Dashboard →
Definições → Feature Flags) → `INJECTION_GUARD_MODE` env → `INPUT_SANITIZER_MODE` env →
`warn`. Uma substituição do dashboard prevalece, portanto, sobre as variáveis de ambiente,
de modo que a UI de Feature Flags controla o guardrail em tempo real (sem reinício).
A leitura da BD é à prova de falhas: se ocorrer um erro, o guardrail reverte para o
comportamento baseado em variáveis de ambiente, e quando nenhuma substituição é definida,
o comportamento é idêntico à resolução apenas por variáveis de ambiente.

Fontes de deteção:

1.  `sanitizeRequest()` de `@/shared/utils/inputSanitizer` (conjunto de detetores
    partilhado usado noutros locais do pipeline).
2.  `DEFAULT_GUARD_PATTERNS` incorporados (atualmente `system_override_inline` e
    `markdown_system_block`, ambos com gravidade `high`).
3.  `customPatterns` opcionais passados através das opções do construtor (strings, regex,
    ou registos `{ name, pattern, severity }`).

Quando `mode === "block"` **e** pelo menos uma deteção atinge o limite de gravidade,
`preCall` retorna `{ block: true, message: "Request rejected:
suspicious content detected" }`. Nos modos `warn`/`log`, o guardrail regista, mas
permite a chamada. O auxiliar partilhado `evaluatePromptInjection()` também é exportado
para chamadores que precisam de avaliar prompts sem passar pelo registo.

**Limite de análise (v3.8.20):** o detetor inspeciona apenas os **primeiros 16 KB** de
texto de prompt combinado — `MAX_INJECTION_SCAN_BYTES = 16 * 1024` (16 384 bytes) em
`src/shared/utils/inputSanitizer.ts`. Tanto `detectInjection()` quanto
`evaluatePromptInjection()` usam `slice(0, MAX_INJECTION_SCAN_BYTES)` antes de executar
o ciclo de padrões. As diretivas de injeção ficam perto do topo de uma entrada, o que
limita o CPU/GC de regex em payloads de centenas de KB sem enfraquecer a deteção (cf.
#3932, #4041).

### Mascarador de Credenciais (`credentialMasker.ts`)

Executa em **ambas** as fases, por último na cadeia predefinida (prioridade `95`). Redige
padrões conhecidos de chaves de API / tokens secretos do payload de saída (conteúdo da
mensagem, argumentos de chamada de ferramenta, resultados de ferramenta) **e** da resposta
do fornecedor, para que uma credencial colada num prompt (ou ecoada por um resultado de
ferramenta) não seja vazada para o fornecedor a montante ou de volta para o cliente.

- **Apenas opt-in**, mesma convenção que a redação de PII (Regra Rígida #20-adjacente):
  desativado a menos que `settings.credentialRedactionEnabled === true` **ou**
  `CREDENTIAL_REDACTION_ENABLED=true`. Com ele desativado, o guardrail é uma operação
  nula — nunca bloqueia e nunca reescreve.
- `redactCredentials()` percorre a árvore completa do payload/resposta (`walkValue()`,
  seguro contra poluição de protótipos, seguro contra ciclos via `WeakSet`) e substitui
  as correspondências por um marcador de posição `[REDACTED:<type>]`, clonando apenas
  os ramos que realmente mudaram.
- `CREDENTIAL_PATTERNS` abrange chaves de fornecedores de LLM (OpenAI, OpenAI-proj,
  Anthropic, Google, Hugging Face, Replicate), tokens VCS/SaaS (GitHub, Slack, Linear,
  Notion, npm, Postman, Discord), chaves de pagamento (Stripe, Square), chaves de nuvem
  (chave de acesso AWS, Twilio, SendGrid, Mailgun), chaves privadas / JWTs, strings de
  conexão com credenciais (`mongodb://user:pass@...`, etc.), e um padrão genérico de
  valor de cabeçalho `Authorization`/`x-api-key`/`api-key`/`apikey`. Chaves em formato
  de cabeçalho (`authorization`, `x-api-key`, `api-key`, `apikey`) são redigidas
  estruturalmente (apenas o valor, prefixo de esquema como `Bearer `/`Basic `
  preservado) em vez de via regex de texto genérico.
- O guardrail nunca bloqueia; apenas reescreve (`modifiedPayload` /
  `modifiedResponse`) e anota (`meta.credentialsRedacted`, `meta.count`).

Teste de regressão: `tests/unit/credential-masker-guardrail.test.ts`.

## Contrato Base (`base.ts`)

```typescript
class BaseGuardrail {
  enabled: boolean;
  name: string;
  priority: number;

  constructor(name: string, options?: { enabled?: boolean; priority?: number });

  async preCall(payload: unknown, context: GuardrailContext): Promise<GuardrailResult | void>;

  async postCall(response: unknown, context: GuardrailContext): Promise<GuardrailResult | void>;
}

interface GuardrailResult<TValue = unknown> {
  block?: boolean; // true interrompe imediatamente a cadeia
  message?: string; // apresentada em caso de bloqueio
  meta?: Record<string, unknown> | null;
  modifiedPayload?: TValue; // devolvido por preCall para reescrever o pedido
  modifiedResponse?: TValue; // devolvido por postCall para reescrever a resposta
}

interface GuardrailContext {
  apiKeyInfo?: Record<string, unknown> | null;
  disabledGuardrails?: string[] | null;
  endpoint?: string | null;
  headers?: Headers | Record<string, unknown> | null;
  log?: GuardrailLog | Console | null;
  method?: string | null;
  model?: string | null;
  provider?: string | null;
  signal?: AbortSignal;
  sourceFormat?: string | null;
  stream?: boolean;
  targetFormat?: string | null;
}
```

Uma proteção assinala «sem alterações» devolvendo `void`, `{}` ou
`{ block: false }`. Devolver um `modifiedPayload`/`modifiedResponse` substitui
o valor que percorre a cadeia para as proteções subsequentes.
`signal?: AbortSignal` transmite o ciclo de vida do chamador às proteções. O cancelamento de um pedido é a exceção deliberada de abertura em caso de falha: as pontes multimédia interrompem o trabalho e efetuam a limpeza sem restaurar os dados multimédia em bruto para um destino que se sabe não os suportar.

## Registo (`registry.ts`)

A instância única `guardrailRegistry` expõe:

- `register(guardrail)` — adiciona uma proteção (ou substitui-a pelo nome normalizado) e
  reordena por `priority` ascendente.
- `clear()` / `list()` — auxiliares administrativos.
- `runPreCallHooks(payload, context)` — percorre as proteções ativas, encaminha o
  payload através de `modifiedPayload` e para no primeiro `block: true`.
- `runPostCallHooks(response, context)` — o mesmo fluxo no lado da resposta.
- `resetGuardrailsForTests({ registerDefaults })` — limpa o estado e, opcionalmente,
  regista novamente as predefinições para garantir um isolamento limpo dos testes.

Ambos os executores devolvem `{ blocked, payload|response, results, guardrail?, message? }`,
em que `results` é um array de registos `GuardrailExecutionResult` que incluem
os campos `blocked`, `skipped`, `modified`, `error` e `meta` por proteção,
úteis para rastreio.

### Desativar Proteções por Pedido

`resolveDisabledGuardrails({ apiKeyInfo, body, headers })` agrega uma
lista sem duplicados dos nomes das proteções que devem ser ignoradas no pedido
atual. Origens (todas opcionais e combinadas):

- `apiKeyInfo.disabledGuardrails`
- `disabledGuardrails` no corpo do pedido (nível superior)
- `metadata.disabledGuardrails` no corpo do pedido
- Cabeçalho `x-omniroute-disabled-guardrails` (ou o antigo
  `x-disabled-guardrails`)

Os valores podem ser arrays de strings ou uma string separada por vírgulas; os nomes são
normalizados para minúsculas em kebab-case (`pii_masker` → `pii-masker`). O resultado
é transmitido através de `context.disabledGuardrails` para o registo, que ignora
as proteções correspondentes (`skipped: true` em `results`).

## Ordem de execução

Para cada pedido que passa por `src/sse/handlers/chat.ts` e
`open-sse/handlers/chatCore.ts`:

1. `resolveDisabledGuardrails(...)` cria a lista de exclusão a partir da chave de API, do corpo
   e dos cabeçalhos.
2. `guardrailRegistry.runPreCallHooks(body, ctx)` executa os mecanismos de proteção por ordem
   crescente de prioridade:
   - Os mecanismos de proteção desativados são registados como `skipped`.
   - O `preCall` de cada mecanismo de proteção pode reescrever a carga útil através de `modifiedPayload`.
   - O primeiro `block: true` interrompe a cadeia e o processador devolve
     uma resposta de rejeição do mecanismo de proteção.
3. A carga útil (potencialmente reescrita) segue para o encaminhamento combinado e para o envio
   ao serviço a montante.
4. Depois de a resposta ser preparada, `guardrailRegistry.runPostCallHooks(...)`
   executa a mesma cadeia na resposta. Neste caso, `block: true` descarta a resposta
   do serviço a montante.

Os mecanismos de proteção que geram exceções são registados com `error: <message>` e registados no log através de
`logger.warn`, mas a cadeia prossegue — uma conceção de falha permissiva.

## Configuração

Variáveis de ambiente lidas pelos mecanismos de proteção integrados:

| Variável                              | Utilizada por            | Efeito                                                                                                                                               |
| ------------------------------------- | ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| `INPUT_SANITIZER_ENABLED`             | `prompt-injection`       | Defina como `false` para desativar completamente a deteção.                                                                                          |
| `INPUT_SANITIZER_MODE`                | `prompt-injection`       | Política de injeção: `warn`, `block` ou `log`. O valor legado `redact` não reescreve o texto da injeção.                                             |
| `INJECTION_GUARD_MODE`                | `prompt-injection`       | Modo do mecanismo de proteção contra injeção; é também um sinalizador de funcionalidade da BD que **substitui** as variáveis de ambiente (BD > ENV). |
| `INPUT_SANITIZER_BLOCK_THRESHOLD`     | `prompt-injection`       | Gravidade mínima que `MODE=block` rejeita: `high` (predefinição), `medium` ou `low`.                                                                 |
| `INJECTION_GUARD_BLOCK_THRESHOLD`     | `prompt-injection`       | Alias legado de `INPUT_SANITIZER_BLOCK_THRESHOLD`.                                                                                                   |
| `PII_REDACTION_ENABLED`               | `pii-masker`             | Quando definido como `true`, as PII do pedido são ocultadas (independentemente do modo de injeção).                                                  |
| `PII_RESPONSE_SANITIZATION` / `_MODE` | `pii-masker` (a jusante) | Controla o comportamento do ocultador no lado da resposta.                                                                                           |

Os mecanismos de proteção do Modality Bridge leem a configuração em tempo de execução a partir do armazenamento
de definições suportado pela BD (`getSettings()`), e não das variáveis de ambiente. As chaves principais da visão são
`modalityBridgeVisionEnabled`, `modalityBridgeVisionMode`,
`modalityBridgeVisionModel`, `modalityBridgeVisionTaskAware`,
`modalityBridgeVisionPrompt`, `modalityBridgeVisionTimeout`,
`modalityBridgeVisionMaxImages`, `modalityBridgeVisionMaxChars`,
`modalityBridgeCacheEnabled`, `modalityBridgeCacheTtlMinutes` e
`modalityBridgeCacheMaxEntries`. As chaves legadas
`visionBridge*` são aceites apenas como a alternativa de leitura documentada durante um ciclo;
as escritas efetuadas pelo painel utilizam as chaves principais. As predefinições e o resolvedor
alternativo encontram-se em `src/shared/constants/modalityBridgeDefaults.ts`, sendo as constantes
legadas mantidas em `src/shared/constants/visionBridgeDefaults.ts`.

O áudio utiliza `modalityBridgeAudioEnabled`, `modalityBridgeAudioModel`,
`modalityBridgeAudioTimeout` e `modalityBridgeAudioMaxClips`, além das definições
`modalityBridgeCache*` partilhadas. O áudio não dispõe de uma alternativa baseada em chaves legadas, uma vez que estas
chaves foram introduzidas com o esquema do Modality Bridge.

O vídeo utiliza `modalityBridgeVideoEnabled`, `modalityBridgeVideoAnalysisMode`,
`modalityBridgeVideoModel`,
`modalityBridgeVideoFrameCount`, `modalityBridgeVideoSamplingPolicy`,
`modalityBridgeVideoMaxVideos` e
`modalityBridgeVideoTimeout`, além das definições `modalityBridgeCache*` partilhadas.
Está desativado por predefinição porque o FFmpeg/ffprobe são dependências operacionais
opcionais e a legendagem de fotogramas acrescenta latência e custos de modelo.

## Mecanismos de proteção personalizados

```typescript
import { BaseGuardrail, guardrailRegistry } from "@/lib/guardrails";

class BudgetGuardrail extends BaseGuardrail {
  constructor() {
    super("budget", { priority: 50 });
  }

  async preCall(payload, ctx) {
    if (ctx.apiKeyInfo?.budgetExceeded) {
      return { block: true, message: "Daily budget exceeded" };
    }
    return { block: false };
  }
}

guardrailRegistry.register(new BudgetGuardrail());
```

Passos:

1. Crie `src/lib/guardrails/myGuardrail.ts` como uma extensão de `BaseGuardrail`.
2. Implemente `preCall` e/ou `postCall`.
3. Registe durante a importação (através de `registerDefaultGuardrails`) ou
   chame `guardrailRegistry.register(...)` em tempo de execução — o registo substitui
   qualquer mecanismo de proteção anterior com o mesmo nome normalizado.
4. Adicione testes em `tests/unit/` (exemplos existentes:
   `tests/unit/guardrails-registry.test.ts`,
   `tests/unit/prompt-injection-guard.test.ts`,
   `tests/unit/guardrails/visionBridge.test.ts`).

## Testes

Utilize `resetGuardrailsForTests()` entre testes para começar a partir de um estado conhecido.
Passe `{ registerDefaults: false }` para começar com um registo vazio e
registar apenas os mecanismos de proteção em teste. O Vision Bridge aceita injeção de
dependências (`deps.getSettings`, `deps.callVisionModel`); o Audio Bridge disponibiliza os
pontos de integração equivalentes para definições, capacidades, seleção do modelo STT, verificações
de credenciais e transcrição. Desta forma, os testes podem exercitar ambos os fluxos sem acesso à
base de dados ou à rede.

## Consulte também

- `src/lib/guardrails/` — implementação
- `src/shared/utils/inputSanitizer.ts` — detetor partilhado que suporta a
  deteção de injeção de prompts e a ocultação de PII
- `src/shared/constants/visionBridgeDefaults.ts` — predefinições do Vision Bridge e
  lista de modelos com utilização obrigatória do bridge
- `src/shared/constants/modalityBridgeDefaults.ts` — predefinições partilhadas de execução do Vision/Audio
- `docs/architecture/RESILIENCE_GUIDE.md` — camada ortogonal (circuit breaker, períodos de espera)
- `docs/reference/ENVIRONMENT.md` — referência completa das variáveis de ambiente

## Cobertura de rotas e red team do mecanismo contra injeção (Fase 8 · Bloco D)

O mecanismo contra injeção (`createInjectionGuard` / `withInjectionGuard`) abrange todas as rotas
que aceitam prompts do utilizador. Respeita `INJECTION_GUARD_MODE` (predefinição `warn` = apenas registo;
`block` = devolve HTTP 400 `SECURITY_001`).

| Tipo              | Rotas                                                                                                                                                | Modo predefinido |
| ----------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------- |
| Texto (existente) | `/v1/chat/completions`, `/v1/completions`, `/v1/relay/chat/completions`                                                                              | warn             |
| Generativo        | `/v1/messages`, `/v1/responses`, `/v1/images/generations`, `/v1/images/edits`, `/v1/videos/generations`, `/v1/music/generations`, `/v1/audio/speech` | warn             |
| Dados             | `/v1/embeddings`, `/v1/rerank`, `/v1/search`, `/v1/moderations`                                                                                      | warn             |

A extração de texto (`extractMessageContents`) abrange `messages`/`input`/`prompt`/`query`+`documents`/`instructions`/`system`.

**Red team (todas as noites, `nightly-llm-security.yml`):** o promptfoo valida que cada rota bloqueia
o corpus OWASP-LLM quando `INJECTION_GUARD_MODE=block`; o garak executa sondagens (é ignorado sem o segredo).
`moderations` está incluído por motivos de consistência — os operadores no modo de bloqueio podem isentá-lo através de
`resolveDisabledGuardrails`.

O fluxo de trabalho noturno (`.github/workflows/nightly-llm-security.yml`, cron + execução
manual) tem duas tarefas:

- **`promptfoo-guard` (bloqueante)** — executa `promptfoo eval -c promptfooconfig.yaml`
  com `INJECTION_GUARD_MODE=block`. Cada caso adversarial (por exemplo, "ignore all
  previous instructions…", jailbreaks ao estilo DAN) verifica que a resposta contém
  `error.code === "SECURITY_001"`, ou seja, que o mecanismo rejeitou efetivamente o pedido.
- **`garak` (consultivo)** — executa o garak com `--probes promptinject,dan,leakreplay`
  numa instância local do OmniRoute (`http://localhost:20128/v1`). Está condicionado à existência de um
  segredo do fornecedor (`PROMPTFOO_PROVIDER_KEY`); é ignorado de forma adequada e recebe o sufixo
  `|| true`, pelo que gera um relatório sem causar uma falha na CI.

A cobertura do auxiliar do mecanismo (`createInjectionGuard` / `withInjectionGuard`)
abrange todas as rotas `/v1` que recebem prompts; o texto do prompt é obtido de
`messages`/`input`/`prompt`/`query`+`documents`/`instructions`/`system` por
`extractMessageContents()` em `src/shared/utils/inputSanitizer.ts`.
