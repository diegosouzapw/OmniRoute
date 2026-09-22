# Guardrails (Português (Brasil))

🌐 **Languages:** 🇺🇸 [English](../../../../security/GUARDRAILS.md) · 🇪🇹 [am](../../../am/docs/security/GUARDRAILS.md) · 🇸🇦 [ar](../../../ar/docs/security/GUARDRAILS.md) · 🇦🇿 [az](../../../az/docs/security/GUARDRAILS.md) · 🇧🇬 [bg](../../../bg/docs/security/GUARDRAILS.md) · 🇧🇩 [bn](../../../bn/docs/security/GUARDRAILS.md) · 🇨🇿 [cs](../../../cs/docs/security/GUARDRAILS.md) · 🇩🇰 [da](../../../da/docs/security/GUARDRAILS.md) · 🇩🇪 [de](../../../de/docs/security/GUARDRAILS.md) · 🇬🇷 [el](../../../el/docs/security/GUARDRAILS.md) · 🇪🇸 [es](../../../es/docs/security/GUARDRAILS.md) · 🇪🇪 [et](../../../et/docs/security/GUARDRAILS.md) · 🇮🇷 [fa](../../../fa/docs/security/GUARDRAILS.md) · 🇫🇮 [fi](../../../fi/docs/security/GUARDRAILS.md) · 🇫🇷 [fr](../../../fr/docs/security/GUARDRAILS.md) · 🇮🇪 [ga](../../../ga/docs/security/GUARDRAILS.md) · 🇮🇳 [gu](../../../gu/docs/security/GUARDRAILS.md) · 🇳🇬 [ha](../../../ha/docs/security/GUARDRAILS.md) · 🇮🇱 [he](../../../he/docs/security/GUARDRAILS.md) · 🇮🇳 [hi](../../../hi/docs/security/GUARDRAILS.md) · 🇭🇷 [hr](../../../hr/docs/security/GUARDRAILS.md) · 🇭🇺 [hu](../../../hu/docs/security/GUARDRAILS.md) · 🇦🇲 [hy](../../../hy/docs/security/GUARDRAILS.md) · 🇮🇩 [id](../../../id/docs/security/GUARDRAILS.md) · 🇳🇬 [ig](../../../ig/docs/security/GUARDRAILS.md) · 🇮🇹 [it](../../../it/docs/security/GUARDRAILS.md) · 🇯🇵 [ja](../../../ja/docs/security/GUARDRAILS.md) · 🇬🇪 [ka](../../../ka/docs/security/GUARDRAILS.md) · 🇰🇭 [km](../../../km/docs/security/GUARDRAILS.md) · 🇮🇳 [kn](../../../kn/docs/security/GUARDRAILS.md) · 🇰🇷 [ko](../../../ko/docs/security/GUARDRAILS.md) · 🇱🇹 [lt](../../../lt/docs/security/GUARDRAILS.md) · 🇱🇻 [lv](../../../lv/docs/security/GUARDRAILS.md) · 🇮🇳 [ml](../../../ml/docs/security/GUARDRAILS.md) · 🇮🇳 [mr](../../../mr/docs/security/GUARDRAILS.md) · 🇲🇾 [ms](../../../ms/docs/security/GUARDRAILS.md) · 🇲🇹 [mt](../../../mt/docs/security/GUARDRAILS.md) · 🇲🇲 [my](../../../my/docs/security/GUARDRAILS.md) · 🇳🇵 [ne](../../../ne/docs/security/GUARDRAILS.md) · 🇳🇱 [nl](../../../nl/docs/security/GUARDRAILS.md) · 🇳🇴 [no](../../../no/docs/security/GUARDRAILS.md) · 🇮🇳 [or](../../../or/docs/security/GUARDRAILS.md) · 🇮🇳 [pa](../../../pa/docs/security/GUARDRAILS.md) · 🇵🇭 [phi](../../../phi/docs/security/GUARDRAILS.md) · 🇵🇱 [pl](../../../pl/docs/security/GUARDRAILS.md) · 🇵🇹 [pt](../../../pt/docs/security/GUARDRAILS.md) · 🇷🇴 [ro](../../../ro/docs/security/GUARDRAILS.md) · 🇷🇺 [ru](../../../ru/docs/security/GUARDRAILS.md) · 🇱🇰 [si](../../../si/docs/security/GUARDRAILS.md) · 🇸🇰 [sk](../../../sk/docs/security/GUARDRAILS.md) · 🇸🇮 [sl](../../../sl/docs/security/GUARDRAILS.md) · 🇷🇸 [sr](../../../sr/docs/security/GUARDRAILS.md) · 🇸🇪 [sv](../../../sv/docs/security/GUARDRAILS.md) · 🇰🇪 [sw](../../../sw/docs/security/GUARDRAILS.md) · 🇮🇳 [ta](../../../ta/docs/security/GUARDRAILS.md) · 🇮🇳 [te](../../../te/docs/security/GUARDRAILS.md) · 🇹🇭 [th](../../../th/docs/security/GUARDRAILS.md) · 🇹🇷 [tr](../../../tr/docs/security/GUARDRAILS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/GUARDRAILS.md) · 🇵🇰 [ur](../../../ur/docs/security/GUARDRAILS.md) · 🇺🇿 [uz](../../../uz/docs/security/GUARDRAILS.md) · 🇻🇳 [vi](../../../vi/docs/security/GUARDRAILS.md) · 🇳🇬 [yo](../../../yo/docs/security/GUARDRAILS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/GUARDRAILS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/GUARDRAILS.md)

---

