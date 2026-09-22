# Guardrails (Português (Portugal))

🌐 **Languages:** 🇺🇸 [English](../../../../security/GUARDRAILS.md) · 🇪🇹 [am](../../../am/docs/security/GUARDRAILS.md) · 🇸🇦 [ar](../../../ar/docs/security/GUARDRAILS.md) · 🇦🇿 [az](../../../az/docs/security/GUARDRAILS.md) · 🇧🇬 [bg](../../../bg/docs/security/GUARDRAILS.md) · 🇧🇩 [bn](../../../bn/docs/security/GUARDRAILS.md) · 🇨🇿 [cs](../../../cs/docs/security/GUARDRAILS.md) · 🇩🇰 [da](../../../da/docs/security/GUARDRAILS.md) · 🇩🇪 [de](../../../de/docs/security/GUARDRAILS.md) · 🇬🇷 [el](../../../el/docs/security/GUARDRAILS.md) · 🇪🇸 [es](../../../es/docs/security/GUARDRAILS.md) · 🇪🇪 [et](../../../et/docs/security/GUARDRAILS.md) · 🇮🇷 [fa](../../../fa/docs/security/GUARDRAILS.md) · 🇫🇮 [fi](../../../fi/docs/security/GUARDRAILS.md) · 🇫🇷 [fr](../../../fr/docs/security/GUARDRAILS.md) · 🇮🇪 [ga](../../../ga/docs/security/GUARDRAILS.md) · 🇮🇳 [gu](../../../gu/docs/security/GUARDRAILS.md) · 🇳🇬 [ha](../../../ha/docs/security/GUARDRAILS.md) · 🇮🇱 [he](../../../he/docs/security/GUARDRAILS.md) · 🇮🇳 [hi](../../../hi/docs/security/GUARDRAILS.md) · 🇭🇷 [hr](../../../hr/docs/security/GUARDRAILS.md) · 🇭🇺 [hu](../../../hu/docs/security/GUARDRAILS.md) · 🇦🇲 [hy](../../../hy/docs/security/GUARDRAILS.md) · 🇮🇩 [id](../../../id/docs/security/GUARDRAILS.md) · 🇳🇬 [ig](../../../ig/docs/security/GUARDRAILS.md) · 🇮🇹 [it](../../../it/docs/security/GUARDRAILS.md) · 🇯🇵 [ja](../../../ja/docs/security/GUARDRAILS.md) · 🇬🇪 [ka](../../../ka/docs/security/GUARDRAILS.md) · 🇰🇭 [km](../../../km/docs/security/GUARDRAILS.md) · 🇮🇳 [kn](../../../kn/docs/security/GUARDRAILS.md) · 🇰🇷 [ko](../../../ko/docs/security/GUARDRAILS.md) · 🇱🇹 [lt](../../../lt/docs/security/GUARDRAILS.md) · 🇱🇻 [lv](../../../lv/docs/security/GUARDRAILS.md) · 🇮🇳 [ml](../../../ml/docs/security/GUARDRAILS.md) · 🇮🇳 [mr](../../../mr/docs/security/GUARDRAILS.md) · 🇲🇾 [ms](../../../ms/docs/security/GUARDRAILS.md) · 🇲🇹 [mt](../../../mt/docs/security/GUARDRAILS.md) · 🇲🇲 [my](../../../my/docs/security/GUARDRAILS.md) · 🇳🇵 [ne](../../../ne/docs/security/GUARDRAILS.md) · 🇳🇱 [nl](../../../nl/docs/security/GUARDRAILS.md) · 🇳🇴 [no](../../../no/docs/security/GUARDRAILS.md) · 🇮🇳 [or](../../../or/docs/security/GUARDRAILS.md) · 🇮🇳 [pa](../../../pa/docs/security/GUARDRAILS.md) · 🇵🇭 [phi](../../../phi/docs/security/GUARDRAILS.md) · 🇵🇱 [pl](../../../pl/docs/security/GUARDRAILS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/GUARDRAILS.md) · 🇷🇴 [ro](../../../ro/docs/security/GUARDRAILS.md) · 🇷🇺 [ru](../../../ru/docs/security/GUARDRAILS.md) · 🇱🇰 [si](../../../si/docs/security/GUARDRAILS.md) · 🇸🇰 [sk](../../../sk/docs/security/GUARDRAILS.md) · 🇸🇮 [sl](../../../sl/docs/security/GUARDRAILS.md) · 🇷🇸 [sr](../../../sr/docs/security/GUARDRAILS.md) · 🇸🇪 [sv](../../../sv/docs/security/GUARDRAILS.md) · 🇰🇪 [sw](../../../sw/docs/security/GUARDRAILS.md) · 🇮🇳 [ta](../../../ta/docs/security/GUARDRAILS.md) · 🇮🇳 [te](../../../te/docs/security/GUARDRAILS.md) · 🇹🇭 [th](../../../th/docs/security/GUARDRAILS.md) · 🇹🇷 [tr](../../../tr/docs/security/GUARDRAILS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/GUARDRAILS.md) · 🇵🇰 [ur](../../../ur/docs/security/GUARDRAILS.md) · 🇺🇿 [uz](../../../uz/docs/security/GUARDRAILS.md) · 🇻🇳 [vi](../../../vi/docs/security/GUARDRAILS.md) · 🇳🇬 [yo](../../../yo/docs/security/GUARDRAILS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/GUARDRAILS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/GUARDRAILS.md)

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

## Guardrails integradas

O registo carrega automaticamente seis guardrails por ordem de prioridade durante a importação
(consulte `registry.ts` → `registerDefaultGuardrails()`):

| Prioridade | Nome                | Fase(s)        | Ficheiro              |
| ---------- | ------------------- | -------------- | --------------------- |
| `5`        | `vision-bridge`     | `preCall`      | `visionBridge.ts`     |
| `6`        | `audio-bridge`      | `preCall`      | `audioBridge.ts`      |
| `7`        | `video-bridge`      | `preCall`      | `videoBridge.ts`      |
| `10`       | `pii-masker`        | `pre` + `post` | `piiMasker.ts`        |
| `20`       | `prompt-injection`  | `preCall`      | `promptInjection.ts`  |
| `95`       | `credential-masker` | `pre` + `post` | `credentialMasker.ts` |

Os números de prioridade mais baixos são executados **primeiro**.

### Vision Bridge (`visionBridge.ts`) — Modality Bridge PR-1

Interceta pedidos que contêm imagens e que se destinam a **modelos sem capacidade de visão**, e
reencaminha o pedido completo para um modelo com capacidade de visão ou substitui as partes
de imagem por descrições textuais produzidas por um modelo de visão configurável antes
da chamada a montante. Isto permite que fornecedores exclusivamente de texto processem
payloads multimodais de forma transparente.

Fluxo:

1. Ignorar se o modelo de destino já suportar visão (exceto se constar na
   lista de utilização forçada da bridge `isVisionBridgeForcedModel`).
