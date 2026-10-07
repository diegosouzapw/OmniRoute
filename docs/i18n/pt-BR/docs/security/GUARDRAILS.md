# Guardrails (Português (Brasil))

🌐 **Languages:** 🇺🇸 [English](../../../../security/GUARDRAILS.md) · 🇪🇹 [am](../../../am/docs/security/GUARDRAILS.md) · 🇸🇦 [ar](../../../ar/docs/security/GUARDRAILS.md) · 🇦🇿 [az](../../../az/docs/security/GUARDRAILS.md) · 🇧🇬 [bg](../../../bg/docs/security/GUARDRAILS.md) · 🇧🇩 [bn](../../../bn/docs/security/GUARDRAILS.md) · 🇧🇦 [bs](../../../bs/docs/security/GUARDRAILS.md) · 🇨🇿 [cs](../../../cs/docs/security/GUARDRAILS.md) · 🇩🇰 [da](../../../da/docs/security/GUARDRAILS.md) · 🇩🇪 [de](../../../de/docs/security/GUARDRAILS.md) · 🇬🇷 [el](../../../el/docs/security/GUARDRAILS.md) · 🇪🇸 [es](../../../es/docs/security/GUARDRAILS.md) · 🇪🇪 [et](../../../et/docs/security/GUARDRAILS.md) · 🇮🇷 [fa](../../../fa/docs/security/GUARDRAILS.md) · 🇫🇮 [fi](../../../fi/docs/security/GUARDRAILS.md) · 🇫🇷 [fr](../../../fr/docs/security/GUARDRAILS.md) · 🇮🇪 [ga](../../../ga/docs/security/GUARDRAILS.md) · 🇮🇳 [gu](../../../gu/docs/security/GUARDRAILS.md) · 🇳🇬 [ha](../../../ha/docs/security/GUARDRAILS.md) · 🇮🇱 [he](../../../he/docs/security/GUARDRAILS.md) · 🇮🇳 [hi](../../../hi/docs/security/GUARDRAILS.md) · 🇭🇷 [hr](../../../hr/docs/security/GUARDRAILS.md) · 🇭🇺 [hu](../../../hu/docs/security/GUARDRAILS.md) · 🇦🇲 [hy](../../../hy/docs/security/GUARDRAILS.md) · 🇮🇩 [id](../../../id/docs/security/GUARDRAILS.md) · 🇳🇬 [ig](../../../ig/docs/security/GUARDRAILS.md) · 🇮🇹 [it](../../../it/docs/security/GUARDRAILS.md) · 🇯🇵 [ja](../../../ja/docs/security/GUARDRAILS.md) · 🇬🇪 [ka](../../../ka/docs/security/GUARDRAILS.md) · 🇰🇭 [km](../../../km/docs/security/GUARDRAILS.md) · 🇮🇳 [kn](../../../kn/docs/security/GUARDRAILS.md) · 🇰🇷 [ko](../../../ko/docs/security/GUARDRAILS.md) · 🇱🇹 [lt](../../../lt/docs/security/GUARDRAILS.md) · 🇱🇻 [lv](../../../lv/docs/security/GUARDRAILS.md) · 🇮🇳 [ml](../../../ml/docs/security/GUARDRAILS.md) · 🇮🇳 [mr](../../../mr/docs/security/GUARDRAILS.md) · 🇲🇾 [ms](../../../ms/docs/security/GUARDRAILS.md) · 🇲🇹 [mt](../../../mt/docs/security/GUARDRAILS.md) · 🇲🇲 [my](../../../my/docs/security/GUARDRAILS.md) · 🇳🇵 [ne](../../../ne/docs/security/GUARDRAILS.md) · 🇳🇱 [nl](../../../nl/docs/security/GUARDRAILS.md) · 🇳🇴 [no](../../../no/docs/security/GUARDRAILS.md) · 🇮🇳 [or](../../../or/docs/security/GUARDRAILS.md) · 🇮🇳 [pa](../../../pa/docs/security/GUARDRAILS.md) · 🇵🇭 [phi](../../../phi/docs/security/GUARDRAILS.md) · 🇵🇱 [pl](../../../pl/docs/security/GUARDRAILS.md) · 🇵🇹 [pt](../../../pt/docs/security/GUARDRAILS.md) · 🇷🇴 [ro](../../../ro/docs/security/GUARDRAILS.md) · 🇷🇺 [ru](../../../ru/docs/security/GUARDRAILS.md) · 🇱🇰 [si](../../../si/docs/security/GUARDRAILS.md) · 🇸🇰 [sk](../../../sk/docs/security/GUARDRAILS.md) · 🇸🇮 [sl](../../../sl/docs/security/GUARDRAILS.md) · 🇷🇸 [sr](../../../sr/docs/security/GUARDRAILS.md) · 🇸🇪 [sv](../../../sv/docs/security/GUARDRAILS.md) · 🇰🇪 [sw](../../../sw/docs/security/GUARDRAILS.md) · 🇮🇳 [ta](../../../ta/docs/security/GUARDRAILS.md) · 🇮🇳 [te](../../../te/docs/security/GUARDRAILS.md) · 🇹🇭 [th](../../../th/docs/security/GUARDRAILS.md) · 🇹🇷 [tr](../../../tr/docs/security/GUARDRAILS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/GUARDRAILS.md) · 🇵🇰 [ur](../../../ur/docs/security/GUARDRAILS.md) · 🇺🇿 [uz](../../../uz/docs/security/GUARDRAILS.md) · 🇻🇳 [vi](../../../vi/docs/security/GUARDRAILS.md) · 🇳🇬 [yo](../../../yo/docs/security/GUARDRAILS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/GUARDRAILS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/GUARDRAILS.md)

---