> **Fonte da verdade:** `src/lib/guardrails/`
> **Última atualização:** 2026-08-29 — v3.8.51 (a proveniência da transcrição do Video Bridge é declarada pelo chamador,
> ainda não verificada pelo servidor — esclarecido conforme #11661)

Os guardrails aplicam segurança, políticas e transformações de conteúdo no limite
entre o OmniRoute e os provedores upstream. Cada guardrail pode inspecionar (e,
opcionalmente, rejeitar, transformar ou anotar) os payloads das solicitações (`preCall`) e
as respostas upstream (`postCall`).

O sistema é **fail-open**: se um guardrail lançar um erro durante a execução, o registro
registra o erro e continua com o próximo guardrail, em vez de causar a falha da
solicitação. O bloqueio é uma decisão explícita (`block: true`), nunca um acidente.

## Guardrails integrados

O registro carrega automaticamente seis guardrails em ordem de prioridade durante a importação
(consulte `registry.ts` → `registerDefaultGuardrails()`):

| Prioridade | Nome                | Estágio(s)     | Arquivo               |
| ---------- | ------------------- | -------------- | --------------------- |
| `5`        | `vision-bridge`     | `preCall`      | `visionBridge.ts`     |
| `6`        | `audio-bridge`      | `preCall`      | `audioBridge.ts`      |
| `7`        | `video-bridge`      | `preCall`      | `videoBridge.ts`      |
| `10`       | `pii-masker`        | `pre` + `post` | `piiMasker.ts`        |
| `20`       | `prompt-injection`  | `preCall`      | `promptInjection.ts`  |
| `95`       | `credential-masker` | `pre` + `post` | `credentialMasker.ts` |

Números de prioridade menores são executados **primeiro**.

### Vision Bridge (`visionBridge.ts`) — Modality Bridge PR-1

Intercepta solicitações que contêm imagens destinadas a **modelos sem suporte a visão** e
redireciona a solicitação inteira para um modelo com suporte a visão ou substitui as partes
de imagem por descrições em texto produzidas por um modelo de visão configurável antes
da chamada upstream. Isso permite que provedores somente de texto processem
payloads multimodais de forma transparente.

Fluxo:

1. Ignora se o modelo de destino já tiver suporte a visão (a menos que apareça na
   lista de bridge forçado `isVisionBridgeForcedModel`).
2. Extrai as partes de imagem por meio de `extractImageParts(messages)`
   (`visionBridgeHelpers.ts`), que delega ao **detector unificado de mídia**
   `detectMediaParts()` em `open-sse/utils/mediaParts.ts` — a
   única fonte da verdade compartilhada com o filtro de compatibilidade de combo.
   A extração é limitada por uma lista de permissões às partes de nível superior com os formatos
   que `replaceImageParts` consegue reinserir (o contrato extract↔replace): `image_url`
   da OpenAI, `source.type:"base64"` em base64 da Anthropic, `source.type:"url"`
   da Anthropic e `input_image` da Responses API. Ocorrências aninhadas e
   formatos que contêm apenas indicadores são material do filtro de combo e nunca são extraídos.
   Ignora se nenhum for encontrado.
3. Resolve a configuração de runtime por meio de `resolveVisionBridgeRuntimeSettings()`
   (`src/shared/constants/modalityBridgeDefaults.ts`): as novas chaves de configuração
   `modalityBridge*` têm precedência; as chaves legadas `visionBridge*` permanecem como
   **fallback por um ciclo** (janela de rollback). Ignora antes de qualquer varredura de mídia
   quando o bridge está desabilitado.
4. O seletor de modo (`modalityBridgeVisionMode`, consulte a tabela abaixo) decide entre
   redirecionar e descrever. O redirecionamento retorna `modifiedPayload` apenas com `model`
   substituído, além dos metadados `{ rerouted, fromModel, toModel, imagesKept }`.
5. Caminho de descrição: limita as imagens a `maxImages`, compõe o prompt sensível à tarefa,
   consulta o cache de descrições, chama o modelo de visão **em paralelo**
   (`Promise.allSettled`) e insere partes de texto `[Image N]: <description>` no
   lugar delas. Uma descrição com falha resulta em `null`, e a parte de imagem original é
   **preservada** (#4012) — exceto no caminho de descrição de combo quando todas as
   descrições falharam, caso em que um upstream confirmado como sem suporte a visão recebe um
   stub `(unavailable — no vision-capable provider connected)` (#8430).
6. Retorna `modifiedPayload` + metadados (`imagesProcessed`, `descriptions`,
   `processingTimeMs`, `visionModel`).

#### Seletor de modo (`modalityBridgeVisionMode`)

| Modo       | Padrão | Comportamento                                                                                                                                                                                                                                                                                                                         |
| ---------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `auto`     | ✔      | Heurística legada, inalterada (#6640/#7204): modelos que não são combo/`auto/` são redirecionados para o melhor modelo de visão, a menos que o modelo original já tenha credenciais utilizáveis (nesse caso, descreve); destinos combo sempre descrevem.                                                                              |
| `describe` |        | Sempre descreve — o bloco de redirecionamento é totalmente ignorado; o modelo escolhido pelo usuário sempre responde.                                                                                                                                                                                                                 |
| `reroute`  |        | Força o redirecionamento: a proteção para manter o modelo com credenciais é ignorada. A proteção de credenciais do **destino** do redirecionamento ainda se aplica — quando não há um destino de visão utilizável, a solicitação segue para a descrição, para que imagens brutas nunca cheguem a um backend somente de texto (#8430). |

Os modos forçados executam um curto-circuito **antes** da heurística automática; o comportamento
de `auto` é idêntico byte a byte ao guardrail anterior ao PR-1.

#### Prompt de descrição sensível à tarefa (`modalityBridgeVisionTaskAware`)

O padrão é **true**. `composeVisionPrompt()` (`visionBridgeHelpers.ts`) acrescenta
o texto da **última mensagem do usuário** (truncado em 500 caracteres) ao prompt-base
de descrição, direcionando a descrição para o que o usuário realmente solicitou
(padrão codex-vision-proxy) e pedindo ao modelo de visão que transcreva o texto visível.
Com a flag desativada — ou sem texto do usuário — o prompt-base é usado sem alterações.

O self-loop de descrição da própria solicitação compatível com OpenAI (`callVisionModelSingle()`
em `visionBridgeHelpers.ts`) sempre solicita `image_url.detail: "high"` —
incondicionalmente, para todos os chamadores/provedores, sem depender de nenhum sinal do cliente.
A amostragem com baixo nível de detalhes reduz a precisão do OCR justamente na tarefa de
transcrição de texto solicitada por este prompt; portanto, a própria chamada de descrição sempre
solicita alto nível de detalhes, independentemente do nível de detalhes usado pela solicitação
original recebida. Isso afeta apenas o corpo da solicitação interna de descrição; não altera como
o OmniRoute encaminha o `image_url.detail` do próprio chamador na solicitação principal —
esse padrão é aplicado separadamente, e apenas para clientes OpenCode detectados, em
`defaultImageDetail()` (`open-sse/handlers/chatCore/upstreamBody.ts`). A ramificação de formato
de transmissão da Anthropic no self-loop de descrição não tem um campo `detail` e não é
afetada por nenhum dos padrões.

#### Limite da saída de descrição (`modalityBridgeVisionMaxChars`)

| Chave                          | Padrão | Intervalo        |
| ------------------------------ | ------ | ---------------- |
| `modalityBridgeVisionMaxChars` | `0`    | `0` ou 100–50000 |

`0` (padrão) significa **sem limite** — a descrição retornada por
`callVisionModel()` é repassada sem modificações, preservando o comportamento
existente. Qualquer valor no intervalo de 100–50000 trunca a descrição com um
sufixo `…` antes que ela seja inserida novamente como `[Image N]: <description>`
(`VisionBridgeGuardrail.preCall()` em `src/lib/guardrails/visionBridge.ts`).
Aumente esse valor para tarefas de OCR com muitos detalhes, nas quais o modelo
subsequente precisa da transcrição completa; reduza-o para limitar o uso de tokens
em modelos de visão muito prolixos. O campo do painel fica no painel Avançado da
aba Visão (`modality-bridge-max-chars` em `ModalityBridgeVisionTab.tsx`) e eleva
qualquer valor entre 1 e 99 para o mínimo de 100, mantendo um `0` explícito
inalterado — `0` é um valor Zod válido por si só
(`z.union([z.literal(0), z.number().int().min(100).max(50000)])`), e não apenas
o padrão de "não definido".

#### Cache de descrição (`modalityBridge/bridgeCache.ts`)

Cache LRU + TTL em memória para saídas de descrição, compartilhado em todo o processo.
Chave = `sha256(imageRef + composedPrompt + configuredBridgeModel)` com
enquadramento por prefixo de comprimento (sem colisões nos limites dos campos). O componente
de modelo é o modelo de bridge **configurado**, e não o modelo que efetivamente respondeu —
`callVisionModel` pode realizar fallback internamente, e gerar chaves por tentativa
fragmentaria o cache. Descrições com falha nunca são armazenadas em cache. Configurações:

| Chave                           | Padrão | Intervalo |
| ------------------------------- | ------ | --------- |
| `modalityBridgeCacheEnabled`    | `true` | —         |
| `modalityBridgeCacheTtlMinutes` | `60`   | 1–1440    |
| `modalityBridgeCacheMaxEntries` | `200`  | 10–5000   |

#### Normalização de imagens remotas (self-loop de descrição/busca em base64)

Quando a bridge busca uma imagem **remota** por conta própria — a autochamada de descrição
da Anthropic e a conversão para base64 no formato de transmissão do Claude
(`ensureBase64ImagesForClaudeWire`), ambas por meio de
`fetchRemoteImageAsDataUri()` em `visionBridgeHelpers.ts` — o URI de dados resultante
é processado por `normalizeDataUri()`
(`open-sse/utils/imageNormalize.ts`) antes de ser incorporado à solicitação do modelo
de visão. Imagens grandes demais são reduzidas para uma **borda longa de 2048px**
(correspondendo ao limite de redimensionamento que OpenAI/Anthropic já aplicam no servidor),
o que reduz os bytes enviados e a latência sem alterar o que o modelo de visão vê. O
redimensionamento usa `sharp`, carregado por importação dinâmica: em uma plataforma na qual
seu binário nativo não consiga ser carregado, `normalizeDataUri()` **nunca lança uma exceção**
— ele recorre ao repasse dos bytes originais, de modo que o caminho de descrição/conversão
para base64 continue sempre funcionando. Bytes que não representam uma imagem (uma busca
que não retornou uma imagem decodificável) também são repassados sem alterações. Essa
normalização é restrita às imagens que a bridge busca para sua própria autochamada — ela
nunca é aplicada ao payload bruto repassado pelo chamador, em conformidade com o princípio
de mutação somente mediante adesão (Regra Rígida nº 20).

#### Esquema de configurações + migração

As novas chaves `modalityBridge*` são validadas pelo Zod em `updateSettingsSchema`
(`src/shared/validation/settingsSchemas.ts`): `modalityBridgeVisionEnabled`,
`modalityBridgeVisionMode`, `modalityBridgeVisionModel`,
`modalityBridgeVisionTaskAware`, `modalityBridgeVisionPrompt`,
`modalityBridgeVisionTimeout`, `modalityBridgeVisionMaxImages`,
`modalityBridgeVisionMaxChars`, o trio `modalityBridgeCache*` e o
grupo `modalityBridgeAudio*` usado pela Bridge de Áudio. A migração
`141_modality_bridge_settings.sql` copia os valores legados existentes de
`visionBridge*` para as novas chaves correspondentes (é idempotente e nunca sobrescreve
um valor `modalityBridge*` definido pelo operador); as chaves legadas continuam sendo
aceitas como fallback de leitura durante um ciclo de lançamento.

#### Cabeçalho de transparência + estatísticas

As respostas transformadas por descrição incluem
`x-omniroute-modality-bridge: image->text;model=<visionModel>;parts=<n>`
(criado por `buildModalityBridgeHeader()` em `modalityBridge/bridgeStats.ts`,
aplicado por `withModalityBridgeHeader()` em `src/sse/handlers/chatHelpers.ts`).
Solicitações redirecionadas **não** recebem cabeçalho — o payload não foi alterado e a troca
de modelo já está visível no campo `model` do corpo da resposta.

`GET /api/modality-bridge/stats` (autenticação de gerenciamento, mesmo nível de
`GET /api/settings`) retorna os contadores em memória por modalidade
`{ attempts, successes, bridged, cacheHits, failures, totalLatencyMs,
latencySamples, averageLatencyMs, lastUsedAt }` para `vision`, `audio` e
`video`. `averageLatencyMs` usa `latencySamples`, e não todas as tentativas, como
denominador; uma operação sem medição de tempo não cria artificialmente uma amostra de
zero milissegundos. `bridged` permanece como o alias retrocompatível para conversões
bem-sucedidas; tentativas com falha não o incrementam.
Por definição, os contadores são zerados quando o processo é reiniciado
(telemetria, não contabilidade).

#### Configuração do painel

A página dedicada do dashboard é
`/dashboard/settings/modality-bridge`. Suas abas `Vision`, `Audio` e
`Video`, acessíveis por URL, preservam os parâmetros de consulta ao alternar o valor de `tab`.
A aba Vision disponibiliza ativação, modo, seleção de modelo (incluindo o padrão
automático), prompts orientados à tarefa, limites avançados de tempo limite/imagem/tamanho
da descrição/cache, contadores de execução e uma solicitação de exemplo protegida. A aba
Audio também está ativa: ela disponibiliza ativação, um seletor de modelos exclusivos para
STT com a opção Auto, limites de tempo e duração máxima do clipe, contadores de áudio e
um teste de exemplo com `input_audio`. A aba Video está funcional: ela informa o estado
de execução do FFmpeg/ffprobe — um de quatro estados explícitos da interface (`unknown`
enquanto a verificação está em andamento ou não pôde ser concluída, `restricted` em um
host de dashboard que não seja de loopback, onde a verificação é ignorada no lado do
cliente, `unavailable` após a verificação confirmar a ausência ou `available` com as
versões do FFmpeg/ffprobe) — persiste limites de ativação/modelo/quadros/vídeo/tempo
limite, filtra o seletor de modelos para modelos compatíveis com visão e disponibiliza
contadores de vídeo.

O antigo cartão Vision Bridge nas configurações de IA é um link de compatibilidade para
a nova página; ele não mantém mais uma segunda cópia do formulário. Media Providers
também vincula os fluxos de trabalho de Image-to-Text e Speech-to-Text às abas
correspondentes do Modality Bridge sem remover o playground existente de Speech-to-Text.

**Desvio de admissão do self-loop:** quando a chamada de descrição é roteada pelo
próprio `/v1` self-loop do OmniRoute (modelo de provedor não padrão), a subsolicitação
envia `x-omniroute-admission-bypass: internal` e é autenticada com a credencial de
self-loop resolvida — o sentinela local `sk_omniroute` no modo local ou a chave de
ambiente `OMNIROUTE_API_KEY` / `ROUTER_API_KEY` configurada pelo operador (#1350), para
que implantações com `REQUIRE_API_KEY=true` ainda possam executar a chamada de descrição.
O desvio só é aceito para essas credenciais exatas, portanto clientes externos não podem
usar o cabeçalho para ignorar a admissão.

Os padrões legados ficam em `src/shared/constants/visionBridgeDefaults.ts`; os
novos padrões de modo/orientação à tarefa/cache e o resolvedor de configurações ficam em
`src/shared/constants/modalityBridgeDefaults.ts`. A proteção disponibiliza uma opção
`deps` no construtor para que os testes possam injetar implementações falsas de
`getSettings` e `callVisionModel`.

### Audio Bridge (`audioBridge.ts`) — Modality Bridge PR-3

Intercepta solicitações de chat que contêm áudio antes que elas cheguem a um destino
que não seja reconhecido como capaz de aceitar entrada de áudio. Ela nunca redireciona
a solicitação de chat: as partes de áudio são transcritas pelo endpoint multipart
existente compatível com OpenAI, e o modelo de chat escolhido continua com as
transcrições em texto.

Fluxo:

1. Resolve `supportsAudio` por meio de `getResolvedModelCapabilities()`. Metadados
   explícitos do registro de provedores têm prioridade, seguidos pelos metadados
   estáticos do modelo e, depois, por `modalities_input` sincronizado. Uma lista
   declarada de entradas sem `audio` resulta em `false`; quando não há nenhuma
   evidência de capacidade, o valor permanece `null`. Tanto `false` quanto `null`
   ativam a ponte conservadora, enquanto `true` faz com que ela seja ignorada.
2. Resolve as configurações `modalityBridgeAudio*` e extrai partes de áudio de nível
   superior que podem ser substituídas em todas as mensagens por meio do detector
   compartilhado `detectMediaParts()`. Os formatos de transferência compatíveis são
   `input_audio` e `audio_url` da OpenAI, além de
   `source.media_type: "audio/*"`. Áudios aninhados são detectados para fins de
   roteamento, mas não são removidos pelo caminho de substituição. O trabalho é
   limitado por `modalityBridgeAudioMaxClips`; as partes posteriores permanecem
   inalteradas.
3. Respeita um `provider/model` configurado ou permite que
   `selectAudioBridgeModel()` percorra `AUDIO_TRANSCRIPTION_PROVIDERS` na ordem
   estável do catálogo e selecione o primeiro modelo com uma credencial de provedor
   ativa e utilizável.
4. `callAudioTranscription()` converte áudio base64/data-URI em um `file` multipart
   ou baixa um `audio_url` remoto por meio da proteção de saída exclusiva para
   endereços públicos, com fixação de DNS e um limite de 25 MB. Em seguida, envia o
   arquivo e o modelo selecionado via POST para o self-loop local
   `/v1/audio/transcriptions`, autenticado com `resolveSelfLoopBearer()`. A rota de
   transcrição existente executa a busca normal de credenciais, o tratamento de
   cooldown/limite de taxa e o encaminhamento ao provedor.
5. Chamadas bem-sucedidas substituem suas partes por
   `[Audio N]: <transcript>`. As chamadas são executadas com
   `Promise.allSettled`: uma falha individual preserva a parte de áudio original
   correspondente (contrato #4012). Se todas as chamadas falharem e for comprovado
   que o destino tem `supportsAudio === false`, as partes se tornam
   `[Audio N]: (unavailable — no STT provider connected)` (contrato #8430). Para
   um destino desconhecido (`null`), um resultado em que todas as chamadas falham
   permanece inalterado. Um destino comprovadamente limitado a texto e sem uma
   credencial STT utilizável recebe o mesmo marcador explícito sem que uma chamada
   de rede seja realizada.

As transcrições bem-sucedidas usam o cache LRU/TTL do Modality Bridge compartilhado
em todo o processo. A chave combina a referência de áudio, o rótulo estável da operação
`audio-transcription` e o modelo STT selecionado; falhas nunca são armazenadas em cache.
As tentativas de áudio atualizam os contadores compartilhados `bridged`, `cacheHits`,
`failures` e `lastUsedAt`. As respostas transformadas incluem
`x-omniroute-modality-bridge: audio->text;model=<sttModel>;parts=<n>`; solicitações
inalteradas não recebem um segmento do Audio Bridge.

As configurações de execução são armazenadas no banco de dados e validadas pelo Zod:

| Chave                         | Padrão  | Intervalo         |
| ----------------------------- | ------- | ----------------- |
| `modalityBridgeAudioEnabled`  | `true`  | —                 |
| `modalityBridgeAudioModel`    | `""`    | Auto ou ID de STT |
| `modalityBridgeAudioTimeout`  | `60000` | 1000–300000       |
| `modalityBridgeAudioMaxClips` | `3`     | 1–10              |

O cache compartilhado continua sendo controlado por `modalityBridgeCacheEnabled`,
`modalityBridgeCacheTtlMinutes` e `modalityBridgeCacheMaxEntries`.

### Video Bridge (`videoBridge.ts`, `videoBridgePipeline.ts`)

Intercepta partes de vídeo de nível superior em `messages` de Chat Completions e em `input` da Responses
API antes que um destino sem suporte nativo conhecido a vídeo seja chamado.
Os formatos compatíveis são `input_video`, `video_url`, `video_source`, URLs HTTPS
e URIs de dados `data:video/*;base64,...`. Nomes de arquivos simples em texto não são tratados
como vídeo.

`VideoBridgeGuardrail.preCall` (`videoBridge.ts`) é responsável pela travessia da solicitação,
pela verificação de capacidade/política, pela agregação por solicitação e pelo payload da resposta.
O trabalho por vídeo — aquisição, cache do resultado completo, descrição de uma sequência
de quadros (que combina qualquer transcrição de áudio declarada pelo chamador) e
métricas/abortamento/limpeza por tentativa — fica oculto por trás de `processVideoPart` em
`videoBridgePipeline.ts`, chamado uma vez para cada parte de vídeo dentro do loop de `preCall`.
Esse módulo também define os limites explícitos das portas `VideoMediaBrokerPort`
(aquisição de bytes e extração de quadros amostrados), `VideoAudioTranscriptionPort`
(combinação de uma transcrição de áudio declarada pelo chamador com as legendas amostradas) e
`VideoDrilldownPort` (o limite de persistência do detalhamento de quadros; ainda não conectado
a `processVideoPart` — atualmente, apenas a rota separada `/api/modality-bridge/video/drilldown`
grava entradas de detalhamento).

O caminho público de solicitação `/v1` nunca importa nem invoca um subprocesso. Vídeos
remotos são baixados com um limite de 50 MiB; vídeos base64 inline têm um limite
conservador de 36 MiB decodificados por vídeo para que o envelope de
modelo/mensagens/enquadramento permaneça dentro do limite público de admissão de solicitações
JSON de 50 MiB. O comprimento inline e as estimativas do tamanho decodificado são verificados
antes da alocação. HTTPS é obrigatório na URL remota inicial e em cada redirecionamento,
usando a proteção de saída existente restrita a destinos públicos, com fixação de DNS. Em seguida,
os bytes atravessam exatamente o limite interno do broker
`POST /api/modality-bridge/video/extract`. Essa rota é `LOCAL_ONLY` e `SPAWN_CAPABLE`,
aceita apenas uma solicitação de loopback confiável autenticada por processo e nunca aceita
uma URL, caminho do sistema de arquivos, executável ou lista de argumentos. O pipeline de
tamanho do corpo da API e o leitor incremental de corpo do manipulador impõem,
independentemente, um limite de entrada de 50 MiB no broker. Sua fila limitada executa
uma extração por vez, permite quatro trabalhos pendentes e limita a entrada pendente a
100 MiB.

Dentro do broker, `ffprobe` lê um arquivo local privado; a lista fixa de formatos
permitidos exclui formatos de playlist e manifesto. Para contêineres permitidos da família
MOV, referências externas a dados MOV permanecem desabilitadas por padrão, e o comando
fixo não as habilita. Tanto `ffprobe` quanto `ffmpeg` usam a lista de protocolos permitidos
restrita a `file`, uma thread, arrays fixos de argumentos, nenhum shell e executáveis
resolvidos a partir de `PATH`. Fluxos de capa com imagem anexada não são candidatos
reproduzíveis. Todos os fluxos reproduzíveis devem atender aos limites, e um fluxo padrão
explícito é preferido antes do fallback determinístico para o índice mais baixo.
Os vídeos são limitados a 600 segundos, 8.192 pixels por dimensão e 33.554.432 pixels
de origem. O FFmpeg amostra de 1 a 16 quadros JPEG nos pontos médios, reduz a escala da
borda mais longa para, no máximo, 1.024 pixels sem ampliar entradas menores e nunca recebe
uma URL. A amostragem é `uniform` por padrão. As políticas opcionais `scene_aware` e
experimental `segment_aware` executam uma passagem fixa adicional do FFmpeg sobre o fluxo
local já validado, selecionam timestamps de cenas limitados de `showinfo` e recorrem
deterministicamente aos mesmos pontos médios uniformes em caso de falha do detector,
timeout, saída malformada ou conjunto vazio de candidatos. O modo com reconhecimento de
segmentos aloca amostras de pontos médios proporcionalmente aos intervalos de cena
validados; as evidências do modo com reconhecimento de segmentos e o comportamento de
fallback são detalhados abaixo. O limite rígido de 16 quadros é aplicado após a seleção
em todas as políticas. Quando uma solicitação com reconhecimento de cena tem um orçamento
de apenas um quadro, ela usa o ponto médio uniforme da janela ativa do vídeo completo ou
da janela de foco e informa `policyEffective: uniform`: um único quadro de cena selecionado
não consegue preservar as duas extremidades temporais. Opcionalmente, o chamador pode
fornecer uma janela de foco finita (`start`/`end` em segundos); os limites são restringidos
à duração da mídia, janelas invertidas ou não finitas são rejeitadas, e todas as políticas
de amostragem são executadas apenas dentro do intervalo normalizado. A janela resultante
é incluída nos metadados de amostragem e no prefixo de descrição não confiável, para que
os modelos subsequentes possam distinguir um trecho em foco da linha do tempo completa.

O foco semântico das legendas é uma configuração separada e explícita. O modo padrão de
análise `full` preserva o prompt de quadros existente e nunca encaminha o texto da
solicitação ao modelo de legendas. No modo `focused`, a ponte lê apenas o `text`/`input_text`
mais recente, não vazio e criado pelo usuário no mesmo contêiner de Chat ou Responses,
normaliza-o para NFC, reduz caracteres de controle e espaços em branco e o limita a 500
pontos de código Unicode. Um resultado vazio recorre ao prompt `full` exato. Uma dica
utilizável é serializada como JSON em um bloco dedicado de contexto de usuário não confiável
e só pode priorizar detalhes observáveis; ela não pode substituir o aviso separado contra
seguir instruções visíveis ou audíveis na mídia. O foco textual nunca infere `start`/`end`
nem altera o amostrador temporal.

#### Evidências estruturais de segmentos do FU-07

`segment_aware` usa uma passagem limitada de pré-análise sobre o fluxo de vídeo local já
validado. A cadeia fixa de filtros primeiro reduz a escala para, no máximo, 320 pixels de
largura, detecta mudanças de cena e intervalos congelados e, em seguida, faz a amostragem
a 1 quadro por segundo para desfoque, luminância média e informações espaciais/temporais.
A passagem é limitada a 600 amostras estruturais, uma thread de FFmpeg/filtro, as mesmas
listas de protocolos restritas a `file` e de contêineres permitidos, um limite de saída do
processo de 1 MiB e, no máximo, 30 segundos dentro do abortamento/prazo compartilhado do
broker. Ela nunca aceita um comando, filtro, caminho ou URL da solicitação.

Os valores estruturais são evidências de amostragem determinística, não de compreensão semântica do vídeo. Eles não inferem sujeitos, ações, legendas, fala ou intenção do usuário. Os limites de cena e de congelamento formam segmentos; a cobertura de congelamento, o desfoque, a exposição, o detalhamento espacial e a variação temporal influenciam apenas como o orçamento existente de 1–16 quadros é alocado. Um segmento totalmente congelado é limitado a um quadro, enquanto os segmentos não congelados disputam o orçamento restante. Quando há mais limites do que quadros, a cobertura uniforme da linha do tempo é preservada para que cortes rápidos no início não ocultem um longo segmento final. Limites de cena dentro da resolução de análise de 1 segundo de um limite de congelamento são mesclados.

Filtros ausentes, evidências malformadas/vazias, um erro do detector ou o tempo limite da pré-análise delimitada fazem com que o sistema prossiga usando exatamente a política uniforme de pontos médios. Um cancelamento pelo chamador ou o prazo do broker não resultam nesse comportamento: eles encerram o subprocesso em andamento, impedem a extração posterior de quadros e a árvore temporária privada é removida em `finally`.

`scripts/perf/video-bridge-fu07-eval.ts` gera fixtures determinísticas reais do FFmpeg para economia de chamadas de legendagem após desduplicação, alocação de orçamento para movimento denso, evidências de desfoque/exposição/SI-TI, cortes rápidos com um trecho final longo e falsos positivos de fade gradual. Ele registra o tempo decorrido da pré-análise e, quando `/usr/bin/time` está disponível, a CPU do processo filho e o pico de RSS. Suas verificações de qualidade são apenas oráculos estruturais. A qualidade real do modelo de legendagem permanece `HOLD`, pois esse harness não possui um endpoint autorizado nem um avaliador congelado. A economia monetária também permanece `HOLD`, a menos que `--caption-cost-per-call-usd` forneça uma estimativa positiva explícita de custo por chamada; o script nunca inventa nenhum desses resultados.

Cada quadro é limitado a 4 MiB, todos os quadros brutos em conjunto a 23 MiB e a resposta serializada do broker a 32 MiB. Um diretório temporário privado é removido em `finally`. O OmniRoute não inclui o FFmpeg e não aceita um caminho de executável personalizado. Antes da legendagem, a ponte aplica uma etapa conservadora de desduplicação visual: cada JPEG é reduzido a um buffer de tons de cinza de 16×16 e comparado apenas com o último quadro mantido. Para um orçamento de legendagem solicitado superior a um quadro, a extração fornece um conjunto delimitado de candidatos de até duas vezes esse orçamento e nunca superior a 16 quadros. O limite solicitado é aplicado somente após a desduplicação, preservando o primeiro e o último candidatos selecionados durante a redução final quando o orçamento é de pelo menos dois. A política versionada `grayscale-16x16-mean-cells-v2` usa o maior valor entre a diferença média de luminância e a proporção de células da miniatura cuja diferença normalizada é de pelo menos 0,05. O limiar de duplicação é a constante 0,04, escolhida por previsibilidade em vez de ser exposta como uma configuração de tempo de execução. Esse sinal secundário de alto contraste preserva pequenos movimentos e alterações em texto visível que uma comparação baseada somente na média pode ocultar. Erros do comparador ou do decodificador fazem com que o sistema prossiga e preserve a cobertura. Os metadados de saída distinguem candidatos extraídos, quadros usados com sucesso e duplicatas visuais descartadas.

Uma parte de vídeo marcada explicitamente pode solicitar uma folha de contatos com carimbos de data/hora. A ponte cria uma grade JPEG de, no máximo, 4 colunas e 16 quadros. Cada célula de 512 pixels grava o carimbo de data/hora da origem em uma faixa inferior de alto contraste, enquanto os mesmos carimbos de data/hora permanecem nos metadados textuais para associação e auditoria posteriores. O JPEG completo permanece limitado a 32 MiB. Se `sharp` não conseguir decodificar ou compor a grade, a ponte recorre aos quadros JPEG individuais; um cancelamento do cliente ainda é propagado pela operação da folha.

As evidências para promoção são deliberadamente separadas do microbenchmark sintético de composição. `scripts/perf/video-bridge-contact-sheet-eval.ts` define um harness A/B com versão de esquema para modelos reais de visão compatíveis com a OpenAI. Ele mede os tokens informados pelo provedor, a latência de ponta a ponta (incluindo a composição da folha), o número de chamadas ao modelo e a retenção de fatos definida pelo manifesto. As respostas brutas do modelo não são gravadas no relatório; somente resumos SHA-256 e IDs dos fatos correspondentes são mantidos. O harness não realiza nenhuma chamada de rede ou a modelo pago, a menos que `--execute-real` seja especificado e `--model`, `OMNIROUTE_BASE_URL` e `OMNIROUTE_API_KEY` estejam configurados. Sem essa execução real explícita, seu veredito legível por máquina permanece `HOLD`; as medições sintéticas de payload/número de chamadas, por si só, não constituem evidências para promoção.

Os chamadores podem anexar um array opcional `transcript.cues` a uma parte de vídeo compatível quando já possuem texto alinhado. Cada indicação deve conter `text`, um intervalo finito `start`/`end` dentro da duração detectada e um `source` permitido (`client`, `embedded` ou `audio-bridge`); o valor padrão de `confidence` é `1` e deve permanecer entre `0` e `1`. Indicações exatamente duplicadas são unificadas. O OmniRoute nunca inicia uma transcrição com base nesses metadados: as indicações validadas são copiadas para o resultado descrito com origem, confiança e intervalo, e são apresentadas como observações não confiáveis junto às legendas dos quadros. Textos inválidos, fora do intervalo ou sem procedência são rejeitados, em vez de serem misturados ao fluxo de legendas. Atualmente, o campo `source` é declarado pelo chamador, e não verificado pelo servidor: o OmniRoute garante que o valor seja uma das três strings permitidas, mas ainda não confirma criptograficamente se um rótulo `embedded` ou `audio-bridge` realmente veio de uma extração pertencente ao servidor. Trate `source` como uma indicação não confiável até que essa verificação seja implementada; não baseie decisões de autorização nele.

Um chamador avançado pode fornecer uma faixa `audioTranscript` já autorizada
para o mesmo vídeo. O ponto de fusão executa as observações visuais e de áudio sob
um único prazo e sinal de cancelamento, ordena-as em uma linha do tempo comum, elimina
duplicatas exatas e relata um resultado parcial quando apenas um dos lados é bem-sucedido.
Um `audioTranscript` inválido resulta nesse resultado parcial — a descrição visual
é mantida e a ramificação de áudio registra um código de falha sanitizado —
em vez de causar a falha do vídeo inteiro. A disponibilidade por ramificação, o indicador
de resultado parcial e os códigos de falha sanitizados são preservados no resultado descrito, nos
metadados do guardrail (`audioFusionRuns`/`audioFusionPartials`/
`audioFusionFailureCodes`), nos metadados do cache de resultados e nos contadores
de fusão do bridge. O caminho padrão do Video Bridge não invoca conversão de fala em texto
nem baixa uma segunda cópia da mídia; sem essa faixa explícita, ele permanece
limitado a vídeo.

**Retenção de transcrições (#12150 P1).** Isso se aplica automaticamente sempre que o
Video Bridge (que é opcional) renderiza uma indicação de transcrição — não há um
indicador de retenção separado. Quando uma solicitação renderiza qualquer indicação de transcrição (um
`transcript` declarado pelo chamador ou um `audioTranscript` fusionado), o guardrail a marca como
`videoBridgeObserved` e produz uma versão expurgada da descrição do vídeo —
uma renderização idêntica na qual o corpo de texto livre de cada indicação é substituído por
`[redacted-video-transcript]`, criada pela substituição do campo estruturado da indicação
antes de a string ser montada (nunca pela análise do texto achatado, para que nenhum conteúdo
da indicação — adversarial ou comum, inclusive corpos contendo `]`, como
`[inaudible]`/`[music]` — possa permanecer). O corpo da solicitação persistido no log de chamadas troca
cada parte de texto derivada do vídeo por essa versão expurgada, com correspondência
por igualdade de conteúdo; a âncora `fullText` é relida da carga útil concluída do guardrail
anterior à chamada, de modo que a correspondência ainda seja bem-sucedida após guardrails posteriores da cadeia
(os mascaradores de PII e credenciais, prioridades 10/95) reescreverem o texto da descrição no local e
após a injeção de prompt do sistema/handoff/memória remodelar o array de mensagens. O
corpo enviado ao modelo upstream permanece inalterado. Uma solicitação observada também não preenche
nenhuma Memory durável (a extração derivada tanto da solicitação quanto da resposta é ignorada),
portanto a própria resposta do modelo não pode reproduzir o texto da transcrição na Memory.

Superfícies de retenção ainda abertas, rastreadas para acompanhamento (**P2**, #12430): o snapshot bruto
da solicitação do cliente anterior ao guardrail no artefato de log detalhado;
continuação `previous_response_id` com falha fechada; despachos internos de prompts derivados
que incorporam a transcrição em um prompt de string sintetizado
(estágios do pipeline, context-handoff); e o corpo da resposta/a cópia no cache semântico
de uma resposta do modelo que cite a transcrição. Essas são superfícies brutas/de classe de resposta ou
opcionais fora do escopo de corpo de solicitação persistido + Memory do P1.

O ciclo de vida interno de `/api/modality-bridge/video/drilldown` é um substrato de cache separado,
autenticado por token/loopback. Cada operação também exige um
ID de principal opaco canônico. Antes que um chamador de produção seja habilitado, ele deve
derivar esse ID do tenant autenticado e nunca deve encaminhar um
valor selecionado pelo cliente. As chaves de cache vinculam esse principal aos IDs canônicos de sessão e
referência de vídeo, armazenam apenas as chaves derivadas por SHA-256 e restringem tanto as leituras
quanto a exclusão ao mesmo principal. O cache armazena no máximo 16 frames JPEG derivados
por entrada, faz com que expirem após dez minutos e oferece suporte a leituras limitadas por
`start`/`end` ou à exclusão explícita da sessão.

Cada principal está limitado a 16 entradas e 64 MiB de dados JPEG canônicos. Esses
limites são independentes do teto global de 64 entradas/256 MiB: a pressão da cota do
principal remove apenas as entradas usadas menos recentemente desse principal antes que a
remoção LRU global seja considerada. As entradas expiradas são removidas da contabilização
do principal e da global durante a atividade do cache, enquanto o cancelamento e a falha de validação não
confirmam uma substituição parcial.

O cache rejeita Base64 não canônico, preenchimento excessivo, mídia que não seja JPEG, JPEGs malformados ou
truncados e JPEGs que produzam um aviso durante uma decodificação completa e limitada da imagem com `sharp`.
Ele recodifica cada imagem aceita como um JPEG canônico, deriva a largura e a altura
dos bytes decodificados em vez de confiar nos campos do chamador e descarta quaisquer bytes
poliglotas à direita em vez de retê-los. Apenas o buffer comprimido canônico limitado
é contabilizado em ambas as cotas. O limite de transmissão JSON inclui a sobrecarga de Base64 para o teto de 32 MiB
da entrada decodificada. Cada
derivação armazenada registra o formato/resolução JPEG validado, a política de amostragem,
a versão da derivação, a hora de criação, o hash de conteúdo calculado pelo servidor e a referência
pai com hash, além do hash de conteúdo pai do chamador confiável. O cancelamento é verificado
entre as fases assíncronas de decodificação/hash antes do commit atômico no cache.

Esta tranche ainda não conecta um produtor de produção à rota e não
oferece seleção de variantes com múltiplas resoluções. Portanto, o caminho transparente de solicitação do
Video Bridge não incorre em trabalho adicional, enquanto a derivação de principal vinculada ao tenant e
o ciclo de vida completo de múltiplas resoluções do FU-08 permanecem como trabalho explícito de acompanhamento,
em vez de serem documentados como comportamento concluído.

Os quadros são legendados sequencialmente com o modelo de Vídeo configurado. Uma substituição de Vídeo vazia herda a configuração de Visão; se ambas estiverem vazias, o roteador automático de Visão selecionará o modelo efetivo compatível com visão. As legendas geradas com sucesso substituem a parte original por um prefixo estável `[Video description:`, que também marca o texto como uma observação não confiável derivada de mídia e instrui os modelos subsequentes a não seguir instruções encontradas na mídia. As chaves de cache das legendas dos quadros incluem os bytes JPEG, o prompt, o timestamp e o modelo efetivo; somente legendas geradas com sucesso são armazenadas em cache. As entradas de cache mantêm o modelo produtor real que obteve sucesso, inclusive quando se trata de um modelo de fallback; a ponte informa `mixed` quando quadros diferentes foram produzidos por modelos diferentes. Um acerto de cache reutiliza essa identidade do produtor, em vez de rotulá-la novamente como o plano de roteamento solicitado. O cache de resultados do vídeo inteiro usa como chave todas as entradas que alteram a saída — prompt, modelo efetivo, política de amostragem, número de quadros, modo de análise semântica, impressão digital SHA-256 da dica de foco normalizada, janela de foco, `transcript`, `audioTranscript` e o sinalizador de folha de contatos — portanto, alterar qualquer uma dessas dimensões resulta em uma falha de cache, nunca na reutilização de dados obsoletos. A versão, o limite e o número limitado de quadros candidatos da política de desduplicação visual também são explícitos na chave e nos metadados do cache de resultados; portanto, uma alteração de política não pode reutilizar uma descrição obsoleta do vídeo inteiro. Os metadados v4 do cache de resultados mantêm o modo e a impressão digital, nunca a tarefa bruta do usuário. Os metadados da proteção informam tanto o modo de análise solicitado quanto o efetivo; um modo `focused` solicitado sem texto de usuário utilizável é informado como efetivamente `full`.

A proteção extrai todas as partes de vídeo compatíveis, mas não descreve mais do que `modalityBridgeVideoMaxVideos`. Para um destino comprovadamente definido com `supportsVideo === false`, vídeos que falharam ou excederam o limite tornam-se marcadores de texto seguros e explícitos, de modo que nenhum vídeo bruto permaneça. Quando a capacidade é desconhecida, essas partes permanecem inalteradas. Destinos com `supportsVideo === true` ignoram a ponte. O sinal de cancelamento da solicitação do cliente é propagado pelo download, pela fila do broker, pelos subprocessos e pelas chamadas de geração de legendas; os cancelamentos interrompem o processamento entre os vídeos e nunca recorrem à mídia bruta em caso de falha.

As configurações de runtime são armazenadas no banco de dados e validadas pelo Zod:

| Chave                               | Padrão      | Intervalo / comportamento                                                                                     |
| ----------------------------------- | ----------- | ------------------------------------------------------------------------------------------------------------- |
| `modalityBridgeVideoEnabled`        | `false`     | Runtime opcional, com ativação explícita                                                                      |
| `modalityBridgeVideoAnalysisMode`   | `"full"`    | `full` preserva legendas genéricas; `focused` usa o contexto limitado e não confiável do usuário mais recente |
| `modalityBridgeVideoModel`          | `""`        | Herda o modelo da Ponte de Visão                                                                              |
| `modalityBridgeVideoFrameCount`     | `8`         | 1–16                                                                                                          |
| `modalityBridgeVideoSamplingPolicy` | `"uniform"` | `uniform`, `scene_aware` ou `segment_aware` proporcional; uma falha do detector recorre a `uniform`           |
| `modalityBridgeVideoMaxVideos`      | `1`         | 1–4                                                                                                           |
| `modalityBridgeVideoTimeout`        | `120000`    | 1000–120000 ms                                                                                                |

Valores legados persistidos do tempo limite de Vídeo acima de 120 segundos são limitados ao prazo do broker; novas gravações de configurações acima desse limite são rejeitadas. `GET /api/modality-bridge/video/runtime` exige uma localidade loopback confiável e marcada antes da autenticação ou da sondagem do runtime e, depois, exige autenticação de gerenciamento. Ele retorna somente `available`, versões sanitizadas do FFmpeg/ffprobe e um motivo fixo quando o runtime não está disponível. O endpoint interno de extração não é uma API pública de upload: a saturação da fila retorna `503` mais `Retry-After`, uma desconexão do chamador retorna `499` e o prazo fixo do broker retorna `504`. As respostas convertidas adicionam `video->text;model=<visionModel>;parts=<videos>` ao cabeçalho central `x-omniroute-modality-bridge` sem remover os segmentos de Visão ou Áudio.

### Mascarador de PII (`piiMasker.ts`)

É executado em **ambas** as etapas.

- **`preCall`** clona o payload, percorre `system`, `messages`, `input` e `prompt` (incluindo itens que são strings simples) e aplica `processPII()` (de `@/shared/utils/inputSanitizer`) aos campos de string `content`/`text`. Quando `PII_REDACTION_ENABLED=true`, as PII detectadas são ocultadas no payload enviado. Isso é independente de `INPUT_SANITIZER_MODE` (que controla apenas a política de injeção de prompt). Quando a ocultação está desativada, a chamada registra as contagens de detecção sem reescrever o conteúdo.
- **`postCall`** faz uma clonagem profunda da resposta e executa `sanitizePIIResponse()` junto com o mascarador do formato da API Responses (`maskResponsesOutput` — abrange `output_text` e `output[].content[].text`). Se ocorrer qualquer ocultação, a resposta modificada substituirá a original.

A proteção nunca bloqueia; ela apenas faz anotações (`meta.detections`, `meta.redacted`) ou reescreve.

### Injeção de Prompt (`promptInjection.ts`)

Detecta estruturas adversariais no conteúdo fornecido pelo usuário e aplica a política configurada. O comportamento é determinado por variáveis de ambiente e opções do construtor:

| Configuração       | Variável de ambiente                                                                                 | Padrão | Efeito                                                                                                                                                                                                               |
| ------------------ | ---------------------------------------------------------------------------------------------------- | ------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Habilitado         | `INPUT_SANITIZER_ENABLED`                                                                            | `true` | Quando `false`, o mecanismo de proteção encerra antecipadamente.                                                                                                                                                     |
| Modo               | `INJECTION_GUARD_MODE` / `INPUT_SANITIZER_MODE`                                                      | `warn` | Política de injeção: `block`, `warn` ou `log`. (`redact` é aceito para compatibilidade retroativa, mas **não** remove texto de injeção; a reescrita de PII da solicitação é controlada por `PII_REDACTION_ENABLED`.) |
| Limite de bloqueio | opção `blockThreshold` / `INPUT_SANITIZER_BLOCK_THRESHOLD` (alias `INJECTION_GUARD_BLOCK_THRESHOLD`) | `high` | Severidade mínima necessária para bloquear. A severidade média é apenas de observação por padrão.                                                                                                                    |

**Precedência do modo** (`getMode`): `options.mode` do chamador →
**substituição do feature flag no banco de dados** `INJECTION_GUARD_MODE` (Painel → Configurações →
Feature Flags) → variável de ambiente `INJECTION_GUARD_MODE` → variável de ambiente `INPUT_SANITIZER_MODE` →
`warn`. Portanto, uma substituição pelo painel prevalece sobre as variáveis de
ambiente, permitindo que a interface de Feature Flags controle o mecanismo de
proteção em execução em tempo real (sem reinicialização). A leitura do banco de
dados é à prova de falhas: se ocorrer um erro, o mecanismo de proteção recorre
ao comportamento baseado nas variáveis de ambiente e, quando nenhuma
substituição está definida, o comportamento é idêntico à resolução baseada
somente nas variáveis de ambiente.

Fontes de detecção:

1. `sanitizeRequest()` de `@/shared/utils/inputSanitizer` (conjunto compartilhado
   de detectores usado em outros pontos do pipeline).
2. `DEFAULT_GUARD_PATTERNS` integrados (atualmente `system_override_inline` e
   `markdown_system_block`, ambos com severidade `high`).
3. `customPatterns` opcionais passados pelas opções do construtor (strings, regex
   ou registros `{ name, pattern, severity }`).

Quando `mode === "block"` **e** pelo menos uma detecção atinge o limite de
severidade, `preCall` retorna `{ block: true, message: "Request rejected:
suspicious content detected" }`. Nos modos `warn`/`log`, o mecanismo de proteção
registra o evento, mas permite a chamada. O auxiliar compartilhado
`evaluatePromptInjection()` também é exportado para chamadores que precisam
avaliar prompts sem passar pelo registro.

**Limite de varredura (v3.8.20):** o detector inspeciona somente os **primeiros 16 KB** do
texto concatenado do prompt — `MAX_INJECTION_SCAN_BYTES = 16 * 1024` (16 384 bytes) em
`src/shared/utils/inputSanitizer.ts`. Tanto `detectInjection()` quanto
`evaluatePromptInjection()` executam `slice(0, MAX_INJECTION_SCAN_BYTES)` antes
do loop de padrões. As diretivas de injeção ficam próximas ao início de uma
entrada, portanto isso limita o uso de CPU/GC pelas regex em payloads com
centenas de KB sem enfraquecer a detecção (cf.
#3932, #4041).

### Mascarador de credenciais (`credentialMasker.ts`)

É executado em **ambas** as etapas, por último na cadeia padrão (prioridade `95`).
Oculta padrões conhecidos de chaves de API/tokens secretos no payload de saída
(conteúdo de mensagens, argumentos de chamadas de ferramentas e resultados de
ferramentas) **e** na resposta do provedor, de modo que uma credencial colada em
um prompt (ou repetida por um resultado de ferramenta) não seja vazada para o
provedor upstream nem de volta para o cliente.

- **Somente com ativação explícita**, seguindo a mesma convenção da ocultação de PII
  (próxima à Regra Rígida nº 20): desabilitado, a menos que
  `settings.credentialRedactionEnabled === true` **ou**
  `CREDENTIAL_REDACTION_ENABLED=true`. Quando desativado, o mecanismo de
  proteção não realiza nenhuma operação — ele nunca bloqueia nem reescreve.
- `redactCredentials()` percorre toda a árvore do payload/resposta (`walkValue()`,
  protegido contra poluição de protótipo e contra ciclos por meio de `WeakSet`)
  e substitui as correspondências por um placeholder `[REDACTED:<type>]`,
  clonando somente as ramificações que realmente foram alteradas.
- `CREDENTIAL_PATTERNS` abrange chaves de provedores de LLM (OpenAI, OpenAI-proj,
  Anthropic, Google, Hugging Face, Replicate), tokens de VCS/SaaS (GitHub, Slack,
  Linear, Notion, npm, Postman, Discord), chaves de pagamento (Stripe, Square),
  chaves de nuvem (chave de acesso da AWS, Twilio, SendGrid, Mailgun), chaves
  privadas/JWTs, strings de conexão contendo credenciais
  (`mongodb://user:pass@...` etc.) e um padrão genérico de valor de cabeçalho
  `Authorization`/`x-api-key`/`api-key`/`apikey`. Chaves com formato de
  cabeçalho (`authorization`, `x-api-key`, `api-key`, `apikey`) são ocultadas
  estruturalmente (somente o valor, preservando o prefixo do esquema, como
  `Bearer `/`Basic `), em vez de usar a regex genérica de texto.
- O mecanismo de proteção nunca bloqueia; ele apenas reescreve
  (`modifiedPayload` / `modifiedResponse`) e adiciona anotações
  (`meta.credentialsRedacted`, `meta.count`).

Proteção contra regressão: `tests/unit/credential-masker-guardrail.test.ts`.

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
  message?: string; // exibida em caso de bloqueio
  meta?: Record<string, unknown> | null;
  modifiedPayload?: TValue; // retornado por preCall para reescrever a solicitação
  modifiedResponse?: TValue; // retornado por postCall para reescrever a resposta
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

Uma proteção sinaliza "nenhuma alteração" retornando `void`, `{}` ou
`{ block: false }`. Retornar um `modifiedPayload`/`modifiedResponse` substitui
o valor que percorre a cadeia para as proteções subsequentes.
`signal?: AbortSignal` propaga o ciclo de vida do chamador para as proteções. O cancelamento de uma solicitação é a exceção deliberada de abertura em caso de falha: as pontes de mídia interrompem o trabalho e fazem a limpeza sem restaurar a mídia bruta para um destino que sabidamente não oferece suporte a ela.

## Registro (`registry.ts`)

O singleton `guardrailRegistry` expõe:

- `register(guardrail)` — adiciona uma proteção (ou a substitui pelo nome normalizado) e
  reordena por `priority` crescente.
- `clear()` / `list()` — utilitários administrativos.
- `runPreCallHooks(payload, context)` — percorre as proteções ativas, encaminha o
  payload por meio de `modifiedPayload` e para no primeiro `block: true`.
- `runPostCallHooks(response, context)` — mesmo fluxo no lado da resposta.
- `resetGuardrailsForTests({ registerDefaults })` — limpa o estado e, opcionalmente,
  registra novamente os padrões para garantir o isolamento adequado dos testes.

Ambos os executores retornam `{ blocked, payload|response, results, guardrail?, message? }`,
em que `results` é um array de registros `GuardrailExecutionResult` que incluem
os campos `blocked`, `skipped`, `modified`, `error` e `meta` por proteção,
úteis para rastreamento.

### Desativação de Proteções por Solicitação

`resolveDisabledGuardrails({ apiKeyInfo, body, headers })` agrega uma
lista sem duplicatas dos nomes das proteções que devem ser ignoradas na
solicitação atual. Fontes (todas opcionais, todas combinadas):

- `apiKeyInfo.disabledGuardrails`
- `disabledGuardrails` no corpo da solicitação (nível superior)
- `metadata.disabledGuardrails` no corpo da solicitação
- Cabeçalho `x-omniroute-disabled-guardrails` (ou o legado
  `x-disabled-guardrails`)

Os valores podem ser arrays de strings ou uma string separada por vírgulas; os nomes são
normalizados para kebab-case em letras minúsculas (`pii_masker` → `pii-masker`). O resultado
é passado por `context.disabledGuardrails` ao registro, que ignora
as proteções correspondentes (`skipped: true` em `results`).

## Ordem de execução

Para cada solicitação que passa por `src/sse/handlers/chat.ts` e
`open-sse/handlers/chatCore.ts`:

1. `resolveDisabledGuardrails(...)` cria a lista de itens a ignorar com base na chave de API, no corpo
   e nos cabeçalhos.
2. `guardrailRegistry.runPreCallHooks(body, ctx)` executa as proteções em ordem crescente
   de prioridade:
   - As proteções desabilitadas são registradas como `skipped`.
   - O `preCall` de cada proteção pode reescrever o payload por meio de `modifiedPayload`.
   - O primeiro `block: true` interrompe a cadeia e o manipulador retorna
     uma resposta de rejeição da proteção.
3. O payload (possivelmente reescrito) segue para o roteamento combinado e o envio
   ao upstream.
4. Após a resposta ser montada, `guardrailRegistry.runPostCallHooks(...)`
   executa a mesma cadeia na resposta. Nesse ponto, `block: true` descarta a resposta
   do upstream.

As proteções que lançam exceções são registradas com `error: <message>` e incluídas no log por meio de
`logger.warn`, mas a cadeia continua — por projeto, o comportamento é fail-open.

## Configuração

Variáveis de ambiente lidas pelas proteções integradas:

| Variável                              | Usada por                 | Efeito                                                                                                                                         |
| ------------------------------------- | ------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| `INPUT_SANITIZER_ENABLED`             | `prompt-injection`        | Defina como `false` para desabilitar completamente a detecção.                                                                                 |
| `INPUT_SANITIZER_MODE`                | `prompt-injection`        | Política de injeção: `warn`, `block` ou `log`. O valor legado `redact` não reescreve o texto da injeção.                                       |
| `INJECTION_GUARD_MODE`                | `prompt-injection`        | Modo da proteção contra injeção; também é um sinalizador de recurso no banco de dados que **sobrescreve** as variáveis de ambiente (DB > ENV). |
| `INPUT_SANITIZER_BLOCK_THRESHOLD`     | `prompt-injection`        | Severidade mínima rejeitada por `MODE=block`: `high` (padrão), `medium` ou `low`.                                                              |
| `INJECTION_GUARD_BLOCK_THRESHOLD`     | `prompt-injection`        | Alias legado de `INPUT_SANITIZER_BLOCK_THRESHOLD`.                                                                                             |
| `PII_REDACTION_ENABLED`               | `pii-masker`              | Quando `true`, as PII da solicitação são ocultadas (independentemente do modo de injeção).                                                     |
| `PII_RESPONSE_SANITIZATION` / `_MODE` | `pii-masker` (downstream) | Controla o comportamento do mascarador no lado da resposta.                                                                                    |

As proteções do Modality Bridge leem a configuração de runtime do armazenamento
de configurações respaldado pelo banco de dados (`getSettings()`), e não de variáveis de ambiente. As chaves primárias de visão são
`modalityBridgeVisionEnabled`, `modalityBridgeVisionMode`,
`modalityBridgeVisionModel`, `modalityBridgeVisionTaskAware`,
`modalityBridgeVisionPrompt`, `modalityBridgeVisionTimeout`,
`modalityBridgeVisionMaxImages`, `modalityBridgeVisionMaxChars`,
`modalityBridgeCacheEnabled`, `modalityBridgeCacheTtlMinutes` e
`modalityBridgeCacheMaxEntries`. As chaves legadas
`visionBridge*` são aceitas somente como o fallback de leitura documentado para um ciclo;
as gravações do dashboard usam as chaves primárias. Os valores padrão e o resolvedor
de fallback ficam em `src/shared/constants/modalityBridgeDefaults.ts`, com as constantes
legadas mantidas em `src/shared/constants/visionBridgeDefaults.ts`.

O áudio usa `modalityBridgeAudioEnabled`, `modalityBridgeAudioModel`,
`modalityBridgeAudioTimeout` e `modalityBridgeAudioMaxClips`, além das configurações
compartilhadas `modalityBridgeCache*`. O áudio não possui fallback para chaves legadas porque essas
chaves foram introduzidas com o esquema do Modality Bridge.

O vídeo usa `modalityBridgeVideoEnabled`, `modalityBridgeVideoAnalysisMode`,
`modalityBridgeVideoModel`,
`modalityBridgeVideoFrameCount`, `modalityBridgeVideoSamplingPolicy`,
`modalityBridgeVideoMaxVideos` e
`modalityBridgeVideoTimeout`, além das configurações compartilhadas `modalityBridgeCache*`.
Ele fica desabilitado por padrão porque FFmpeg/ffprobe são dependências operacionais
opcionais, e o legendamento de quadros aumenta a latência e o custo do modelo.

## Guardrails personalizados

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

Etapas:

1. Crie `src/lib/guardrails/myGuardrail.ts` estendendo `BaseGuardrail`.
2. Implemente `preCall` e/ou `postCall`.
3. Registre durante a importação (adicione por meio de `registerDefaultGuardrails`) ou
   chame `guardrailRegistry.register(...)` em tempo de execução — o registro substitui
   qualquer guardrail anterior com o mesmo nome normalizado.
4. Adicione testes em `tests/unit/` (exemplos existentes:
   `tests/unit/guardrails-registry.test.ts`,
   `tests/unit/prompt-injection-guard.test.ts`,
   `tests/unit/guardrails/visionBridge.test.ts`).

## Testes

Use `resetGuardrailsForTests()` entre os testes para começar com um estado conhecido.
Passe `{ registerDefaults: false }` para começar com um registro vazio e
registrar apenas os guardrails em teste. O Vision Bridge aceita injeção de
dependências (`deps.getSettings`, `deps.callVisionModel`); o Audio Bridge expõe
os pontos de integração equivalentes para configurações, capacidades, seleção do modelo STT, verificações
de credenciais e transcrição. Assim, os testes podem exercitar ambos os fluxos sem acesso
ao banco de dados ou à rede.

## Veja também

- `src/lib/guardrails/` — implementação
- `src/shared/utils/inputSanitizer.ts` — detector compartilhado que fornece suporte à
  detecção de injeção de prompt e ao mascaramento de PII
- `src/shared/constants/visionBridgeDefaults.ts` — padrões do Vision Bridge e
  lista de modelos que exigem o uso da ponte
- `src/shared/constants/modalityBridgeDefaults.ts` — padrões compartilhados de tempo de execução do Vision/Audio
- `docs/architecture/RESILIENCE_GUIDE.md` — camada ortogonal (circuit breaker, períodos de espera)
- `docs/reference/ENVIRONMENT.md` — referência completa de variáveis de ambiente

## Cobertura de rotas e red team do guardrail contra injeção (Fase 8 · Bloco D)

O guardrail contra injeção (`createInjectionGuard` / `withInjectionGuard`) abrange todas as rotas
que aceitam prompts de usuários. Ele respeita `INJECTION_GUARD_MODE` (o padrão `warn` = apenas registra;
`block` = retorna HTTP 400 `SECURITY_001`).

| Tipo              | Rotas                                                                                                                                                | Modo padrão |
| ----------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| Texto (existente) | `/v1/chat/completions`, `/v1/completions`, `/v1/relay/chat/completions`                                                                              | warn        |
| Generativas       | `/v1/messages`, `/v1/responses`, `/v1/images/generations`, `/v1/images/edits`, `/v1/videos/generations`, `/v1/music/generations`, `/v1/audio/speech` | warn        |
| Dados             | `/v1/embeddings`, `/v1/rerank`, `/v1/search`, `/v1/moderations`                                                                                      | warn        |

A extração de texto (`extractMessageContents`) abrange `messages`/`input`/`prompt`/`query`+`documents`/`instructions`/`system`.

**Red team (todas as noites, `nightly-llm-security.yml`):** o promptfoo valida que cada rota bloqueia
o corpus OWASP-LLM quando `INJECTION_GUARD_MODE=block`; o garak executa sondagens (ignoradas quando não há segredo).
`moderations` está incluída por consistência — operadores no modo de bloqueio podem isentá-la por meio de
`resolveDisabledGuardrails`.

O fluxo de trabalho noturno (`.github/workflows/nightly-llm-security.yml`, cron + acionamento
manual) tem duas tarefas:

- **`promptfoo-guard` (bloqueante)** — executa `promptfoo eval -c promptfooconfig.yaml`
  com `INJECTION_GUARD_MODE=block`. Cada caso adversarial (por exemplo, "ignore todas as
  instruções anteriores…", jailbreaks no estilo DAN) verifica se a resposta contém
  `error.code === "SECURITY_001"`, ou seja, se o guardrail realmente rejeitou a solicitação.
- **`garak` (consultivo)** — executa o garak com `--probes promptinject,dan,leakreplay`
  em uma instância local do OmniRoute (`http://localhost:20128/v1`). Condicionado à existência de um
  segredo do provedor (`PROMPTFOO_PROVIDER_KEY`); é ignorado de forma segura e recebe o sufixo
  `|| true`, portanto gera relatórios sem causar falha na CI.

A cobertura do auxiliar do guardrail (`createInjectionGuard` / `withInjectionGuard`)
abrange todas as rotas `/v1` que recebem prompts; o texto do prompt é obtido de
`messages`/`input`/`prompt`/`query`+`documents`/`instructions`/`system` por
`extractMessageContents()` em `src/shared/utils/inputSanitizer.ts`.