2. Extrair as partes de imagem através de `extractImageParts(messages)`
   (`visionBridgeHelpers.ts`), que delega no **detetor unificado de multimédia**
   `detectMediaParts()` em `open-sse/utils/mediaParts.ts` — a
   única fonte fidedigna partilhada com o filtro de compatibilidade combo.
   A extração está limitada por uma lista de permissões às partes de nível superior com os formatos que
   `replaceImageParts` pode reinserir (o contrato extrair↔substituir): OpenAI
   `image_url`, base64 do Anthropic `source.type:"base64"`, URL do Anthropic
   `source.type:"url"` e `input_image` da Responses API. As correspondências
   aninhadas e os formatos apenas indicativos são material para o filtro combo e nunca são extraídos.
   Ignorar se não for encontrada nenhuma.
3. Resolver a configuração de tempo de execução através de `resolveVisionBridgeRuntimeSettings()`
   (`src/shared/constants/modalityBridgeDefaults.ts`): as novas chaves de definições
   `modalityBridge*` prevalecem; as chaves legadas `visionBridge*` permanecem como
   **fallback durante um ciclo** (janela de reversão). Ignorar antes de qualquer
   processamento de multimédia quando a bridge estiver desativada.
4. O seletor de modo (`modalityBridgeVisionMode`, consulte a tabela abaixo) decide entre
   reencaminhar e descrever. O reencaminhamento devolve `modifiedPayload` apenas com
   `model` substituído, além dos metadados `{ rerouted, fromModel, toModel, imagesKept }`.