> **Fonte da verdade:** `src/lib/guardrails/`
> **Última atualização:** 2026-08-29 — v3.8.51 (A proveniência da transcrição da Video Bridge é declarada pelo chamador,
> ainda não verificada pelo servidor — esclarecido conforme #11661)

Guardrails impõem segurança, política e transformações de conteúdo na fronteira
entre o OmniRoute e os provedores upstream. Cada guardrail pode inspecionar (e
opcionalmente rejeitar, transformar ou anotar) cargas de solicitação (`preCall`) e
respostas upstream (`postCall`).

O sistema é **fail-open**: se um guardrail falhar durante a execução, o registro
registra o erro e continua com o próximo guardrail em vez de falhar a
solicitação. O bloqueio é uma decisão explícita (`block: true`), nunca um acidente.

## Guardrails Integrados

O registro carrega automaticamente seis guardrails em ordem de prioridade na importação
(veja `registry.ts` → `registerDefaultGuardrails()`):

| Prioridade | Nome                | Estágio(s)     | Arquivo               |
| ---------- | ------------------- | -------------- | --------------------- |
| `5`        | `vision-bridge`     | `preCall`      | `visionBridge.ts`     |
| `6`        | `audio-bridge`      | `preCall`      | `audioBridge.ts`      |
| `7`        | `video-bridge`      | `preCall`      | `videoBridge.ts`      |
| `10`       | `pii-masker`        | `pre` + `post` | `piiMasker.ts`        |
| `20`       | `prompt-injection`  | `preCall`      | `promptInjection.ts`  |
| `95`       | `credential-masker` | `pre` + `post` | `credentialMasker.ts` |

Números de prioridade mais baixos são executados **primeiro**.

### Vision Bridge (`visionBridge.ts`) — Modality Bridge PR-1

Intercepta solicitações com imagens destinadas a **modelos não-visuais** e
redireciona a solicitação inteira para um modelo com capacidade de visão ou
substitui as partes da imagem por descrições de texto produzidas por um modelo
de visão configurável antes da chamada upstream. Isso permite que provedores
somente de texto lidem transparentemente com cargas multimodais.

Fluxo:

1. Ignorar se o modelo de destino já suporta visão (a menos que apareça na
   lista de pontes forçadas `isVisionBridgeForcedModel`).
2. Extrair partes da imagem via `extractImageParts(messages)`
   (`visionBridgeHelpers.ts`), que delega ao **detector de mídia unificado**
   `detectMediaParts()` em `open-sse/utils/mediaParts.ts` — a única fonte de
   verdade compartilhada com o filtro de compatibilidade de combinação. A
   extração é permitida para partes de nível superior das formas que
   `replaceImageParts` pode emendar (o contrato extract↔replace): OpenAI
   `image_url`, Anthropic base64 `source.type:"base64"`, Anthropic URL
   `source.type:"url"`, e Responses API `input_image`. Acertos aninhados e
   formas apenas indicadoras são material de filtro de combinação e nunca são
   extraídos. Ignorar se nenhum for encontrado.
3. Resolver a configuração de tempo de execução via
   `resolveVisionBridgeRuntimeSettings()`
   (`src/shared/constants/modalityBridgeDefaults.ts`): as novas chaves de
   configuração `modalityBridge*` prevalecem; as chaves `visionBridge*` legadas
   permanecem como um **fallback de um ciclo** (janela de reversão). Ignorar
   antes de qualquer travessia de mídia quando a ponte estiver desabilitada.
4. O seletor de modo (`modalityBridgeVisionMode`, veja a tabela abaixo) decide
   redirecionar vs. descrever. O redirecionamento retorna `modifiedPayload` com
   apenas `model` trocado, mais meta `{ rerouted, fromModel, toModel,
imagesKept }`.
5. Caminho de descrição: limitar imagens a `maxImages`, compor o prompt
   sensível à tarefa, consultar o cache de descrição, chamar o modelo de visão
   **em paralelo** (`Promise.allSettled`), e injetar partes de texto `[Image
N]: <descrição>` em seus lugares. Uma descrição falha retorna `null` e a
   parte da imagem original é **preservada** (#4012) — exceto no caminho de
   descrição combinada quando todas as descrições falharam, onde um upstream
   não-visual confirmado recebe um stub `(indisponível — nenhum provedor com
capacidade de visão conectado)` em vez disso (#8430).
6. Retorna `modifiedPayload` + meta (`imagesProcessed`, `descriptions`,
   `processingTimeMs`, `visionModel`).

#### Seletor de modo (`modalityBridgeVisionMode`)

| Modo       | Padrão | Comportamento                                                                                                                                                                                                                                                                                                    |
| ---------- | ------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `auto`     | ✔      | Heurística legada, intocada (#6640/#7204): modelos não-combo/`auto/` redirecionam para o melhor modelo de visão, a menos que o modelo original já tenha credenciais utilizáveis (então descreve); alvos combo sempre descrevem.                                                                                  |
| `describe` |        | Sempre descrever — o bloco de redirecionamento é totalmente ignorado; o modelo escolhido pelo usuário sempre responde.                                                                                                                                                                                           |
| `reroute`  |        | Forçar redirecionamento: a guarda de modelo com credenciais é ignorada. A guarda de credenciais do **alvo** de redirecionamento ainda se aplica — quando nenhum alvo de visão utilizável existe, a solicitação passa para descrever para que imagens brutas nunca cheguem a um backend somente de texto (#8430). |

Os modos forçados são ativados **antes** da execução da heurística automática; o
comportamento `auto` é idêntico ao guardrail pré-PR-1.

#### Prompt de descrição sensível à tarefa (`modalityBridgeVisionTaskAware`)

Padrão **true**. `composeVisionPrompt()` (`visionBridgeHelpers.ts`) anexa o
texto da **última mensagem do usuário** (truncado para 500 caracteres) ao
prompt de descrição base, direcionando a descrição para o que o usuário
realmente perguntou (padrão codex-vision-proxy) e pedindo ao modelo de visão
para transcrever o texto visível. Com a flag desativada — ou sem texto do
usuário — o prompt base é usado inalterado.

A própria requisição compatível com OpenAI do self-loop de descrição (`callVisionModelSingle()` em `visionBridgeHelpers.ts`) sempre solicita `image_url.detail: "high"` — incondicionalmente, para cada chamador/provedor, não dependendo de nenhum sinal do cliente. A amostragem de baixo detalhe degrada a precisão do OCR exatamente para a tarefa de transcrição de texto que este prompt solicita, portanto, a própria chamada de descrição sempre solicita alto detalhe, independentemente do nível de detalhe usado na requisição de entrada original. Isso afeta apenas o corpo da requisição de descrição interna; não altera como o OmniRoute encaminha o `image_url.detail` do próprio chamador na requisição primária — esse padrão é aplicado separadamente, e apenas para clientes OpenCode detectados, em `defaultImageDetail()` (`open-sse/handlers/chatCore/upstreamBody.ts`). O ramo de formato de fio Anthropic do self-loop de descrição não possui campo `detail` e não é afetado por nenhum dos padrões.

#### Limite de saída da descrição (`modalityBridgeVisionMaxChars`)

| Chave                          | Padrão | Intervalo        |
| :----------------------------- | :----- | :--------------- |
| `modalityBridgeVisionMaxChars` | `0`    | `0` ou 100–50000 |

`0` (padrão) significa **sem limite** — a descrição retornada por `callVisionModel()` é passada sem modificações, preservando o comportamento existente. Qualquer valor no intervalo de 100 a 50000 trunca a descrição com um sufixo `…` antes de ser reinserida como `[Image N]: <description>` (`VisionBridgeGuardrail.preCall()` em `src/lib/guardrails/visionBridge.ts`). Aumente isso para tarefas de OCR com muitos detalhes onde o modelo downstream precisa da transcrição completa; diminua para limitar o uso de tokens em modelos de visão "tagarelas". O campo do painel está localizado no painel Avançado da aba Visão (`modality-bridge-max-chars` em `ModalityBridgeVisionTab.tsx`) e limita qualquer valor entre 1 e 99 ao piso de 100, enquanto deixa um `0` explícito intocado — `0` é um valor Zod válido por si só (`z.union([z.literal(0), z.number().int().min(100).max(50000)])`), não apenas o padrão "não definido".

#### Cache de descrição (`modalityBridge/bridgeCache.ts`)

Cache LRU + TTL em memória para saídas de descrição, compartilhado em todo o processo. Chave = `sha256(imageRef + composedPrompt + configuredBridgeModel)` com enquadramento de prefixo de comprimento (sem colisões de limite de campo). O componente do modelo é o modelo de ponte **configurado**, não o modelo que realmente respondeu — `callVisionModel` pode ter um fallback interno, e a indexação por tentativa fragmentaria o cache. Descrições falhas nunca são armazenadas em cache. Configurações:

| Chave                           | Padrão | Intervalo |
| :------------------------------ | :----- | :-------- |
| `modalityBridgeCacheEnabled`    | `true` | —         |
| `modalityBridgeCacheTtlMinutes` | `60`   | 1–1440    |
| `modalityBridgeCacheMaxEntries` | `200`  | 10–5000   |

#### Normalização de imagem remota (self-loop de descrição/busca base64)

Quando a ponte busca uma imagem **remota** por si mesma — a auto-chamada de descrição Anthropic e a conversão base64 no formato de fio Claude (`ensureBase64ImagesForClaudeWire`), ambas via `fetchRemoteImageAsDataUri()` em `visionBridgeHelpers.ts` — o URI de dados resultante é passado por `normalizeDataUri()` (`open-sse/utils/imageNormalize.ts`) antes de ser incorporado na requisição do modelo de visão. Imagens superdimensionadas são reduzidas para uma **borda longa de 2048px** (correspondendo ao limite de redimensionamento que OpenAI/Anthropic já aplicam no lado do servidor), o que reduz bytes/latência de upload sem alterar o que o modelo de visão vê. O redimensionamento usa `sharp`, carregado via importação dinâmica: em uma plataforma onde seu binário nativo falha ao carregar, `normalizeDataUri()` **nunca lança um erro** — ele retorna a um passthrough dos bytes originais, de modo que o caminho de descrição/conversão base64 sempre continua funcionando. Bytes não-imagem (uma busca que não retornou uma imagem decodificável) também são passados sem modificações. Esta normalização é restrita a imagens que a ponte busca para sua própria auto-chamada — ela nunca é aplicada ao payload de passthrough bruto do chamador, consistente com o princípio de mutação apenas por opt-in (Regra Rígida #20).

#### Esquema de configurações + migração

As novas chaves `modalityBridge*` são validadas por Zod em `updateSettingsSchema` (`src/shared/validation/settingsSchemas.ts`): `modalityBridgeVisionEnabled`, `modalityBridgeVisionMode`, `modalityBridgeVisionModel`, `modalityBridgeVisionTaskAware`, `modalityBridgeVisionPrompt`, `modalityBridgeVisionTimeout`, `modalityBridgeVisionMaxImages`, `modalityBridgeVisionMaxChars`, o trio `modalityBridgeCache*` e o grupo `modalityBridgeAudio*` usado pela Ponte de Áudio. A migração `141_modality_bridge_settings.sql` copia os valores `visionBridge*` legados existentes para as novas chaves correspondentes (idempotente, nunca sobrescreve um valor `modalityBridge*` definido pelo operador); as chaves legadas permanecem aceitas como um fallback de leitura por um ciclo de lançamento.

#### Cabeçalho de transparência + estatísticas

Respostas transformadas por descrição carregam `x-omniroute-modality-bridge: image->text;model=<visionModel>;parts=<n>` (construído por `buildModalityBridgeHeader()` em `modalityBridge/bridgeStats.ts`, carimbado por `withModalityBridgeHeader()` em `src/sse/handlers/chatHelpers.ts`). Requisições redirecionadas **não** recebem cabeçalho — o payload não foi tocado e a troca de modelo já é visível no campo `model` do corpo da resposta.

`GET /api/modality-bridge/stats` (autenticação de gerenciamento, mesmo nível que `GET /api/settings`) retorna os contadores em memória por modalidade `{ attempts, successes, bridged, cacheHits, failures, totalLatencyMs, latencySamples, averageLatencyMs, lastUsedAt }` para `vision`, `audio` e `video`. `averageLatencyMs` usa `latencySamples`, não todas as tentativas, como seu denominador; uma operação sem medição de tempo não fabrica uma amostra de zero milissegundos. `bridged` permanece o alias retrocompatível para conversões bem-sucedidas; tentativas falhas não o incrementam. Contadores são redefinidos na reinicialização do processo por design (telemetria, não contabilidade).

#### Configuração do painel

A página de painel dedicada é
`/dashboard/settings/modality-bridge`. Suas abas `Vision`, `Audio` e `Video` endereçáveis por URL preservam os parâmetros de consulta ao alternar o valor de `tab`.
A aba Vision expõe habilitação, modo, seleção de modelo (incluindo o padrão automático), prompting sensível à tarefa, limites avançados de tempo limite/imagem/comprimento da descrição/cache, contadores de tempo de execução e uma solicitação de amostra protegida. A aba Audio também está ativa: ela expõe habilitação, um seletor de modelo somente STT com Auto, limites de tempo limite/clipe máximo, contadores de áudio e um teste de amostra `input_audio`. A aba Video é funcional: ela relata o estado de tempo de execução do FFmpeg/ffprobe — um dos quatro estados explícitos da UI (`unknown` enquanto a sondagem está em andamento ou não pôde ser concluída, `restricted` em um host de painel não-loopback onde a sondagem é ignorada no lado do cliente, `unavailable` uma vez sondado e confirmado como ausente, ou `available` com as versões do FFmpeg/ffprobe) — persiste os limites de habilitação/modelo/quadro/vídeo/tempo limite, filtra o seletor de modelo para modelos com capacidade de visão e expõe contadores de vídeo.

O antigo cartão Vision Bridge nas configurações de IA é um link de compatibilidade para a nova página; ele não possui mais uma segunda cópia do formulário. Os Provedores de Mídia também vinculam os fluxos de trabalho de Imagem para Texto e Fala para Texto às abas correspondentes do Modality Bridge sem remover o playground de Fala para Texto existente.

**Bypass de admissão de auto-loop:** quando a chamada de descrição é roteada através do próprio auto-loop `/v1` do OmniRoute (modelo de provedor não-padrão), a sub-solicitação envia `x-omniroute-admission-bypass: internal` e é autenticada com a credencial de auto-loop resolvida — o sentinela local `sk_omniroute` no modo local, ou a chave de ambiente `OMNIROUTE_API_KEY` / `ROUTER_API_KEY` configurada pelo operador (#1350) para que as implantações `REQUIRE_API_KEY=true` ainda possam executar a chamada de descrição. O bypass é honrado apenas para essas credenciais exatas, então clientes externos não podem usar o cabeçalho para pular a admissão.

Os padrões legados residem em `src/shared/constants/visionBridgeDefaults.ts`; os novos padrões de modo/sensíveis à tarefa/cache e o resolvedor de configurações residem em `src/shared/constants/modalityBridgeDefaults.ts`. O guardrail expõe uma opção de construtor `deps` para que os testes possam injetar implementações falsas de `getSettings` e `callVisionModel`.

### Ponte de Áudio (`audioBridge.ts`) — Modality Bridge PR-3

Intercepta solicitações de chat contendo áudio antes que elas atinjam um destino que não é conhecido por aceitar entrada de áudio. Nunca redireciona a solicitação de chat: as partes de áudio são transcritas através do endpoint multipart existente compatível com OpenAI e o modelo de chat escolhido continua com transcrições de texto.

Fluxo:

1.  Resolve `supportsAudio` através de `getResolvedModelCapabilities()`. Metadados explícitos do registro do provedor vencem, depois metadados estáticos do modelo, depois `modalities_input` sincronizados. Uma lista de entrada declarada sem `audio` é `false`; nenhuma evidência de capacidade permanece `null`. Tanto `false` quanto `null` ativam a ponte conservadora, enquanto `true` a ignora.
2.  Resolve as configurações `modalityBridgeAudio*` e extrai partes de áudio de nível superior passíveis de emenda de cada mensagem através do detector compartilhado `detectMediaParts()`. Os formatos de wire suportados são OpenAI `input_audio`, `audio_url` e `source.media_type: "audio/*"`. Áudio aninhado é detectado para roteamento, mas não é removido pelo caminho de emenda. O trabalho é limitado por `modalityBridgeAudioMaxClips`; partes posteriores permanecem intocadas.
3.  Honra um `provider/model` configurado, ou permite que `selectAudioBridgeModel()` percorra `AUDIO_TRANSCRIPTION_PROVIDERS` em ordem de catálogo estável e selecione o primeiro modelo com uma credencial de provedor ativa utilizável.
4.  `callAudioTranscription()` converte áudio base64/data-URI para um `file` multipart, ou baixa um `audio_url` remoto através do guardião de saída somente público com fixação de DNS e um limite de 25 MB. Em seguida, ele POSTa o arquivo e o modelo selecionado para o auto-loop local `/v1/audio/transcriptions`, autenticado com `resolveSelfLoopBearer()`. A rota de transcrição existente realiza a pesquisa normal de credenciais, o tratamento de cooldown/limite de taxa e o despacho do provedor.
5.  Chamadas bem-sucedidas substituem suas partes por `[Audio N]: <transcript>`. As chamadas são executadas com `Promise.allSettled`: uma falha individual preserva aquela parte de áudio original (contrato #4012). Se todas as chamadas falharem e o destino for comprovadamente `supportsAudio === false`, as partes se tornam `[Audio N]: (indisponível — nenhum provedor STT conectado)` (contrato #8430). Para um destino desconhecido (`null`), um resultado de todas as falhas permanece intocado. Um destino comprovadamente somente texto sem credencial STT utilizável recebe o mesmo stub explícito sem emitir uma chamada de rede.

Transcrições bem-sucedidas usam o cache LRU/TTL do Modality Bridge em todo o processo. A chave combina a referência de áudio, o rótulo de operação estável `audio-transcription` e o modelo STT selecionado; falhas nunca são armazenadas em cache. Tentativas de áudio atualizam os contadores compartilhados `bridged`, `cacheHits`, `failures` e `lastUsedAt`. Respostas transformadas carregam `x-omniroute-modality-bridge: audio->text;model=<sttModel>;parts=<n>`; solicitações intocadas não recebem um segmento Audio Bridge.

As configurações de tempo de execução são armazenadas no DB e validadas por Zod:

| Chave                         | Padrão  | Intervalo      |
| ----------------------------- | ------- | -------------- |
| `modalityBridgeAudioEnabled`  | `true`  | —              |
| `modalityBridgeAudioModel`    | `""`    | Auto ou STT ID |
| `modalityBridgeAudioTimeout`  | `60000` | 1000–300000    |
| `modalityBridgeAudioMaxClips` | `3`     | 1–10           |

O cache compartilhado permanece controlado por `modalityBridgeCacheEnabled`, `modalityBridgeCacheTtlMinutes` e `modalityBridgeCacheMaxEntries`.

### Ponte de Vídeo (`videoBridge.ts`, `videoBridgePipeline.ts`)

Intercepta partes de vídeo de nível superior em `messages` e Responses de Chat Completions
API `input` antes que um destino sem suporte nativo a vídeo conhecido seja chamado.
Os formatos suportados são `input_video`, `video_url`, `video_source`, URLs HTTPS
e URIs de dados `data:video/*;base64,...`. Nomes de arquivo simples em texto não são tratados
como vídeo.

`VideoBridgeGuardrail.preCall` (`videoBridge.ts`) é responsável pela travessia da requisição, pela
verificação de capacidade/política, pela agregação por requisição e pelo payload da resposta.
O trabalho por vídeo — aquisição, o cache de resultados completos, a descrição de uma sequência
de quadros (que funde qualquer transcrição de áudio declarada pelo chamador) e métricas/aborto/limpeza
por tentativa — está oculto por trás de `processVideoPart` em
`videoBridgePipeline.ts`, chamado uma vez por parte de vídeo dentro do loop de `preCall`.
Esse módulo também define os limites de porta explícitos `VideoMediaBrokerPort`
(adquirindo bytes e extraindo quadros amostrados), `VideoAudioTranscriptionPort`
(fundindo uma transcrição de áudio declarada pelo chamador com as legendas amostradas) e
`VideoDrilldownPort` (o limite de persistência de drill-down de quadros; ainda não conectado
a `processVideoPart` — apenas a rota separada `/api/modality-bridge/video/drilldown`
escreve entradas de drill-down hoje).

O caminho de requisição público `/v1` nunca importa ou invoca um subprocesso. Vídeos
remotos são baixados com um limite de 50 MiB; vídeos base64 inline têm um
limite conservador de 36 MiB decodificados por vídeo para que o envelope do
modelo/mensagens/enquadramento possa permanecer dentro do limite de admissão de requisição JSON
público de 50 MiB. Estimativas de comprimento inline e tamanho decodificado são verificadas
antes da alocação. HTTPS é exigido na URL remota inicial e em cada redirecionamento,
usando o guarda de saída existente apenas público com fixação de DNS. Os bytes então
cruzam o limite exato do broker interno `POST /api/modality-bridge/video/extract`.
Essa rota é `LOCAL_ONLY` e `SPAWN_CAPABLE`, aceita apenas uma requisição
autenticada por processo, de loopback confiável, e nunca aceita uma URL,
caminho de sistema de arquivos, executável ou lista de argumentos. O pipeline de tamanho de corpo
da API e o leitor de corpo incremental do manipulador impõem independentemente um
limite de entrada do broker de 50 MiB. Sua fila limitada executa uma extração por vez,
permite quatro trabalhos pendentes e limita a entrada pendente a 100 MiB.

Dentro do broker, `ffprobe` lê um arquivo local privado; a lista de permissões de formato
fixo exclui formatos de playlist e manifesto. Para contêineres da família MOV permitidos,
as referências de dados MOV externos permanecem desabilitadas por padrão, e o comando
fixo não as habilita. Tanto `ffprobe` quanto `ffmpeg` usam a lista de permissões de
protocolo somente `file`, um thread, arrays de argumentos fixos, sem shell e
executáveis resolvidos a partir de `PATH`. Fluxos de capa de imagem anexada não são
candidatos reproduzíveis. Todos os fluxos reproduzíveis devem satisfazer os limites,
e um fluxo padrão explícito é preferido antes do fallback determinístico de índice
mais baixo. Os vídeos são limitados a 600 segundos, 8.192 pixels por dimensão e
33.554.432 pixels de origem. O FFmpeg amostra de 1 a 16 quadros JPEG de ponto médio,
reduz a borda mais longa para no máximo 1.024 pixels sem aumentar a escala de entradas
menores e nunca recebe uma URL. A amostragem é `uniform` por padrão. As políticas
opcionais `scene_aware` e experimental `segment_aware` realizam uma passagem FFmpeg
fixa adicional sobre o fluxo local já validado, selecionam timestamps de cena
`showinfo` limitados e retornam deterministicamente aos mesmos pontos médios uniformes
em caso de falha do detector, tempo limite, saída malformada ou um conjunto de candidatos
vazio. O modo segment-aware aloca amostras de ponto médio proporcionalmente aos
intervalos de cena validados; a evidência segment-aware e o comportamento de fallback
são detalhados abaixo. O limite rígido de 16 quadros é
aplicado após a seleção em cada política. Quando uma requisição scene-aware tem um
orçamento de apenas um quadro, ela usa o ponto médio uniforme da janela de vídeo
completo ativa ou de foco e relata `policyEffective: uniform`: um único quadro de
cena selecionado não pode preservar ambas as extremidades temporais. Um chamador pode
opcionalmente fornecer uma janela de foco finita (segundos `start`/`end`); os limites
são ajustados à duração da mídia, janelas invertidas ou não finitas são rejeitadas,
e todas as políticas de amostragem são realizadas apenas dentro do intervalo normalizado.
A janela resultante é incluída nos metadados de amostragem e no prefixo de descrição
não confiável para que os modelos downstream possam distinguir um trecho focado da
linha do tempo completa.

O foco de legenda semântica é uma configuração separada e explícita. O modo de análise
`full` padrão preserva o prompt de quadro existente e nunca encaminha o texto da
requisição para o modelo de legenda. No modo `focused`, a ponte lê apenas o
`text`/`input_text` mais recente e não vazio, de autoria do usuário, do mesmo
contêiner de Chat ou Responses, normaliza-o para NFC, colapsa caracteres de controle
e espaços em branco, e o limita a 500 pontos de código Unicode. Um resultado vazio
retorna ao prompt `full` exato. Uma dica utilizável é serializada como JSON em um
bloco dedicado de contexto de usuário não confiável e pode apenas priorizar detalhes
observáveis; ela não pode substituir o aviso separado contra seguir instruções
visíveis ou audíveis na mídia. O foco textual nunca infere `start`/`end` ou
altera o amostrador temporal.

#### Evidência de segmento estrutural FU-07

`segment_aware` usa uma passagem de pré-análise limitada sobre o fluxo de vídeo local
já validado. A cadeia de filtros fixa primeiro escala para no máximo 320 pixels de
largura, detecta mudanças de cena e intervalos congelados, então amostra a 1 quadro
por segundo para desfoque, luma média e informações espaciais/temporais. A passagem
é limitada a 600 amostras estruturais, um thread FFmpeg/filtro, as mesmas listas
de permissões de protocolo e contêiner somente `file`, um limite de saída de processo
de 1 MiB e no máximo 30 segundos dentro do aborto/prazo compartilhado do broker.
Nunca aceita um comando, filtro, caminho ou URL da requisição.

Os valores estruturais são evidências de amostragem determinística, não compreensão semântica de vídeo. Eles não inferem assuntos, ações, legendas, fala ou intenção do usuário. Limites de cena e de congelamento formam segmentos; a cobertura de congelamento, desfoque, exposição, detalhes espaciais e mudança temporal apenas influenciam como o orçamento existente de 1 a 16 quadros é alocado. Um segmento totalmente congelado é limitado a um quadro, enquanto segmentos não congelados competem pelo orçamento restante. Quando os limites superam o número de quadros, a cobertura uniforme da linha do tempo é mantida para que cortes rápidos iniciais não possam ocultar um longo segmento final. Limites de cena dentro da resolução de análise de 1 segundo de um limite de congelamento são coalescidos.

Filtros ausentes, evidências malformadas/vazias, um erro de detector ou o tempo limite de pré-análise limitado falham abertos para a política exata de ponto médio uniforme. Um aborto do chamador ou prazo do broker não falha aberto: ele encerra o subprocesso em andamento, impede a extração posterior de quadros, e a árvore temporária privada é removida em `finally`.

`scripts/perf/video-bridge-fu07-eval.ts` gera fixtures FFmpeg reais determinísticos para economia de chamadas de legenda pós-deduplicação, alocação de orçamento de movimento denso, evidências de desfoque/exposição/SI-TI, cortes rápidos com uma cauda longa e falsos positivos de fade gradual. Ele registra o tempo de parede de pré-análise e, onde `/usr/bin/time` está disponível, CPU filho e RSS de pico. Suas verificações de qualidade são apenas oráculos estruturais. A qualidade real do modelo de legenda permanece `HOLD` porque este harness não possui um endpoint autorizado ou um juiz congelado. Economias monetárias também permanecem `HOLD` a menos que `--caption-cost-per-call-usd` forneça uma estimativa explícita positiva por chamada; o script nunca fabrica nenhum dos resultados.

Cada quadro é limitado a 4 MiB, todos os quadros brutos juntos a 23 MiB, e a resposta serializada do broker a 32 MiB. Um diretório temporário privado é removido em `finally`. OmniRoute não empacota FFmpeg e não aceita um caminho de executável personalizado. Antes da legendagem, a ponte aplica uma passagem conservadora de deduplicação visual: cada JPEG é reduzido a um buffer em escala de cinza de 16×16 e é comparado apenas com o último quadro retido. Para um orçamento de legenda solicitado acima de um quadro, a extração fornece um pool de candidatos limitado de até o dobro desse orçamento e nunca mais de 16 quadros. O limite solicitado é aplicado somente após a deduplicação, com os primeiros e últimos candidatos selecionados preservados durante o desbaste final quando o orçamento é de pelo menos dois. A política versionada `grayscale-16x16-mean-cells-v2` usa o maior entre o delta médio de luma e a proporção de células de miniatura cujo delta normalizado é de pelo menos 0,05. O limite de duplicidade é a constante 0,04, escolhida pela previsibilidade em vez de ser exposta como uma configuração de tempo de execução. Este sinal secundário de alto contraste preserva pequenos movimentos e mudanças de texto visíveis que uma comparação apenas pela média pode ocultar. Erros do comparador ou decodificador falham abertos e mantêm a cobertura. Os metadados de saída separam os candidatos extraídos, os quadros usados com sucesso e as duplicatas visuais descartadas.

Uma parte de vídeo explicitamente marcada pode solicitar uma folha de contato com carimbo de data/hora. A ponte constrói no máximo uma grade JPEG de 4 colunas e 16 quadros. Cada célula de 512 pixels grava seu carimbo de data/hora de origem em uma faixa inferior de alto contraste, enquanto os mesmos carimbos de data/hora permanecem nos metadados textuais para associação e auditoria a jusante. O JPEG completo permanece limitado a 32 MiB. Se `sharp` não conseguir decodificar ou compor a grade, a ponte retorna aos quadros JPEG individuais; um aborto do cliente ainda se propaga através da operação da folha.

A evidência de promoção é deliberadamente separada do microbenchmark de composição sintética. `scripts/perf/video-bridge-contact-sheet-eval.ts` define um harness A/B com versão de esquema para modelos de visão reais compatíveis com OpenAI. Ele mede tokens relatados pelo provedor, latência de parede de ponta a ponta (incluindo composição da folha), contagem de chamadas de modelo e retenção de fatos definidos pelo manifesto. Respostas brutas do modelo não são gravadas no relatório; apenas digests SHA-256 e IDs de fatos correspondentes são retidos. O harness não faz chamadas de rede ou de modelo pago a menos que `--execute-real` seja passado e `--model`, `OMNIROUTE_BASE_URL` e `OMNIROUTE_API_KEY` estejam configurados. Sem essa execução real explícita, seu veredito legível por máquina permanece `HOLD`; medições sintéticas de payload/contagem de chamadas por si só não são evidências de promoção.

Os chamadores podem anexar um array opcional `transcript.cues` a uma parte de vídeo suportada quando já possuem texto alinhado. Cada cue deve conter `text`, um intervalo `start`/`end` finito dentro da duração sondada, e uma `source` na lista branca (`client`, `embedded` ou `audio-bridge`); `confidence` assume o valor padrão `1` e deve permanecer entre `0` e `1`. Cues duplicados exatos são colapsados. OmniRoute nunca inicia a transcrição a partir desses metadados: cues validados são copiados para o resultado descrito com fonte, confiança e intervalo, e são renderizados como observações não confiáveis ao lado das legendas dos quadros. Texto inválido, fora do intervalo ou sem proveniência é rejeitado em vez de ser misturado ao fluxo de legendas. O campo `source` é atualmente declarado pelo chamador, não verificado pelo servidor: OmniRoute impõe que o valor seja uma das três strings permitidas, mas ainda não confirma criptograficamente que um rótulo `embedded` ou `audio-bridge` realmente veio de uma extração de propriedade do servidor. Trate `source` como uma dica não confiável até que essa verificação seja implementada; não construa decisões de autorização com base nela.

Um chamador avançado pode fornecer uma trilha `audioTranscript` já autorizada para o mesmo vídeo. A junção de fusão executa observações visuais e de áudio sob um único prazo e sinal de aborto, as ordena em uma linha do tempo comum, colapsa duplicatas exatas e relata um resultado parcial quando apenas um lado é bem-sucedido. Um `audioTranscript` inválido degrada para esse resultado parcial — a descrição visual é mantida e o ramo de áudio registra um código de falha sanitizado — em vez de falhar o vídeo inteiro. A disponibilidade por ramo, o sinalizador parcial e os códigos de falha sanitizados são preservados no resultado descrito, nos metadados do guardrail (`audioFusionRuns`/`audioFusionPartials`/`audioFusionFailureCodes`), nos metadados do cache de resultados e nos contadores de fusão da ponte. O caminho padrão do Video Bridge não invoca a conversão de fala em texto nem baixa uma segunda cópia de mídia; sem essa trilha explícita, ele permanece apenas vídeo.

**Retenção de transcrição (#12150 P1).** Isso se aplica automaticamente sempre que o Video Bridge (que é opt-in) renderiza uma deixa de transcrição — não há um sinalizador de retenção separado. Quando uma solicitação renderiza qualquer deixa de transcrição (uma `transcript` declarada pelo chamador ou um `audioTranscript` fundido), o guardrail a marca como `videoBridgeObserved` e produz uma sombra redigida da descrição do vídeo — uma renderização idêntica na qual o corpo de texto livre de cada deixa é substituído por `[redacted-video-transcript]`, construído substituindo o campo de deixa estruturado antes que a string seja montada (nunca analisando o texto achatado, de modo que nenhum conteúdo de deixa — adversário ou comum, incluindo corpos contendo `]` como `[inaudible]`/`[music]` — possa sobreviver). O corpo da solicitação do log de chamadas persistido troca cada parte de texto derivada do vídeo por essa sombra redigida, correspondida por igualdade de conteúdo; o âncora `fullText` é relido do payload do guardrail pré-chamada finalizado, de modo que a correspondência ainda seja bem-sucedida após guardrails de cadeia posteriores (os mascaradores de PII e credenciais, prioridades 10/95) reescreverem o texto da descrição no local e após a injeção de prompt de sistema/handoff/memória remodelar o array de mensagens. O corpo enviado upstream para o modelo permanece inalterado. Uma solicitação observada também não preenche nenhuma Memória durável (tanto a extração derivada da solicitação quanto da resposta são ignoradas), de modo que a própria resposta do modelo não pode ecoar o texto da transcrição na Memória.

Cópias retidas adicionais usam o mesmo sinal de solicitação observada. O snapshot bruto da solicitação do cliente pré-guardrail, a solicitação pendente em memória e o log de solicitações rejeitadas precoces substituem estruturalmente os campos de transcrição em partes de vídeo; prompts de string sintetizados por estágios de pipeline e handoff de contexto são redigidos no sink do corpo da solicitação persistida. O marcador `video_content_removed` persistido faz com que a continuação de `previous_response_id` falhe fechada em vez de reconstruir texto que foi intencionalmente descartado. Se uma solicitação observada perder sua sombra de redação por parte antes do registro, ou mesmo uma das várias sombras de vídeo falhar em corresponder após mutações posteriores da solicitação, o corpo da solicitação retida é omitido inteiramente em vez de reter uma transcrição parcialmente redigida.

Para uma solicitação observada, uma resposta do modelo pode citar qualquer parte da transcrição sem um limite de deixa estruturado. Seu `responseBody` do log de chamadas persistido é, portanto, substituído por um marcador de omissão; o artefato detalhado do pipeline (que pode incluir corpos upstream/cliente e blocos de stream) não é retido. Caches semânticos, de idempotência e de replay de raciocínio ignoram leituras e gravações para essa solicitação. A solicitação do provedor e a resposta visível ao cliente permanecem inalteradas. Bytes de keepalive iniciais são drenados do buffer temporário quando o artefato detalhado é omitido. O aviso de EventStream malformado do Kiro relata apenas a contagem de bytes do payload, nunca seu conteúdo ou o erro bruto do parser JSON. Isso não afirma que todo diagnóstico de provedor/plugin não relacionado foi auditado; a varredura mais ampla do sink retido é rastreada em #11658.

O ciclo de vida interno de `/api/modality-bridge/video/drilldown` é um substrato de cache separado, de loopback/autenticado por token. Toda operação também requer um ID de principal opaco canônico. Antes que um chamador de produção seja habilitado, ele deve derivar esse ID do tenant autenticado e nunca deve encaminhar um valor selecionado pelo cliente. As chaves de cache vinculam esse principal a IDs de sessão canônicas e de referência de vídeo, armazenam apenas suas chaves derivadas de SHA-256 e limitam tanto as leituras quanto a exclusão ao mesmo principal. O cache armazena no máximo 16 quadros JPEG derivados por entrada, os expira após dez minutos e suporta leituras `start`/`end` limitadas ou exclusão explícita de sessão.

Cada principal é limitado a 16 entradas e 64 MiB de dados JPEG canônicos. Esses limites são independentes do teto global de 64 entradas/256 MiB: a pressão da cota do principal remove apenas as entradas menos recentemente usadas desse principal antes que a remoção global por LRU seja considerada. Entradas expiradas são removidas da contabilidade do principal e global na atividade do cache, enquanto o cancelamento e a falha de validação não confirmam uma substituição parcial.

O cache rejeita Base64 não canônico, preenchimento excessivo, mídia não-JPEG, JPEGs malformados ou truncados, e JPEGs que produzem um aviso durante uma decodificação `sharp` de imagem completa limitada. Ele recodifica cada imagem aceita como um JPEG canônico, deriva largura e altura dos bytes decodificados em vez de confiar nos campos do chamador, e descarta quaisquer bytes poliglota finais em vez de retê-los. Apenas o buffer comprimido canônico limitado é cobrado em ambas as cotas. O limite de wire JSON inclui a sobrecarga de Base64 para o teto de entrada decodificada de 32 MiB. Cada derivação armazenada registra seu formato/resolução JPEG validado, política de amostragem, versão da derivação, tempo de criação, hash de conteúdo calculado pelo servidor e referência pai com hash, além do hash de conteúdo pai do chamador confiável. O cancelamento é verificado entre as fases assíncronas de decodificação/hash antes do commit atômico do cache.

Este trecho ainda não conecta um produtor de produção à rota e não oferece
seleção de variantes multi-resolução. O caminho de requisição transparente do
Video Bridge, portanto, não acarreta trabalho adicional, enquanto a derivação
principal vinculada ao locatário e o ciclo de vida completo multi-resolução
FU-08 permanecem como trabalho de acompanhamento explícito, em vez de serem
documentados como comportamento completo.

Os quadros são legendados sequencialmente com o modelo de Vídeo configurado.
Uma substituição de Vídeo vazia herda a configuração do Vision; se ambos
estiverem vazios, o roteador automático do Vision seleciona o modelo eficaz
capaz de visão. Legendas bem-sucedidas substituem a parte original por um
prefixo estável `[Video description:` que também marca o texto como uma
observação não confiável derivada da mídia e instrui os modelos a jusante a
não seguir as instruções encontradas na mídia. As chaves de cache de legenda
de quadro incluem os bytes JPEG, prompt, timestamp e modelo eficaz; apenas
legendas bem-sucedidas são armazenadas em cache. As entradas de cache retêm o
modelo produtor bem-sucedido real, incluindo um modelo de fallback; a ponte
relata `mixed` quando quadros diferentes foram produzidos por modelos
diferentes. Um acerto de cache reutiliza essa identidade de produtor em vez
de rotulá-la novamente como o plano de roteamento solicitado. O cache de
resultados de vídeo completo é indexado por cada entrada que altera a saída
— prompt, modelo eficaz, política de amostragem, contagem de quadros, modo de
análise semântica, a impressão digital SHA-256 da dica de foco normalizada,
janela de foco, `transcript`, `audioTranscript` e o sinalizador de folha de
contato — portanto, alterar qualquer uma dessas dimensões resulta em uma
falha de cache, nunca uma reutilização obsoleta. A versão da política de
dedup visual, o limite e a contagem limitada de quadros candidatos também são
explícitos na chave e nos metadados do cache de resultados; uma mudança de
política, portanto, não pode reutilizar uma descrição de vídeo completo
obsoleta. Os metadados do cache de resultados v4 mantêm o modo e a impressão
digital, nunca a tarefa bruta do usuário. Os metadados do guardrail relatam
os modos de análise solicitados e eficazes; um modo `focused` solicitado sem
texto de usuário utilizável é relatado como efetivamente `full`.

O guardrail extrai todas as partes de vídeo suportadas, mas descreve no
máximo `modalityBridgeVideoMaxVideos`. Para um destino comprovadamente com
`supportsVideo === false`, vídeos falhos e acima do limite tornam-se
marcadores de texto seguros explícitos para que nenhum vídeo bruto sobreviva.
Quando a capacidade é desconhecida, essas partes permanecem intocadas.
Destinos com `supportsVideo === true` ignoram a ponte. O sinal de aborto da
requisição do cliente se propaga através do download, fila do broker,
subprocessos e chamadas de legenda; os abortos param entre os vídeos e nunca
falham abrindo para a mídia bruta.

As configurações de tempo de execução são baseadas em DB e validadas por Zod:

| Key                                 | Default     | Range / behavior                                                                                      |
| ----------------------------------- | ----------- | ----------------------------------------------------------------------------------------------------- |
| `modalityBridgeVideoEnabled`        | `false`     | Tempo de execução opcional, adesão                                                                    |
| `modalityBridgeVideoAnalysisMode`   | `"full"`    | `full` preserva legendas genéricas; `focused` usa contexto limitado e não confiável do último usuário |
| `modalityBridgeVideoModel`          | `""`        | Herda o modelo Vision Bridge                                                                          |
| `modalityBridgeVideoFrameCount`     | `8`         | 1–16                                                                                                  |
| `modalityBridgeVideoSamplingPolicy` | `"uniform"` | `uniform`, `scene_aware`, ou `segment_aware` proporcional; falha do detector retorna a `uniform`      |
| `modalityBridgeVideoMaxVideos`      | `1`         | 1–4                                                                                                   |
| `modalityBridgeVideoTimeout`        | `120000`    | 1000–120000 ms                                                                                        |

Valores de timeout de vídeo persistidos legados acima de 120 segundos são
limitados ao prazo do broker; novas gravações de configurações acima desse
limite são rejeitadas. `GET /api/modality-bridge/video/runtime` requer
localidade de loopback carimbada e confiável antes da autenticação ou
sondagem de tempo de execução, e então requer autenticação de gerenciamento.
Ele retorna apenas `available`, versões sanitizadas do FFmpeg/ffprobe e um
motivo fixo quando o tempo de execução não está disponível. O endpoint de
extração interno não é uma API de upload pública: saturação da fila retorna
`503` mais `Retry-After`, uma desconexão do chamador retorna `499`, e o prazo
fixo do broker retorna `504`. Respostas convertidas adicionam
`video->text;model=<visionModel>;parts=<videos>` ao cabeçalho central
`x-omniroute-modality-bridge` sem remover segmentos de Vision ou Audio.

### Máscara de PII (`piiMasker.ts`)

Executa em **ambas** as etapas.

- **`preCall`** clona o payload, percorre `system`, `messages`, `input` e
  `prompt` (incluindo itens de string simples), e aplica `processPII()`
  (de `@/shared/utils/inputSanitizer`) aos campos de string `content`/`text`.
  Quando `PII_REDACTION_ENABLED=true`, PII detectada é redigida no payload
  de saída. Isso é independente de `INPUT_SANITIZER_MODE` (que apenas
  controla a política de injeção de prompt). Quando a redação está
  desativada, a chamada registra as contagens de detecção sem reescrever o
  conteúdo.
- **`postCall`** clona profundamente a resposta, executa `sanitizePIIResponse()`
  mais o mascarador de formato da API de Respostas (`maskResponsesOutput`
  — cobre `output_text` e `output[].content[].text`). Se ocorrer alguma
  redação, a resposta modificada substitui a original.

O guardrail nunca bloqueia; ele apenas anota (`meta.detections`,
`meta.redacted`) ou reescreve.

### Injeção de Prompt (`promptInjection.ts`)

Detecta estruturas adversárias no conteúdo fornecido pelo usuário e aplica a
política configurada. O comportamento é impulsionado por variáveis de ambiente
e opções do construtor:

| Configuração       | Variável de ambiente                                                                                 | Padrão | Efeito                                                                                                                                                                                                  |
| ------------------ | ---------------------------------------------------------------------------------------------------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Habilitado         | `INPUT_SANITIZER_ENABLED`                                                                            | `true` | Quando `false`, o guardrail entra em curto-circuito.                                                                                                                                                    |
| Modo               | `INJECTION_GUARD_MODE` / `INPUT_SANITIZER_MODE`                                                      | `warn` | Política de injeção: `block`, `warn` ou `log`. (`redact` é aceito para compatibilidade retroativa, mas **não** remove o texto de injeção; a reescrita de PII é controlada por `PII_REDACTION_ENABLED`.) |
| Limite de bloqueio | Opção `blockThreshold` / `INPUT_SANITIZER_BLOCK_THRESHOLD` (alias `INJECTION_GUARD_BLOCK_THRESHOLD`) | `high` | Gravidade mínima necessária para bloquear. Médio é apenas observação por padrão.                                                                                                                        |

**Precedência do modo** (`getMode`): `options.mode` do chamador →
**Substituição de feature-flag do DB** `INJECTION_GUARD_MODE` (Painel → Configurações →
Feature Flags) → `INJECTION_GUARD_MODE` env → `INPUT_SANITIZER_MODE` env →
`warn`. Uma substituição do painel, portanto, prevalece sobre as variáveis de ambiente, de modo que a UI de Feature Flags controla o guardrail em execução ao vivo (sem reinício). A leitura do DB é à prova de falhas: se ocorrer um erro, o guardrail retorna ao comportamento baseado em ambiente, e quando nenhuma substituição é definida, o comportamento é idêntico à resolução apenas por ambiente.

Fontes de detecção:

1. `sanitizeRequest()` de `@/shared/utils/inputSanitizer` (conjunto de detectores compartilhado usado em outras partes do pipeline).
2. `DEFAULT_GUARD_PATTERNS` integrado (atualmente `system_override_inline` e
   `markdown_system_block`, ambos com gravidade `high`).
3. `customPatterns` opcionais passados via opções do construtor (strings, regex,
   ou registros `{ name, pattern, severity }`).

Quando `mode === "block"` **e** pelo menos uma detecção atinge o limite de gravidade,
`preCall` retorna `{ block: true, message: "Request rejected:
suspicious content detected" }`. Nos modos `warn`/`log`, o guardrail registra, mas
permite a chamada. O auxiliar compartilhado `evaluatePromptInjection()` também é exportado
para chamadores que precisam avaliar prompts sem passar pelo registro.

**Limite de varredura (v3.8.20):** o detector inspeciona apenas os **primeiros 16 KB** do
texto do prompt combinado — `MAX_INJECTION_SCAN_BYTES = 16 * 1024` (16 384 bytes) em
`src/shared/utils/inputSanitizer.ts`. Tanto `detectInjection()` quanto
`evaluatePromptInjection()` `slice(0, MAX_INJECTION_SCAN_BYTES)` antes de executar
o loop de padrões. As diretivas de injeção ficam perto do topo de uma entrada, então isso
limita o CPU/GC de regex em payloads de centenas de KB sem enfraquecer a detecção (cf.
#3932, #4041).

### Mascarador de Credenciais (`credentialMasker.ts`)

Executa em **ambas** as etapas, por último na cadeia padrão (prioridade `95`). Redige
padrões conhecidos de chave de API / token secreto do payload de saída (conteúdo da mensagem,
argumentos de chamada de ferramenta, resultados de ferramenta) **e** da resposta do provedor,
para que uma credencial colada em um prompt (ou ecoada de volta por um resultado de ferramenta)
não seja vazada para o provedor upstream ou de volta para o cliente.

- **Apenas opt-in**, mesma convenção da redação de PII (adjacente à Regra Rígida #20):
  desabilitado a menos que `settings.credentialRedactionEnabled === true` **ou**
  `CREDENTIAL_REDACTION_ENABLED=true`. Com ele desativado, o guardrail é uma operação nula —
  ele nunca bloqueia e nunca reescreve.
- `redactCredentials()` percorre a árvore completa de payload/resposta (`walkValue()`,
  seguro contra poluição de protótipo, seguro contra ciclos via `WeakSet`) e substitui
  as correspondências por um placeholder `[REDACTED:<type>]`, clonando apenas os ramos
  que realmente foram alterados.
- `CREDENTIAL_PATTERNS` abrange chaves de provedores de LLM (OpenAI, OpenAI-proj,
  Anthropic, Google, Hugging Face, Replicate), tokens VCS/SaaS (GitHub, Slack,
  Linear, Notion, npm, Postman, Discord), chaves de pagamento (Stripe, Square),
  chaves de nuvem (chave de acesso AWS, Twilio, SendGrid, Mailgun), chaves privadas / JWTs,
  strings de conexão com credenciais (`mongodb://user:pass@...`, etc.), e um padrão
  genérico de valor de cabeçalho `Authorization`/`x-api-key`/`api-key`/`apikey`.
  Chaves com formato de cabeçalho (`authorization`, `x-api-key`, `api-key`, `apikey`)
  são redigidas estruturalmente (apenas o valor, prefixo do esquema como `Bearer `/`Basic `
  preservado) em vez de via regex de texto genérico.
- O guardrail nunca bloqueia; ele apenas reescreve (`modifiedPayload` /
  `modifiedResponse`) e anota (`meta.credentialsRedacted`, `meta.count`).

Guarda de regressão: `tests/unit/credential-masker-guardrail.test.ts`.

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
  block?: boolean; // true short-circuits the chain
  message?: string; // surfaced when blocking
  meta?: Record<string, unknown> | null;
  modifiedPayload?: TValue; // returned by preCall to rewrite the request
  modifiedResponse?: TValue; // returned by postCall to rewrite the response
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

Um guardrail sinaliza "nenhuma alteração" retornando `void`, `{}`, ou
`{ block: false }`. Retornar um `modifiedPayload`/`modifiedResponse` substitui
o valor que flui pela cadeia para guardrails a jusante.
`signal?: AbortSignal` transporta o ciclo de vida do chamador para os guardrails. Um aborto de requisição é a exceção deliberada de falha aberta: as pontes de mídia param o trabalho e a limpeza sem restaurar a mídia bruta para um destino que se sabe não a suportar.

## Registro (`registry.ts`)

O singleton `guardrailRegistry` expõe:

- `register(guardrail)` — adiciona (ou substitui por nome normalizado) um guardrail e
  reordena por `priority` ascendente.
- `clear()` / `list()` — auxiliares administrativos.
- `runPreCallHooks(payload, context)` — itera sobre os guardrails ativos, passa o
  payload através de `modifiedPayload`, e para no primeiro `block: true`.
- `runPostCallHooks(response, context)` — mesmo fluxo no lado da resposta.
- `resetGuardrailsForTests({ registerDefaults })` — limpa o estado e opcionalmente
  registra novamente os padrões para um isolamento de teste limpo.

Ambos os executores retornam `{ blocked, payload|response, results, guardrail?, message? }`
onde `results` é um array de registros `GuardrailExecutionResult` que incluem
os campos `blocked`, `skipped`, `modified`, `error` e `meta` por guardrail,
úteis para rastreamento.

### Desabilitando Guardrails Por Requisição

`resolveDisabledGuardrails({ apiKeyInfo, body, headers })` agrega uma
lista deduplicada de nomes de guardrails que devem ser ignorados para a
requisição atual. Fontes (todas opcionais, todas mescladas):

- `apiKeyInfo.disabledGuardrails`
- Corpo da requisição `disabledGuardrails` (nível superior)
- Corpo da requisição `metadata.disabledGuardrails`
- Cabeçalho `x-omniroute-disabled-guardrails` (ou legado
  `x-disabled-guardrails`)

Os valores podem ser arrays de strings ou uma string separada por vírgulas; os nomes são
normalizados para kebab-case em minúsculas (`pii_masker` → `pii-masker`). O resultado
é passado através de `context.disabledGuardrails` para o registro, que ignora
os guardrails correspondentes (`skipped: true` em `results`).

## Ordem de Execução

Para cada requisição que passa por `src/sse/handlers/chat.ts` e
`open-sse/handlers/chatCore.ts`:

1.  `resolveDisabledGuardrails(...)` constrói a lista de ignorados a partir da chave da API, corpo e cabeçalhos.
2.  `guardrailRegistry.runPreCallHooks(body, ctx)` executa os guardrails em ordem crescente de prioridade:
    - Guardrails desabilitados são registrados como `skipped`.
    - O `preCall` de cada guardrail pode reescrever o payload via `modifiedPayload`.
    - O primeiro `block: true` interrompe a cadeia e o handler retorna uma resposta de rejeição do guardrail.
3.  O payload (potencialmente reescrito) flui para o roteamento combinado e despacho upstream.
4.  Após a resposta ser montada, `guardrailRegistry.runPostCallHooks(...)` executa a mesma cadeia na resposta. `block: true` aqui descarta a resposta upstream.

Guardrails que lançam exceções são registrados com `error: <message>` e logados via
`logger.warn`, mas a cadeia continua — fail-open por design.

## Configuração

Variáveis de ambiente lidas pelos guardrails integrados:

| Variável                              | Usado por                 | Efeito                                                                                                                   |
| :------------------------------------ | :------------------------ | :----------------------------------------------------------------------------------------------------------------------- |
| `INPUT_SANITIZER_ENABLED`             | `prompt-injection`        | Defina `false` para desabilitar a detecção completamente.                                                                |
| `INPUT_SANITIZER_MODE`                | `prompt-injection`        | Política de injeção: `warn`, `block`, ou `log`. O valor legado `redact` não reescreve o texto de injeção.                |
| `INJECTION_GUARD_MODE`                | `prompt-injection`        | Modo para o guardrail de injeção; também uma feature flag do DB que **sobrescreve** as variáveis de ambiente (DB > ENV). |
| `INPUT_SANITIZER_BLOCK_THRESHOLD`     | `prompt-injection`        | Severidade mínima que `MODE=block` rejeita: `high` (padrão), `medium`, ou `low`.                                         |
| `INJECTION_GUARD_BLOCK_THRESHOLD`     | `prompt-injection`        | Alias legado para `INPUT_SANITIZER_BLOCK_THRESHOLD`.                                                                     |
| `PII_REDACTION_ENABLED`               | `pii-masker`              | Quando `true`, PII da requisição é redigida (independente do modo de injeção).                                           |
| `PII_RESPONSE_SANITIZATION` / `_MODE` | `pii-masker` (downstream) | Controla o comportamento do mascarador no lado da resposta.                                                              |

Os guardrails do Modality Bridge leem a configuração de tempo de execução do armazenamento de configurações baseado em DB (`getSettings()`), e não das variáveis de ambiente. As chaves primárias do Vision são
`modalityBridgeVisionEnabled`, `modalityBridgeVisionMode`,
`modalityBridgeVisionModel`, `modalityBridgeVisionTaskAware`,
`modalityBridgeVisionPrompt`, `modalityBridgeVisionTimeout`,
`modalityBridgeVisionMaxImages`, `modalityBridgeVisionMaxChars`,
`modalityBridgeCacheEnabled`, `modalityBridgeCacheTtlMinutes`, e
`modalityBridgeCacheMaxEntries`. As chaves legadas
`visionBridge*` são aceitas apenas como o fallback de leitura de um ciclo documentado; as escritas do dashboard usam as chaves primárias. Os padrões e o resolvedor de fallback residem em `src/shared/constants/modalityBridgeDefaults.ts`, com as constantes legadas mantidas em `src/shared/constants/visionBridgeDefaults.ts`.

O Áudio usa `modalityBridgeAudioEnabled`, `modalityBridgeAudioModel`, `modalityBridgeAudioTimeout`, e `modalityBridgeAudioMaxClips`, além das configurações compartilhadas `modalityBridgeCache*`. O Áudio não possui fallback de chave legada porque essas chaves foram introduzidas com o esquema do Modality Bridge.

O Vídeo usa `modalityBridgeVideoEnabled`, `modalityBridgeVideoAnalysisMode`,
`modalityBridgeVideoModel`,
`modalityBridgeVideoFrameCount`, `modalityBridgeVideoSamplingPolicy`,
`modalityBridgeVideoMaxVideos`, e
`modalityBridgeVideoTimeout`, além das configurações compartilhadas `modalityBridgeCache*`.
Ele é desabilitado por padrão porque FFmpeg/ffprobe são dependências operacionais opcionais e a legendagem de quadros adiciona latência e custo de modelo.

## Guardrails Personalizados

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

1. Crie `src/lib/guardrails/myGuardrail.ts` estendendo `BaseGuardrail`.
2. Implemente `preCall` e/ou `postCall`.
3. Registre no momento da importação (push de `registerDefaultGuardrails`) ou
   chame `guardrailRegistry.register(...)` em tempo de execução — o registro substitui
   qualquer guardrail anterior com o mesmo nome normalizado.
4. Adicione testes em `tests/unit/` (exemplos existentes:
   `tests/unit/guardrails-registry.test.ts`,
   `tests/unit/prompt-injection-guard.test.ts`,
   `tests/unit/guardrails/visionBridge.test.ts`).

## Testando

Use `resetGuardrailsForTests()` entre os testes para começar de um estado conhecido.
Passe `{ registerDefaults: false }` para começar com um registro vazio e
registrar apenas os guardrails em teste. O Vision Bridge aceita injeção de dependência
(`deps.getSettings`, `deps.callVisionModel`); o Audio Bridge expõe as
equivalentes para configurações, capacidades, seleção de modelo STT, verificações de credenciais e transcrição. Os testes podem, portanto, exercitar ambos os fluxos sem acesso a DB ou rede.

## Veja Também

- `src/lib/guardrails/` — implementação
- `src/shared/utils/inputSanitizer.ts` — detector compartilhado que alimenta
  a injeção de prompt e a mascaramento de PII
- `src/shared/constants/visionBridgeDefaults.ts` — Padrões do Vision Bridge e
  lista de modelos de ponte forçada
- `src/shared/constants/modalityBridgeDefaults.ts` — Padrões de tempo de execução compartilhados Vision/Audio
- `docs/architecture/RESILIENCE_GUIDE.md` — camada ortogonal (disjuntor, resfriamentos)
- `docs/reference/ENVIRONMENT.md` — referência completa de variáveis de ambiente

## Cobertura de rota de proteção contra injeção e equipe vermelha (Fase 8 · Bloco D)

A proteção contra injeção (`createInjectionGuard` / `withInjectionGuard`) cobre todas as rotas
que aceitam prompts de usuário. Ela respeita `INJECTION_GUARD_MODE` (padrão `warn` = apenas log;
`block` = retorna HTTP 400 `SECURITY_001`).

| Tipo              | Rotas                                                                                                                                                | Modo padrão |
| ----------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| Texto (existente) | `/v1/chat/completions`, `/v1/completions`, `/v1/relay/chat/completions`                                                                              | warn        |
| Generativo        | `/v1/messages`, `/v1/responses`, `/v1/images/generations`, `/v1/images/edits`, `/v1/videos/generations`, `/v1/music/generations`, `/v1/audio/speech` | warn        |
| Dados             | `/v1/embeddings`, `/v1/rerank`, `/v1/search`, `/v1/moderations`                                                                                      | warn        |

A extração de texto (`extractMessageContents`) cobre `messages`/`input`/`prompt`/`query`+`documents`/`instructions`/`system`.

**Equipe vermelha (noturno, `nightly-llm-security.yml`):** promptfoo valida que cada rota bloqueia
o corpus OWASP-LLM em `INJECTION_GUARD_MODE=block`; garak executa sondas (ignora sem segredo).
`moderations` está incluído para consistência — operadores em modo de bloqueio podem isentá-lo via
`resolveDisabledGuardrails`.

O fluxo de trabalho noturno (`.github/workflows/nightly-llm-security.yml`, cron + despacho manual)
tem dois trabalhos:

- **`promptfoo-guard` (bloqueio)** — executa `promptfoo eval -c promptfooconfig.yaml`
  com `INJECTION_GUARD_MODE=block`. Cada caso adversarial (por exemplo, "ignore todas
  as instruções anteriores...", jailbreaks estilo DAN) afirma que a resposta contém
  `error.code === "SECURITY_001"`, ou seja, a proteção realmente rejeitou a solicitação.
- **`garak` (consultivo)** — executa garak `--probes promptinject,dan,leakreplay`
  contra uma instância local do OmniRoute (`http://localhost:20128/v1`). Protegido por um
  segredo do provedor (`PROMPTFOO_PROVIDER_KEY`); ignora graciosamente e é sufixado
  `|| true`, para que ele relate sem falhar o CI.

A cobertura do auxiliar de proteção (`createInjectionGuard` / `withInjectionGuard`)
abrange todas as rotas `/v1` que contêm prompts; o texto do prompt é extraído de
`messages`/`input`/`prompt`/`query`+`documents`/`instructions`/`system` por
`extractMessageContents()` em `src/shared/utils/inputSanitizer.ts`.