5. Caminho de descrição: limitar as imagens a `maxImages`, compor o prompt sensível à tarefa,
   consultar a cache de descrições, chamar o modelo de visão **em paralelo**
   (`Promise.allSettled`) e inserir partes de texto `[Image N]: <description>` nos
   respetivos lugares. Uma descrição falhada produz `null` e a parte de imagem original é
   **preservada** (#4012) — exceto no caminho de descrição combo quando todas as
   descrições falham, caso em que um serviço a montante confirmado como não tendo capacidade de visão recebe um
   marcador `(unavailable — no vision-capable provider connected)` (#8430).
6. Devolver `modifiedPayload` + metadados (`imagesProcessed`, `descriptions`,
   `processingTimeMs`, `visionModel`).

#### Seletor de modo (`modalityBridgeVisionMode`)

| Modo       | Predefinição | Comportamento                                                                                                                                                                                                                                                                                                                                      |
| ---------- | ------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `auto`     | ✔            | Heurística legada, inalterada (#6640/#7204): os modelos que não são combo/`auto/` são reencaminhados para o melhor modelo de visão, exceto se o modelo original já tiver credenciais utilizáveis (nesse caso, descreve); os destinos combo descrevem sempre.                                                                                       |
| `describe` |              | Descrever sempre — o bloco de reencaminhamento é totalmente ignorado; o modelo escolhido pelo utilizador responde sempre.                                                                                                                                                                                                                          |
| `reroute`  |              | Forçar o reencaminhamento: a proteção que mantém o modelo com credenciais é ignorada. A proteção de credenciais do **destino** do reencaminhamento continua a aplicar-se — quando não existe um destino de visão utilizável, o pedido recorre à descrição para que as imagens em bruto nunca cheguem a um backend exclusivamente de texto (#8430). |

Os modos forçados efetuam um curto-circuito **antes** da execução da heurística automática; o comportamento
de `auto` é idêntico, byte por byte, ao da guardrail anterior ao PR-1.

#### Prompt de descrição sensível à tarefa (`modalityBridgeVisionTaskAware`)

**true** por predefinição. `composeVisionPrompt()` (`visionBridgeHelpers.ts`) acrescenta
o texto da **última mensagem do utilizador** (truncado a 500 carateres) ao prompt
de descrição base, orientando a descrição para aquilo que o utilizador realmente pediu
(padrão codex-vision-proxy) e pedindo ao modelo de visão que transcreva o texto visível.
Com a opção desativada — ou sem texto do utilizador — o prompt base é utilizado sem alterações.

O próprio pedido compatível com OpenAI do ciclo interno de descrição (`callVisionModelSingle()`
em `visionBridgeHelpers.ts`) solicita sempre `image_url.detail: "high"` —
incondicionalmente, para todos os chamadores/fornecedores, sem depender de qualquer sinal do cliente.
A amostragem com pouco detalhe degrada a precisão do OCR precisamente na tarefa de transcrição
de texto solicitada por este prompt, pelo que a própria chamada de descrição solicita sempre um nível
de detalhe elevado, independentemente do nível de detalhe utilizado pelo pedido original recebido. Isto
afeta apenas o corpo do pedido interno de descrição; não altera a forma como o
OmniRoute reencaminha o `image_url.detail` do próprio chamador no pedido principal —
esse valor predefinido é aplicado separadamente, e apenas para clientes OpenCode detetados, em
`defaultImageDetail()` (`open-sse/handlers/chatCore/upstreamBody.ts`). O ramo
do formato de transmissão Anthropic do ciclo interno de descrição não possui um campo `detail`
e não é afetado por nenhum dos valores predefinidos.

#### Limite da saída da descrição (`modalityBridgeVisionMaxChars`)

| Chave                          | Predefinição | Intervalo        |
| ------------------------------ | ------------ | ---------------- |
| `modalityBridgeVisionMaxChars` | `0`          | `0` ou 100–50000 |

`0` (predefinição) significa **sem limite** — a descrição devolvida por
`callVisionModel()` é transmitida sem alterações, preservando o comportamento
existente. Qualquer valor no intervalo 100–50000 trunca a descrição, acrescentando
o sufixo `…`, antes de esta ser reinserida como `[Image N]: <description>`
(`VisionBridgeGuardrail.preCall()` em `src/lib/guardrails/visionBridge.ts`).
Aumente este valor para tarefas de OCR com muitos detalhes nas quais o modelo a jusante necessita da
transcrição completa; reduza-o para limitar a utilização de tokens em modelos de visão prolixos.
O campo do painel encontra-se no painel Avançadas do separador Visão
(`modality-bridge-max-chars` em `ModalityBridgeVisionTab.tsx`) e ajusta qualquer
valor entre 1 e 99 para o limite mínimo de 100, mantendo um `0` explícito
inalterado — `0` é, por si só, um valor Zod válido
(`z.union([z.literal(0), z.number().int().min(100).max(50000)])`), e não apenas
a predefinição «não definido».

#### Cache de descrições (`modalityBridge/bridgeCache.ts`)

Cache LRU + TTL em memória para saídas de descrição, partilhado por todo o processo.
Chave = `sha256(imageRef + composedPrompt + configuredBridgeModel)` com
delimitação por prefixo de comprimento (sem colisões entre limites de campos). O componente do modelo é
o modelo de ponte **configurado**, não o modelo que efetivamente respondeu —
`callVisionModel` pode recorrer internamente a uma alternativa, e criar chaves por tentativa
fragmentaria a cache. As descrições falhadas nunca são armazenadas em cache. Definições:

| Chave                           | Predefinição | Intervalo |
| ------------------------------- | ------------ | --------- |
| `modalityBridgeCacheEnabled`    | `true`       | —         |
| `modalityBridgeCacheTtlMinutes` | `60`         | 1–1440    |
| `modalityBridgeCacheMaxEntries` | `200`        | 10–5000   |

#### Normalização de imagens remotas (descrição em ciclo interno/obtenção em base64)

Quando a ponte obtém autonomamente uma imagem **remota** — tanto na chamada
interna de descrição Anthropic como na conversão para base64 no formato de transmissão Claude
(`ensureBase64ImagesForClaudeWire`), ambas através de
`fetchRemoteImageAsDataUri()` em `visionBridgeHelpers.ts` — o URI de dados resultante
é processado por `normalizeDataUri()`
(`open-sse/utils/imageNormalize.ts`) antes de ser incorporado no pedido ao modelo
de visão. As imagens de grandes dimensões são reduzidas para um **lado maior de 2048 px** (correspondendo
ao limite de redimensionamento que a OpenAI/Anthropic já aplica no lado do servidor), o que reduz
os bytes/latência do carregamento sem alterar aquilo que o modelo de visão vê. O redimensionamento
utiliza `sharp`, carregado através de uma importação dinâmica: numa plataforma em que o respetivo
binário nativo não seja carregado, `normalizeDataUri()` **nunca lança uma exceção** — recorre
à transmissão sem alterações dos bytes originais, para que o caminho de descrição/conversão
para base64 continue sempre a funcionar. Os bytes que não correspondam a uma imagem (uma obtenção que não tenha devolvido uma
imagem descodificável) também são transmitidos sem alterações. Esta normalização
limita-se às imagens que a ponte obtém para a sua própria chamada interna — nunca é
aplicada ao payload bruto transmitido pelo chamador, em conformidade com o
princípio de mutação apenas mediante adesão explícita (Regra Rígida n.º 20).

#### Esquema de definições + migração

As novas chaves `modalityBridge*` são validadas por Zod em `updateSettingsSchema`
(`src/shared/validation/settingsSchemas.ts`): `modalityBridgeVisionEnabled`,
`modalityBridgeVisionMode`, `modalityBridgeVisionModel`,
`modalityBridgeVisionTaskAware`, `modalityBridgeVisionPrompt`,
`modalityBridgeVisionTimeout`, `modalityBridgeVisionMaxImages`,
`modalityBridgeVisionMaxChars`, o trio `modalityBridgeCache*` e o
grupo `modalityBridgeAudio*` utilizado pela Ponte de Áudio. A migração
`141_modality_bridge_settings.sql` copia os valores legados `visionBridge*`
existentes para as novas chaves correspondentes (é idempotente e nunca substitui
um valor `modalityBridge*` definido pelo operador); as chaves legadas continuam a ser
aceites como alternativa de leitura durante um ciclo de lançamento.

#### Cabeçalho de transparência + estatísticas

As respostas transformadas por descrição incluem
`x-omniroute-modality-bridge: image->text;model=<visionModel>;parts=<n>`
(criado por `buildModalityBridgeHeader()` em `modalityBridge/bridgeStats.ts`
e aplicado por `withModalityBridgeHeader()` em `src/sse/handlers/chatHelpers.ts`).
Os pedidos reencaminhados **não** recebem qualquer cabeçalho — o payload não foi alterado e a troca de
modelo já é visível no campo `model` do corpo da resposta.

`GET /api/modality-bridge/stats` (autenticação de gestão, o mesmo nível que
`GET /api/settings`) devolve os contadores por modalidade em memória
`{ attempts, successes, bridged, cacheHits, failures, totalLatencyMs,
latencySamples, averageLatencyMs, lastUsedAt }` para `vision`, `audio` e
`video`. `averageLatencyMs` utiliza `latencySamples`, e não todas as tentativas, como
denominador; uma operação sem medição de tempo não cria artificialmente uma amostra de zero
milissegundos. `bridged` mantém-se como o alias retrocompatível para conversões
bem-sucedidas; as tentativas falhadas não o incrementam.
Por conceção, os contadores são reiniciados quando o processo é reiniciado
(telemetria, não contabilização).

#### Configuração do painel

A página dedicada do painel é
`/dashboard/settings/modality-bridge`. Os respetivos separadores `Visão`, `Áudio`
e `Vídeo`, acessíveis por URL, preservam os parâmetros de consulta ao alterar o
valor de `tab`. O separador Visão disponibiliza a ativação, o modo, a seleção do
modelo (incluindo a predefinição automática), instruções adaptadas à tarefa,
limites avançados de tempo limite/imagem/comprimento da descrição/cache,
contadores de tempo de execução e um pedido de exemplo protegido. O separador
Áudio também está operacional: disponibiliza a ativação, um seletor de modelos
apenas para STT com a opção Automático, limites de tempo máximo/duração máxima
dos clipes, contadores de áudio e um teste de exemplo `input_audio`. O separador
Vídeo está funcional: comunica o estado de tempo de execução do FFmpeg/ffprobe —
um de quatro estados explícitos da IU (`unknown` enquanto a sondagem está em curso
ou não pôde ser concluída, `restricted` num anfitrião do painel que não seja de
loopback, onde a sondagem é ignorada no lado do cliente, `unavailable` após a
sondagem confirmar que não está disponível, ou `available` com as versões do
FFmpeg/ffprobe) —, mantém os limites de ativação/modelo/fotogramas/vídeo/tempo
limite, filtra o seletor para modelos com capacidade de visão e disponibiliza
contadores de vídeo.

O antigo cartão Vision Bridge nas definições de IA é uma ligação de
compatibilidade para a nova página; já não contém uma segunda cópia do
formulário. Media Providers também associa os fluxos de trabalho Image-to-Text e
Speech-to-Text aos separadores correspondentes do Modality Bridge, sem remover o
playground Speech-to-Text existente.

**Bypass da admissão em auto-loop:** quando a chamada de descrição é encaminhada
através do próprio auto-loop `/v1` do OmniRoute (modelo de fornecedor não
padronizado), o subpedido envia `x-omniroute-admission-bypass: internal` e é
autenticado com a credencial de auto-loop resolvida — o sentinela local
`sk_omniroute` no modo local, ou a chave de ambiente `OMNIROUTE_API_KEY` /
`ROUTER_API_KEY` configurada pelo operador (#1350), para que as implementações
com `REQUIRE_API_KEY=true` continuem a poder executar a chamada de descrição. O
bypass só é aceite para essas credenciais exatas, pelo que os clientes externos
não podem utilizar o cabeçalho para ignorar a admissão.

As predefinições legadas encontram-se em
`src/shared/constants/visionBridgeDefaults.ts`; as novas predefinições de
modo/adaptação à tarefa/cache e o resolvedor de definições encontram-se em
`src/shared/constants/modalityBridgeDefaults.ts`. O mecanismo de proteção
disponibiliza uma opção de construtor `deps`, para que os testes possam injetar
implementações falsas de `getSettings` e `callVisionModel`.

### Audio Bridge (`audioBridge.ts`) — Modality Bridge PR-3

Interceta pedidos de chat com áudio antes de chegarem a um destino que não seja
conhecido por aceitar entrada de áudio. Nunca reencaminha o pedido de chat: as
partes de áudio são transcritas através do endpoint multipart compatível com
OpenAI existente, e o modelo de chat selecionado prossegue com transcrições de
texto.

Fluxo:

1. Resolve `supportsAudio` através de `getResolvedModelCapabilities()`. Os
   metadados explícitos do registo de fornecedores têm prioridade, seguidos dos
   metadados estáticos do modelo e, por fim, de `modalities_input` sincronizado.
   Uma lista de entradas declarada sem `audio` resulta em `false`; a ausência de
   evidências de capacidade resulta em `null`. Tanto `false` como `null` ativam a
   bridge conservadora, enquanto `true` a ignora.
2. Resolve as definições `modalityBridgeAudio*` e extrai partes de áudio de nível
   superior que podem ser removidas de todas as mensagens através do detetor
   partilhado `detectMediaParts()`. Os formatos de transmissão suportados são
   `input_audio` e `audio_url` do OpenAI, bem como
   `source.media_type: "audio/*"`. O áudio aninhado é detetado para efeitos de
   encaminhamento, mas não é removido pelo processo de remoção. O trabalho é
   limitado por `modalityBridgeAudioMaxClips`; as partes posteriores permanecem
   inalteradas.
3. Respeita um `provider/model` configurado ou permite que
   `selectAudioBridgeModel()` percorra `AUDIO_TRANSCRIPTION_PROVIDERS` pela ordem
   estável do catálogo e selecione o primeiro modelo com uma credencial de
   fornecedor ativa e utilizável.
4. `callAudioTranscription()` converte áudio base64/data URI num `file` multipart
   ou transfere um `audio_url` remoto através da proteção de saída apenas pública,
   com fixação de DNS e um limite de 25 MB. Em seguida, envia por POST o ficheiro
   e o modelo selecionado para o auto-loop local `/v1/audio/transcriptions`,
   autenticado com `resolveSelfLoopBearer()`. A rota de transcrição existente
   efetua a pesquisa normal de credenciais, a gestão de períodos de arrefecimento/
   limites de taxa e o encaminhamento para o fornecedor.
5. As chamadas bem-sucedidas substituem as respetivas partes por
   `[Audio N]: <transcript>`. As chamadas são executadas com
   `Promise.allSettled`: uma falha individual preserva a parte de áudio original
   correspondente (contrato #4012). Se todas as chamadas falharem e estiver
   comprovado que o destino tem `supportsAudio === false`, as partes passam a
   `[Audio N]: (unavailable — no STT provider connected)` (contrato #8430). Para
   um destino desconhecido (`null`), um resultado em que todas as chamadas
   falharam permanece inalterado. Um destino comprovadamente apenas de texto, sem
   uma credencial STT utilizável, recebe o mesmo marcador explícito sem efetuar
   uma chamada de rede.

As transcrições bem-sucedidas utilizam a cache LRU/TTL do Modality Bridge ao
nível de todo o processo. A chave combina a referência do áudio, o rótulo de
operação estável `audio-transcription` e o modelo STT selecionado; as falhas nunca
são armazenadas em cache. As tentativas de áudio atualizam os contadores
partilhados `bridged`, `cacheHits`, `failures` e `lastUsedAt`. As respostas
transformadas incluem
`x-omniroute-modality-bridge: audio->text;model=<sttModel>;parts=<n>`; os pedidos
inalterados não recebem um segmento Audio Bridge.

As definições de tempo de execução são suportadas pela base de dados e validadas
pelo Zod:

| Chave                         | Predefinição | Intervalo            |
| ----------------------------- | ------------ | -------------------- |
| `modalityBridgeAudioEnabled`  | `true`       | —                    |
| `modalityBridgeAudioModel`    | `""`         | Automático ou ID STT |
| `modalityBridgeAudioTimeout`  | `60000`      | 1000–300000          |
| `modalityBridgeAudioMaxClips` | `3`          | 1–10                 |

A cache partilhada continua a ser controlada por `modalityBridgeCacheEnabled`,
`modalityBridgeCacheTtlMinutes` e `modalityBridgeCacheMaxEntries`.

### Video Bridge (`videoBridge.ts`, `videoBridgePipeline.ts`)

Interceta partes de vídeo de nível superior em `messages` de Chat Completions e no `input` da Responses
API antes de ser chamado um destino sem suporte nativo de vídeo conhecido.
Os formatos suportados são `input_video`, `video_url`, `video_source`, URLs HTTPS
e URIs de dados `data:video/*;base64,...`. Nomes de ficheiros simples em texto não são tratados
como vídeo.

`VideoBridgeGuardrail.preCall` (`videoBridge.ts`) é responsável pela travessia do pedido, pela
verificação de capacidades/políticas, pela agregação por pedido e pelo payload da resposta.
O trabalho por vídeo — aquisição, cache do resultado completo, descrição de uma sequência
de fotogramas (que combina qualquer transcrição de áudio declarada pelo chamador) e
métricas/interrupção/limpeza por tentativa — é ocultado por `processVideoPart` em
`videoBridgePipeline.ts`, chamado uma vez por cada parte de vídeo dentro do ciclo de `preCall`.
Esse módulo também define os limites explícitos das interfaces `VideoMediaBrokerPort`
(aquisição de bytes e extração de fotogramas amostrados), `VideoAudioTranscriptionPort`
(combinação de uma transcrição de áudio declarada pelo chamador com as legendas amostradas) e
`VideoDrilldownPort` (o limite de persistência da análise aprofundada de fotogramas; ainda não está
ligado a `processVideoPart` — atualmente, apenas a rota separada `/api/modality-bridge/video/drilldown`
escreve entradas de análise aprofundada).

O caminho público de pedidos `/v1` nunca importa nem invoca um subprocesso. Os vídeos remotos
são transferidos com um limite de 50 MiB; os vídeos base64 inline têm um limite conservador
por vídeo de 36 MiB após descodificação, para que o envelope de modelo/mensagens/enquadramento
possa permanecer dentro do limite público de admissão de pedidos JSON de 50 MiB. O comprimento
inline e as estimativas do tamanho descodificado são verificados antes da alocação. É necessário
HTTPS no URL remoto inicial e em todos os redirecionamentos, utilizando a proteção de saída
existente, limitada a endereços públicos e com fixação de DNS. Em seguida, os bytes atravessam
o limite exato do intermediário interno `POST /api/modality-bridge/video/extract`. Essa rota é
simultaneamente `LOCAL_ONLY` e `SPAWN_CAPABLE`, aceita apenas um pedido de loopback fidedigno,
autenticado por processo, e nunca aceita um URL, um caminho do sistema de ficheiros, um executável
ou uma lista de argumentos. O pipeline de tamanho do corpo da API e o leitor incremental do corpo
do processador impõem, independentemente, um limite de entrada de 50 MiB no intermediário. A sua
fila limitada executa uma extração de cada vez, permite quatro tarefas pendentes e limita a entrada
pendente a 100 MiB.

Dentro do intermediário, `ffprobe` lê um ficheiro local privado; a lista fixa de formatos
permitidos exclui formatos de listas de reprodução e de manifestos. Para os contentores permitidos
da família MOV, as referências externas a dados MOV permanecem desativadas por predefinição, e o
comando fixo não as ativa. Tanto `ffprobe` como `ffmpeg` utilizam a lista de protocolos permitidos
restrita a `file`, uma thread, matrizes fixas de argumentos, sem shell e com os executáveis
resolvidos a partir de `PATH`. Os fluxos de imagens de capa anexadas não são candidatos
reproduzíveis. Todos os fluxos reproduzíveis têm de cumprir os limites, sendo preferido um fluxo
predefinido explícito antes do recurso determinístico ao índice mais baixo. Os vídeos estão
limitados a 600 segundos, 8 192 píxeis por dimensão e 33 554 432 píxeis de origem. O FFmpeg
amostra entre 1 e 16 fotogramas JPEG em pontos médios, reduz a aresta mais longa para, no máximo,
1 024 píxeis sem ampliar entradas mais pequenas e nunca recebe um URL. Por predefinição, a
amostragem é `uniform`. As políticas opcionais `scene_aware` e experimental `segment_aware`
efetuam uma passagem fixa adicional do FFmpeg sobre o fluxo local já validado, selecionam marcas
temporais de cenas `showinfo` dentro dos limites e recorrem deterministicamente aos mesmos pontos
médios uniformes em caso de falha do detetor, tempo limite, saída malformada ou conjunto de
candidatos vazio. O modo sensível a segmentos atribui amostras de pontos médios proporcionalmente
aos intervalos de cenas validados; as evidências do modo sensível a segmentos e o comportamento
de recurso são detalhados abaixo. O limite rígido de 16 fotogramas é aplicado após a seleção em
todas as políticas. Quando um pedido sensível a cenas dispõe de um orçamento de apenas um
fotograma, utiliza o ponto médio uniforme do vídeo completo ativo ou da janela de foco e indica
`policyEffective: uniform`: um único fotograma de cena selecionado não consegue preservar ambas
as extremidades temporais. Opcionalmente, o chamador pode fornecer uma janela de foco finita
(`start`/`end` em segundos); os limites são restringidos à duração do conteúdo multimédia, as
janelas invertidas ou não finitas são rejeitadas e todas as políticas de amostragem são executadas
apenas dentro do intervalo normalizado. A janela resultante é incluída nos metadados de amostragem
e no prefixo não fidedigno da descrição, para que os modelos subsequentes consigam distinguir um
excerto focado da cronologia completa.

O foco semântico das legendas é uma definição separada e explícita. O modo de análise
predefinido `full` preserva o prompt de fotogramas existente e nunca encaminha o texto do pedido
para o modelo de legendagem. No modo `focused`, a ponte lê apenas o `text`/`input_text` mais
recente, não vazio e criado pelo utilizador, a partir do mesmo contentor de Chat ou Responses,
normaliza-o para NFC, reduz caracteres de controlo e espaços em branco e limita-o a 500 pontos
de código Unicode. Um resultado vazio recorre ao prompt `full` exato. Uma indicação utilizável
é serializada como JSON num bloco dedicado de contexto de utilizador não fidedigno e só pode
dar prioridade a detalhes observáveis; não pode sobrepor-se ao aviso separado contra o
seguimento de instruções visíveis ou audíveis no conteúdo multimédia. O foco textual nunca
infere `start`/`end` nem altera o amostrador temporal.

#### Evidências estruturais de segmentos do FU-07

`segment_aware` utiliza uma passagem limitada de pré-análise sobre o fluxo de vídeo local já
validado. A cadeia fixa de filtros começa por reduzir a largura para, no máximo, 320 píxeis,
deteta mudanças de cena e intervalos congelados e, em seguida, efetua a amostragem a 1 fotograma
por segundo para avaliar desfocagem, luminância média e informação espacial/temporal. A passagem
está limitada a 600 amostras estruturais, uma thread de FFmpeg/filtro, às mesmas listas de
protocolos restritas a `file` e de contentores permitidos, a um limite de 1 MiB para a saída do
processo e a, no máximo, 30 segundos dentro do mecanismo partilhado de interrupção/prazo do
intermediário. Nunca aceita um comando, filtro, caminho ou URL proveniente do pedido.

Os valores estruturais constituem evidência de amostragem determinística, não compreensão semântica do vídeo. Não inferem sujeitos, ações, legendas, fala nem a intenção do utilizador. Os limites de cenas e de congelamentos formam segmentos; a cobertura de congelamentos, a desfocagem, a exposição, o detalhe espacial e a alteração temporal apenas influenciam a forma como o orçamento existente de 1–16 fotogramas é distribuído. Um segmento totalmente congelado fica limitado a um fotograma, enquanto os segmentos não congelados competem pelo orçamento restante. Quando o número de limites excede o de fotogramas, é mantida uma cobertura uniforme da linha temporal, para que cortes rápidos no início não possam ocultar um segmento final longo. Os limites de cenas dentro da resolução de análise de 1 segundo de um limite de congelamento são agregados.

Filtros em falta, evidência malformada/vazia, um erro do detetor ou o tempo limite da pré-análise restringida resultam, de forma permissiva, na política exata de pontos médios uniformes. Uma interrupção pelo chamador ou o prazo-limite do broker não resulta de forma permissiva: termina o subprocesso em curso, impede a extração posterior de fotogramas e a árvore temporária privada é removida em `finally`.

`scripts/perf/video-bridge-fu07-eval.ts` gera fixtures FFmpeg reais e determinísticas para avaliar a redução de chamadas de legendagem após a desduplicação, a distribuição do orçamento em movimento denso, a evidência de desfocagem/exposição/SI-TI, cortes rápidos com uma cauda longa e falsos positivos de desvanecimento gradual. Regista o tempo decorrido da pré-análise e, quando `/usr/bin/time` está disponível, a CPU do processo subordinado e o pico de RSS. As respetivas verificações de qualidade são apenas oráculos estruturais. A qualidade do modelo real de legendagem permanece `HOLD`, porque este harness não dispõe de um endpoint autorizado nem de um avaliador fixo. As poupanças monetárias também permanecem `HOLD`, a menos que `--caption-cost-per-call-usd` forneça uma estimativa positiva explícita do custo por chamada; o script nunca inventa nenhum destes resultados.

Cada fotograma está limitado a 4 MiB, o conjunto de todos os fotogramas em bruto a 23 MiB e a resposta serializada do broker a 32 MiB. Um diretório temporário privado é removido em `finally`. O OmniRoute não inclui o FFmpeg e não aceita um caminho personalizado para o executável. Antes da legendagem, a ponte aplica uma passagem conservadora de desduplicação visual: cada JPEG é reduzido a um buffer em escala de cinzentos de 16×16 e comparado apenas com o último fotograma retido. Para um orçamento de legendagem solicitado superior a um fotograma, a extração fornece um conjunto limitado de candidatos de até duas vezes esse orçamento, nunca excedendo 16 fotogramas. O limite solicitado só é aplicado após a desduplicação, preservando o primeiro e o último candidatos selecionados durante a redução final quando o orçamento é de, pelo menos, dois. A política versionada `grayscale-16x16-mean-cells-v2` utiliza o maior valor entre a diferença média de luminância e a proporção de células da miniatura cuja diferença normalizada seja, pelo menos, 0,05. O limiar de duplicação é a constante 0,04, escolhida pela previsibilidade em vez de ser exposta como uma definição de execução. Este sinal secundário de elevado contraste preserva pequenos movimentos e alterações de texto visível que uma comparação baseada apenas na média pode ocultar. Os erros do comparador ou do descodificador resultam de forma permissiva e mantêm a cobertura. Os metadados de saída distinguem os candidatos extraídos, os fotogramas utilizados com êxito e os duplicados visuais descartados.

Uma parte de vídeo explicitamente marcada pode solicitar uma folha de contactos com marcas temporais. A ponte cria uma grelha JPEG com, no máximo, 4 colunas e 16 fotogramas. Cada célula de 512 píxeis inscreve a marca temporal da respetiva origem numa faixa inferior de elevado contraste, enquanto as mesmas marcas temporais permanecem nos metadados textuais para associação e auditoria posteriores. O JPEG completo permanece limitado a 32 MiB. Se o `sharp` não conseguir descodificar ou compor a grelha, a ponte reverte para os fotogramas JPEG individuais; uma interrupção pelo cliente continua a propagar-se através da operação da folha.

A evidência para promoção é deliberadamente separada do microbenchmark de composição sintética. `scripts/perf/video-bridge-contact-sheet-eval.ts` define um harness A/B com esquema versionado para modelos de visão reais compatíveis com a OpenAI. Mede os tokens comunicados pelo fornecedor, a latência total de ponta a ponta (incluindo a composição da folha), o número de chamadas ao modelo e a retenção de factos definida pelo manifesto. As respostas em bruto do modelo não são gravadas no relatório; apenas são retidos os resumos SHA-256 e os IDs dos factos correspondentes. O harness não efetua nenhuma chamada de rede nem a modelos pagos, a menos que `--execute-real` seja especificado e `--model`, `OMNIROUTE_BASE_URL` e `OMNIROUTE_API_KEY` estejam configurados. Sem essa execução real explícita, o respetivo veredito legível por máquina permanece `HOLD`; as medições sintéticas da carga útil/contagem de chamadas, por si só, não constituem evidência para promoção.

Os chamadores podem anexar um array opcional `transcript.cues` a uma parte de vídeo suportada quando já possuírem texto alinhado. Cada indicação tem de incluir `text`, um intervalo finito `start`/`end` dentro da duração apurada e um `source` incluído na lista de permissões (`client`, `embedded` ou `audio-bridge`); `confidence` assume o valor predefinido `1` e tem de permanecer entre `0` e `1`. As indicações exatamente duplicadas são consolidadas. O OmniRoute nunca inicia uma transcrição a partir destes metadados: as indicações validadas são copiadas para o resultado descrito, juntamente com a origem, a confiança e o intervalo, e são apresentadas como observações não fidedignas juntamente com as legendas dos fotogramas. Texto inválido, fora do intervalo ou sem proveniência é rejeitado em vez de ser misturado no fluxo de legendas. Atualmente, o campo `source` é declarado pelo chamador e não verificado pelo servidor: o OmniRoute garante que o valor é uma das três cadeias permitidas, mas ainda não confirma criptograficamente que um rótulo `embedded` ou `audio-bridge` teve efetivamente origem numa extração controlada pelo servidor. Trate `source` como uma indicação não fidedigna até essa verificação ser implementada; não baseie decisões de autorização nesse campo.

Um autor de chamada avançado pode fornecer uma faixa `audioTranscript` já autorizada
para o mesmo vídeo. O ponto de fusão executa as observações visuais e de áudio com
um único prazo e sinal de cancelamento, ordena-as numa linha temporal comum, elimina
duplicados exatos e comunica um resultado parcial quando apenas um dos lados é
bem-sucedido. Um `audioTranscript` inválido degrada-se para esse resultado parcial — a
descrição visual é mantida e o ramo de áudio regista um código de falha sanitizado —
em vez de provocar a falha de todo o vídeo. A disponibilidade por ramo, o indicador
de resultado parcial e os códigos de falha sanitizados são preservados no resultado
descrito, nos metadados das proteções (`audioFusionRuns`/`audioFusionPartials`/
`audioFusionFailureCodes`), nos metadados da cache de resultados e nos contadores de
fusão da ponte. O caminho predefinido do Video Bridge não invoca conversão de voz
em texto nem transfere uma segunda cópia do conteúdo multimédia; sem essa faixa
explícita, permanece apenas com vídeo.

**Retenção de transcrições (#12150 P1).** Isto aplica-se automaticamente sempre que o
Video Bridge (que é, por si só, opcional) renderiza uma indicação de transcrição — não
existe um indicador de retenção separado. Quando um pedido renderiza qualquer
indicação de transcrição (um `transcript` declarado pelo autor da chamada ou um
`audioTranscript` fundido), a proteção marca-o como `videoBridgeObserved` e produz
uma cópia expurgada da descrição do vídeo — uma renderização idêntica na qual o
corpo de texto livre de cada indicação é substituído por
`[redacted-video-transcript]`, criada através da substituição do campo estruturado da
indicação antes de a cadeia ser composta (nunca através da análise do texto
linearizado, pelo que nenhum conteúdo da indicação — hostil ou normal, incluindo
corpos que contenham `]`, como `[inaudible]`/`[music]` — pode sobreviver). O corpo
persistido do pedido no registo de chamadas substitui cada parte de texto derivada
do vídeo por essa cópia expurgada, fazendo a correspondência por igualdade de
conteúdo; a âncora `fullText` é relida a partir da carga útil final da proteção
anterior à chamada, para que a correspondência continue a ser bem-sucedida depois
de proteções posteriores na cadeia (os mascaradores de PII e credenciais, com
prioridades 10/95) reescreverem o texto da descrição no local e depois de a injeção
do pedido de sistema, da transferência e da memória remodelar a matriz de mensagens.
O corpo enviado a montante para o modelo não é alterado. Um pedido observado também
não preenche qualquer Memória duradoura (é ignorada tanto a extração derivada do
pedido como a derivada da resposta), pelo que a própria resposta do modelo não pode
repetir o texto da transcrição na Memória.

Superfícies de retenção ainda em aberto, acompanhadas para seguimento (**P2**, #12430):
o instantâneo bruto do pedido do cliente anterior à proteção no artefacto de registo
detalhado; a continuação de `previous_response_id` com falha segura; envios internos
de pedidos derivados que incorporam a transcrição num pedido de cadeia sintetizado
(fases do pipeline, transferência de contexto); e o corpo da resposta/a cópia na cache
semântica de uma resposta do modelo que cite a transcrição. Estas são superfícies
brutas/de classe de resposta ou opcionais fora do âmbito de corpo persistido do
pedido + Memória de P1.

O ciclo de vida interno de `/api/modality-bridge/video/drilldown` é um substrato de
cache separado, autenticado por token/loopback. Cada operação também requer um ID de
principal opaco canónico. Antes de um autor de chamada de produção ser ativado, este
tem de derivar esse ID do inquilino autenticado e nunca pode encaminhar um valor
selecionado pelo cliente. As chaves da cache associam esse principal a IDs canónicos
de sessão e de referência de vídeo, armazenam apenas as respetivas chaves derivadas
por SHA-256 e restringem tanto as leituras como a eliminação ao mesmo principal. A
cache armazena, no máximo, 16 fotogramas JPEG derivados por entrada, expira-os após
dez minutos e suporta leituras limitadas por `start`/`end` ou a eliminação explícita
da sessão.

Cada principal está limitado a 16 entradas e 64 MiB de dados JPEG canónicos. Estes
limites são independentes do teto global de 64 entradas/256 MiB: a pressão da quota
do principal expulsa apenas as entradas usadas menos recentemente desse principal
antes de ser considerada a expulsão LRU global. As entradas expiradas são removidas
tanto da contabilização do principal como da global durante a atividade da cache,
enquanto o cancelamento e a falha de validação não confirmam uma substituição
parcial.

A cache rejeita Base64 não canónico, enchimento excessivo, conteúdo multimédia que não
seja JPEG, JPEGs malformados ou truncados e JPEGs que produzam um aviso durante uma
descodificação limitada da imagem completa com `sharp`. Cada imagem aceite é
recodificada como um JPEG canónico, a largura e a altura são derivadas dos bytes
descodificados em vez de se confiar nos campos do autor da chamada e quaisquer bytes
poliglotas no final são descartados em vez de serem retidos. Apenas o buffer comprimido
canónico e limitado é contabilizado em ambas as quotas. O limite de transmissão JSON
inclui a sobrecarga do Base64 para o teto de 32 MiB de entrada descodificada. Cada
derivação armazenada regista o respetivo formato/resolução JPEG validados, a política
de amostragem, a versão da derivação, a hora de criação, o hash do conteúdo calculado
pelo servidor e a referência ascendente com hash, juntamente com o hash do conteúdo
ascendente fornecido pelo autor da chamada fidedigno. O cancelamento é verificado
entre as fases assíncronas de descodificação/hash antes da confirmação atómica na
cache.

Este lote ainda não liga um produtor de produção à rota nem fornece seleção de
variantes com várias resoluções. Por conseguinte, o caminho transparente de pedidos
do Video Bridge não incorre em trabalho adicional, enquanto a derivação de principal
associada ao inquilino e o ciclo de vida completo de várias resoluções FU-08 continuam
a ser trabalho de seguimento explícito, em vez de serem documentados como
comportamento concluído.

Os fotogramas são legendados sequencialmente com o modelo de Vídeo configurado. Uma substituição de Vídeo vazia herda a definição de Visão; se ambas estiverem vazias, o router automático de Visão seleciona o modelo efetivo com capacidades de visão. As legendas geradas com êxito substituem a parte original por um prefixo estável `[Video description:`, que também identifica o texto como uma observação não fidedigna derivada de conteúdos multimédia e indica aos modelos a jusante que não devem seguir instruções encontradas nesses conteúdos. As chaves da cache de legendas de fotogramas incluem os bytes JPEG, o pedido, o carimbo de data/hora e o modelo efetivo; apenas as legendas geradas com êxito são colocadas em cache. As entradas de cache mantêm o modelo produtor que efetivamente teve êxito, incluindo um modelo de recurso; a ponte comunica `mixed` quando fotogramas diferentes foram produzidos por modelos diferentes. Um resultado obtido da cache reutiliza essa identidade do produtor, em vez de a reclassificar como o plano de encaminhamento solicitado. A cache de resultados do vídeo completo utiliza como chave todos os dados de entrada que alteram o resultado — pedido, modelo efetivo, política de amostragem, número de fotogramas, modo de análise semântica, impressão digital SHA-256 da sugestão de foco normalizada, janela de foco, `transcript`, `audioTranscript` e o sinalizador de folha de contactos — pelo que a alteração de qualquer uma dessas dimensões resulta numa falha de cache, nunca numa reutilização de dados obsoletos. A versão, o limiar e o número limitado de fotogramas candidatos da política de desduplicação visual também são explícitos na chave e nos metadados da cache de resultados; por conseguinte, uma alteração da política não pode reutilizar uma descrição obsoleta do vídeo completo. Os metadados v4 da cache de resultados mantêm o modo e a impressão digital, nunca a tarefa original do utilizador. Os metadados do mecanismo de proteção comunicam os modos de análise solicitado e efetivo; um modo `focused` solicitado sem texto utilizável do utilizador é comunicado como sendo efetivamente `full`.

O mecanismo de proteção extrai todas as partes de vídeo suportadas, mas não descreve mais do que `modalityBridgeVideoMaxVideos`. Para um destino que comprovadamente tenha `supportsVideo === false`, os vídeos cuja análise tenha falhado ou que excedam o limite tornam-se marcadores de texto seguros e explícitos, para que nenhum vídeo em bruto subsista. Quando a capacidade é desconhecida, essas partes permanecem inalteradas. Os destinos com `supportsVideo === true` ignoram a ponte. O sinal de cancelamento do pedido do cliente propaga-se através da transferência, fila do broker, subprocessos e chamadas de geração de legendas; os cancelamentos interrompem o processamento entre vídeos e nunca permitem, em caso de falha, a passagem dos conteúdos multimédia em bruto.

As definições de runtime são armazenadas na BD e validadas pelo Zod:

| Chave                               | Predefinição | Intervalo/comportamento                                                                                            |
| ----------------------------------- | ------------ | ------------------------------------------------------------------------------------------------------------------ |
| `modalityBridgeVideoEnabled`        | `false`      | Runtime opcional, adesão voluntária                                                                                |
| `modalityBridgeVideoAnalysisMode`   | `"full"`     | `full` preserva legendas genéricas; `focused` utiliza contexto limitado e não fidedigno do utilizador mais recente |
| `modalityBridgeVideoModel`          | `""`         | Herda o modelo da Ponte de Visão                                                                                   |
| `modalityBridgeVideoFrameCount`     | `8`          | 1–16                                                                                                               |
| `modalityBridgeVideoSamplingPolicy` | `"uniform"`  | `uniform`, `scene_aware` ou `segment_aware` proporcional; uma falha do detetor recorre a `uniform`                 |
| `modalityBridgeVideoMaxVideos`      | `1`          | 1–4                                                                                                                |
| `modalityBridgeVideoTimeout`        | `120000`     | 1000–120000 ms                                                                                                     |

Os valores de tempo limite de Vídeo legados e persistidos superiores a 120 segundos são limitados ao prazo do broker; novas gravações de definições acima desse limite são rejeitadas. `GET /api/modality-bridge/video/runtime` exige uma localização de loopback fidedigna e autenticada por carimbo antes da autenticação ou da verificação do runtime e, em seguida, exige autenticação de gestão. Devolve apenas `available`, versões FFmpeg/ffprobe sanitizadas e um motivo fixo quando o runtime está indisponível. O endpoint interno de extração não é uma API pública de carregamento: a saturação da fila devolve `503` mais `Retry-After`, uma desconexão do autor da chamada devolve `499` e o prazo fixo do broker devolve `504`. As respostas convertidas adicionam `video->text;model=<visionModel>;parts=<videos>` ao cabeçalho central `x-omniroute-modality-bridge`, sem remover os segmentos de Visão ou Áudio.

### Mascarador de PII (`piiMasker.ts`)

É executado em **ambas** as fases.

- **`preCall`** clona o payload, percorre `system`, `messages`, `input` e
  `prompt` (incluindo itens que sejam cadeias de texto simples) e aplica `processPII()` (de
  `@/shared/utils/inputSanitizer`) aos campos de cadeia de texto `content`/`text`. Quando
  `PII_REDACTION_ENABLED=true`, a PII detetada é ocultada no payload
  de saída. Isto é independente de `INPUT_SANITIZER_MODE` (que controla apenas
  a política de injeção de pedidos). Quando a ocultação está desativada, a chamada regista as
  contagens de deteções sem reescrever o conteúdo.
- **`postCall`** clona em profundidade a resposta, executa `sanitizePIIResponse()` juntamente com
  o mascarador do formato da API Responses (`maskResponsesOutput` — abrange
  `output_text` e `output[].content[].text`). Se ocorrer qualquer ocultação, a
  resposta modificada substitui a original.

O mecanismo de proteção nunca bloqueia; apenas anota (`meta.detections`,
`meta.redacted`) ou reescreve.

### Injeção de Pedidos (`promptInjection.ts`)

Deteta estruturas adversárias em conteúdo fornecido pelo utilizador e aplica a
política configurada. O comportamento é determinado por variáveis de ambiente e opções do
construtor:

| Definição          | Variável de ambiente                                                                                 | Predefinição | Efeito                                                                                                                                                                                                    |
| ------------------ | ---------------------------------------------------------------------------------------------------- | ------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Ativado            | `INPUT_SANITIZER_ENABLED`                                                                            | `true`       | Quando é `false`, o mecanismo de proteção termina antecipadamente.                                                                                                                                        |
| Modo               | `INJECTION_GUARD_MODE` / `INPUT_SANITIZER_MODE`                                                      | `warn`       | Política de injeção: `block`, `warn` ou `log`. (`redact` é aceite para retrocompatibilidade, mas **não** remove texto de injeção; a reescrita de PII no pedido é controlada por `PII_REDACTION_ENABLED`.) |
| Limiar de bloqueio | opção `blockThreshold` / `INPUT_SANITIZER_BLOCK_THRESHOLD` (alias `INJECTION_GUARD_BLOCK_THRESHOLD`) | `high`       | Severidade mínima necessária para bloquear. Com a predefinição, a severidade média destina-se apenas à observação.                                                                                        |

**Precedência do modo** (`getMode`): `options.mode` do chamador →
**substituição do sinalizador de funcionalidade da BD** `INJECTION_GUARD_MODE` (Painel → Definições →
Sinalizadores de Funcionalidades) → variável de ambiente `INJECTION_GUARD_MODE` → variável de ambiente `INPUT_SANITIZER_MODE` →
`warn`. Por conseguinte, uma substituição no painel tem precedência sobre as variáveis de
ambiente, pelo que a interface de Sinalizadores de Funcionalidades controla o mecanismo de proteção
em execução em tempo real (sem reiniciar). A leitura da BD é feita de forma segura em caso de falha:
se ocorrer um erro, o mecanismo de proteção recorre ao comportamento baseado nas variáveis de ambiente e, quando não está
definida nenhuma substituição, o comportamento é idêntico à resolução baseada apenas nas variáveis de ambiente.

Fontes de deteção:

1. `sanitizeRequest()` de `@/shared/utils/inputSanitizer` (conjunto partilhado de detetores
   utilizado noutros pontos do fluxo de processamento).
2. `DEFAULT_GUARD_PATTERNS` incorporados (atualmente `system_override_inline` e
   `markdown_system_block`, ambos com severidade `high`).
3. `customPatterns` opcionais transmitidos através das opções do construtor (cadeias de caracteres, expressões regulares
   ou registos `{ name, pattern, severity }`).

Quando `mode === "block"` **e** pelo menos uma deteção atinge o limiar de
severidade, `preCall` devolve `{ block: true, message: "Request rejected:
suspicious content detected" }`. Nos modos `warn`/`log`, o mecanismo de proteção regista o evento, mas
permite a chamada. A função auxiliar partilhada `evaluatePromptInjection()` também é exportada
para os chamadores que necessitem de avaliar prompts sem passar pelo registo.

**Limite de análise (v3.8.20):** o detetor inspeciona apenas os **primeiros 16 KB** do
texto combinado do prompt — `MAX_INJECTION_SCAN_BYTES = 16 * 1024` (16 384 bytes) em
`src/shared/utils/inputSanitizer.ts`. Tanto `detectInjection()` como
`evaluatePromptInjection()` executam `slice(0, MAX_INJECTION_SCAN_BYTES)` antes de percorrerem
os padrões. As diretivas de injeção encontram-se perto do início de uma entrada, pelo que isto
limita a utilização da CPU/GC por expressões regulares em cargas úteis com várias centenas de KB sem enfraquecer a deteção (cf.
#3932, #4041).

### Mascarador de Credenciais (`credentialMasker.ts`)

É executado em **ambas** as fases, em último lugar na cadeia predefinida (prioridade `95`). Oculta
padrões conhecidos de chaves de API/tokens secretos na carga útil de saída (conteúdo das
mensagens, argumentos de chamadas de ferramentas, resultados de ferramentas) **e** na resposta do fornecedor, para que uma
credencial colada num prompt (ou devolvida por um resultado de ferramenta) não seja divulgada
ao fornecedor a montante nem devolvida ao cliente.

- **Apenas mediante ativação explícita**, seguindo a mesma convenção da ocultação de PII (próxima da Regra Rígida #20):
  está desativado, exceto se `settings.credentialRedactionEnabled === true` **ou**
  `CREDENTIAL_REDACTION_ENABLED=true`. Quando está desativado, o mecanismo de proteção não realiza qualquer operação —
  nunca bloqueia nem reescreve.
- `redactCredentials()` percorre toda a árvore da carga útil/resposta (`walkValue()`,
  protegida contra poluição de protótipos e contra ciclos através de `WeakSet`) e substitui as correspondências por
  um marcador de posição `[REDACTED:<type>]`, clonando apenas os ramos que foram efetivamente
  alterados.
- `CREDENTIAL_PATTERNS` abrange chaves de fornecedores de LLM (OpenAI, OpenAI-proj,
  Anthropic, Google, Hugging Face, Replicate), tokens de VCS/SaaS (GitHub, Slack,
  Linear, Notion, npm, Postman, Discord), chaves de pagamento (Stripe, Square), chaves de
  serviços na nuvem (chave de acesso AWS, Twilio, SendGrid, Mailgun), chaves privadas/JWTs,
  cadeias de ligação que contenham credenciais (`mongodb://user:pass@...`, etc.) e
  um padrão genérico para valores dos cabeçalhos `Authorization`/`x-api-key`/`api-key`/`apikey`.
  As chaves com formato de cabeçalho (`authorization`, `x-api-key`, `api-key`,
  `apikey`) são ocultadas estruturalmente (apenas o valor, preservando o prefixo do esquema, como
  `Bearer `/`Basic `), em vez de através da expressão regular genérica de texto.
- O mecanismo de proteção nunca bloqueia; apenas reescreve (`modifiedPayload` /
  `modifiedResponse`) e adiciona anotações (`meta.credentialsRedacted`, `meta.count`).

Proteção contra regressões: `tests/unit/credential-masker-guardrail.test.ts`.

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
