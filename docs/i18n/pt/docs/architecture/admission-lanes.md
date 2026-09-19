# Admission lanes (#9654) — two lane systems, what gates each, where each reports (Português (Portugal))

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/admission-lanes.md) · 🇪🇹 [am](../../../am/docs/architecture/admission-lanes.md) · 🇸🇦 [ar](../../../ar/docs/architecture/admission-lanes.md) · 🇦🇿 [az](../../../az/docs/architecture/admission-lanes.md) · 🇧🇬 [bg](../../../bg/docs/architecture/admission-lanes.md) · 🇧🇩 [bn](../../../bn/docs/architecture/admission-lanes.md) · 🇧🇦 [bs](../../../bs/docs/architecture/admission-lanes.md) · 🇨🇿 [cs](../../../cs/docs/architecture/admission-lanes.md) · 🇩🇰 [da](../../../da/docs/architecture/admission-lanes.md) · 🇩🇪 [de](../../../de/docs/architecture/admission-lanes.md) · 🇬🇷 [el](../../../el/docs/architecture/admission-lanes.md) · 🇪🇸 [es](../../../es/docs/architecture/admission-lanes.md) · 🇪🇪 [et](../../../et/docs/architecture/admission-lanes.md) · 🇮🇷 [fa](../../../fa/docs/architecture/admission-lanes.md) · 🇫🇮 [fi](../../../fi/docs/architecture/admission-lanes.md) · 🇫🇷 [fr](../../../fr/docs/architecture/admission-lanes.md) · 🇮🇪 [ga](../../../ga/docs/architecture/admission-lanes.md) · 🇮🇳 [gu](../../../gu/docs/architecture/admission-lanes.md) · 🇳🇬 [ha](../../../ha/docs/architecture/admission-lanes.md) · 🇮🇱 [he](../../../he/docs/architecture/admission-lanes.md) · 🇮🇳 [hi](../../../hi/docs/architecture/admission-lanes.md) · 🇭🇷 [hr](../../../hr/docs/architecture/admission-lanes.md) · 🇭🇺 [hu](../../../hu/docs/architecture/admission-lanes.md) · 🇦🇲 [hy](../../../hy/docs/architecture/admission-lanes.md) · 🇮🇩 [id](../../../id/docs/architecture/admission-lanes.md) · 🇳🇬 [ig](../../../ig/docs/architecture/admission-lanes.md) · 🇮🇹 [it](../../../it/docs/architecture/admission-lanes.md) · 🇯🇵 [ja](../../../ja/docs/architecture/admission-lanes.md) · 🇬🇪 [ka](../../../ka/docs/architecture/admission-lanes.md) · 🇰🇭 [km](../../../km/docs/architecture/admission-lanes.md) · 🇮🇳 [kn](../../../kn/docs/architecture/admission-lanes.md) · 🇰🇷 [ko](../../../ko/docs/architecture/admission-lanes.md) · 🇱🇹 [lt](../../../lt/docs/architecture/admission-lanes.md) · 🇱🇻 [lv](../../../lv/docs/architecture/admission-lanes.md) · 🇮🇳 [ml](../../../ml/docs/architecture/admission-lanes.md) · 🇮🇳 [mr](../../../mr/docs/architecture/admission-lanes.md) · 🇲🇾 [ms](../../../ms/docs/architecture/admission-lanes.md) · 🇲🇹 [mt](../../../mt/docs/architecture/admission-lanes.md) · 🇲🇲 [my](../../../my/docs/architecture/admission-lanes.md) · 🇳🇵 [ne](../../../ne/docs/architecture/admission-lanes.md) · 🇳🇱 [nl](../../../nl/docs/architecture/admission-lanes.md) · 🇳🇴 [no](../../../no/docs/architecture/admission-lanes.md) · 🇮🇳 [or](../../../or/docs/architecture/admission-lanes.md) · 🇮🇳 [pa](../../../pa/docs/architecture/admission-lanes.md) · 🇵🇭 [phi](../../../phi/docs/architecture/admission-lanes.md) · 🇵🇱 [pl](../../../pl/docs/architecture/admission-lanes.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/admission-lanes.md) · 🇷🇴 [ro](../../../ro/docs/architecture/admission-lanes.md) · 🇷🇺 [ru](../../../ru/docs/architecture/admission-lanes.md) · 🇱🇰 [si](../../../si/docs/architecture/admission-lanes.md) · 🇸🇰 [sk](../../../sk/docs/architecture/admission-lanes.md) · 🇸🇮 [sl](../../../sl/docs/architecture/admission-lanes.md) · 🇷🇸 [sr](../../../sr/docs/architecture/admission-lanes.md) · 🇸🇪 [sv](../../../sv/docs/architecture/admission-lanes.md) · 🇰🇪 [sw](../../../sw/docs/architecture/admission-lanes.md) · 🇮🇳 [ta](../../../ta/docs/architecture/admission-lanes.md) · 🇮🇳 [te](../../../te/docs/architecture/admission-lanes.md) · 🇹🇭 [th](../../../th/docs/architecture/admission-lanes.md) · 🇹🇷 [tr](../../../tr/docs/architecture/admission-lanes.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/admission-lanes.md) · 🇵🇰 [ur](../../../ur/docs/architecture/admission-lanes.md) · 🇺🇿 [uz](../../../uz/docs/architecture/admission-lanes.md) · 🇻🇳 [vi](../../../vi/docs/architecture/admission-lanes.md) · 🇳🇬 [yo](../../../yo/docs/architecture/admission-lanes.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/admission-lanes.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/admission-lanes.md)

---

O OmniRoute tem **dois** sistemas de vias locais ao processo com âmbitos diferentes. São
complementares; os operadores devem saber qual deles estão a observar.

## 1. Admissão ao nível dos bytes em todo o processo (`chatBodyAdmission.ts`)

- **Âmbito:** o caminho de corpos em buffer/heap para `POST /v1/chat/completions`,
  `/v1/messages`, `/v1/responses` e as restantes rotas com formato de chat. Protege
  contra a amplificação do heap causada por corpos de grandes dimensões de agentes
  de programação (#4380).
- **Um controlador global por processo, não vias por chave (#10110).** Cada chave
  de API (sob a forma de hash) ou sessão `anonymous` é admitida relativamente ao
  **mesmo** orçamento partilhado — o ID de sessão sob a forma de hash é utilizado
  APENAS como chave de escalonamento equitativo (distribuição round-robin entre
  pedidos em espera), nunca como partição de capacidade. Uma versão anterior deste
  documento descrevia vias por chave com capacidade independente; esse modelo foi
  removido em #10110 porque permitia que credenciais falsas não autenticadas
  multiplicassem o limite aplicável a todo o processo.
- **Controlo de admissão (#503-fanout): um orçamento de ingestão em BYTES derivado
  automaticamente, não um número fixo de pedidos.** O limite legado de contagem
  de pedidos `CHAT_MAX_HEAVY_IN_FLIGHT` (predefinição `1` antes desta correção)
  reduzia a expansão em leque dos agentes de programação (vários subagentes/CLIs,
  com corpos frequentemente > 256 KB) a uma concorrência efetiva de ~1, o que
  resultava em respostas 503 sob uma carga perfeitamente normal. Agora, este
  limite só se aplica quando um operador define explicitamente
  `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT`. Se não for definido, a admissão é antes
  controlada por `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` — um orçamento derivado
  automaticamente do limite real de memória do processo
  (`src/shared/middleware/admissionBudget.ts`): 25% do menor valor entre o limite
  do heap do V8 e qualquer limite de cgroup/contentor, dividido por um fator de
  amplificação transitória de 8x e restringido ao intervalo entre 8 MiB e 2 GiB.
  As substituições explícitas utilizam os mesmos limites. Isto ajusta-se
  automaticamente desde um contentor de 512 MB até um computador de secretária
  com 32 GB, sem ser necessário ajustar variáveis de ambiente. Um corpo que não
  caiba no orçamento efetivo falha imediatamente com `413 body_exceeds_budget`;
  apenas a contenção entre corpos que podem ser processados individualmente entra
  na fila limitada com distribuição equitativa. Um monitor de pressão de recursos
  em tempo real e baseado em vários sinais (rácio do heap do V8, cgroup, PSI,
  eventos OOM — `open-sse/utils/resourcePressurePolicy.ts`) reduz o tempo de espera
  limitado sob pressão `high` e rejeita imediatamente com
  `503 resource_pressure` sob pressão `critical`, antes sequer de serem ingeridos
  quaisquer bytes.
- **Ajuste:**
  - `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` — substituição do orçamento de bytes derivado automaticamente
  - `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT` — limite legado de contagem de pedidos, apenas por adesão explícita
  - `OMNIROUTE_CHAT_ADMISSION_QUEUE_MS` — tempo de espera na fila antes de 503 (predefinição 2000)
  - `OMNIROUTE_CHAT_ADMISSION_MAX_QUEUED_BYTES` — válvula de heap para bytes em fila (predefinição 4 MB)
  - `OMNIROUTE_CHAT_VIRTUAL_TTL_MS` / `OMNIROUTE_CHAT_VIRTUAL_MAX_SESSIONS` — obsoletos
    e sem efeito desde #10110 (aceites para compatibilidade de configuração, ignorados)
- **Relatórios:** `GET /api/monitoring/health` → `chatAdmission` (#11244) — incluindo
  as adições de #503-fanout `inflightBytes`, `maxInflightBytes`, `budgetSource`
  (`v8_heap` | `cgroup` | `override`), `pressureSeverity` e `countCapEnabled`
  (false numa implementação predefinida — confirma que é o orçamento de bytes, e
  não o limite legado de contagem, que está efetivamente a restringir a admissão).

## 2. Vias virtuais adaptativas em tempo de execução (`open-sse/services/admission`)

- **Âmbito:** admissão por chave de inquilino para encaminhamento ao fornecedor — custo da fila, adaptação de limites orientada pela latência, colocação em filas por via e métricas das vias.
- **Ativação:** **opcional.** Desativado, exceto se `OMNIROUTE_CHAT_VIRTUAL_LANES=true`. Sem esta opção, o controlador adaptativo mantém o comportamento de fila partilhada (o critério 1 de #9654 só é cumprido quando um operador ativa as vias).
- **Ajuste:** `OMNIROUTE_CHAT_VIRTUAL_LANES` + configuração adaptativa (`maxQueueCount`, `maxQueueCost`, `defaultMaxWaitMs`, …).
- **Relatórios:** `GET /api/monitoring/health` → `adaptiveAdmission` → `laneCount`, `laneQueuedCount`, `laneQueuedCost`, `laneTenants` (IDs de via opacos, nunca chaves em bruto) e `virtualLanes` — o indicador autoritativo no instantâneo de que «as vias estão ativas».

## 3. Sondas de fan-out — admissão por destino para combo/fusion (#9654 Vaga 2)

Combo (prioridade / round-robin) e fusion distribuem por fan-out N destinos de modelo numa única
solicitação principal. Desde a Vaga 2 de #9654, **cada destino de fan-out é sujeito a controlo antes do encaminhamento** por uma
sonda por destino (`PerTargetAdmissionHook`, criada por `createPerTargetAdmissionHook`)
relativamente à via de inquilino da solicitação **principal**.

- **Âmbito:** todos os destinos de fan-out encaminhados por combo, fusion e pelo motor de caos.
  O sistema 1 (ao nível dos bytes) não é afetado — nunca sonda destinos de fan-out.
- **Ativação:** **opcional com o sistema 2.** Não efetua qualquer operação quando `OMNIROUTE_CHAT_VIRTUAL_LANES`
  não está definido — nesse modo, a solicitação principal já detém a concessão da fila partilhada,
  pelo que a sondagem faria uma contagem dupla e rejeitaria destinos de combo.
- **Semântica:**
  - **Estritamente não bloqueante — ignorar, nunca colocar em fila.** `maxWaitMs 0`: uma via cheia
    ignora o destino e, em alternativa, responde através do mecanismo de recurso do combo (ou do painel
    de sobreviventes do fusion). Isto é intencional: um destino de fan-out é trabalho
    redundante, e colocá-lo em fila acumula mais carga precisamente sobre o congestionamento que as vias
    existem para impedir. Por conseguinte, `defaultMaxWaitMs` aplica-se **apenas à solicitação principal**;
    as sondas de fan-out nunca esperam e, intencionalmente, **não existe qualquer parâmetro** que permita
    fazê-las esperar (o histórico do problema mostra que os parâmetros de espera produziram a classe
    de erros 502/504 em massa que #9654 impede — esta decisão só deverá ser revista se um operador comunicar
    que os destinos de fan-out ignorados estão a prejudicar a qualidade das respostas).
  - **Libertação após admissão.** Uma sonda admitida liberta imediatamente a sua concessão: funciona
    como um controlo de capacidade, não como uma retenção. A concessão da solicitação principal abrange o fan-out; reter mais N
    concessões aumentaria artificialmente o custo ativo partilhado e rejeitaria outros inquilinos. É um mecanismo de melhor esforço,
    não uma reserva: a via pode voltar a encher entre a sondagem e o encaminhamento, pelo que, em caso de
    contenção intensa, o controlo poderá admitir um destino numa via que já estará novamente cheia no
    momento em que o destino for encaminhado.
  - **Custo calculado a partir do corpo real do fan-out.** A sonda estima o custo a partir do
    corpo real do destino — incluindo a classe da solicitação derivada do respetivo indicador `stream`,
    exatamente como no percurso principal — pelo que os membros do painel do fusion (`stream: false`)
    são contabilizados de acordo com a classe sem transmissão em fluxo que irão realmente ocupar, e os destinos de prioridade/RR
    de acordo com o que o utilizador tiver solicitado.
- **Relatórios:** ignorar uma sonda após o primeiro destino incrementa o `fallbackCount` por solicitação
  do combo (refletindo a semântica de recurso existente; visível nos registos do combo);
  o fusion devolve 503 quando todos os membros do painel são ignorados. Atualmente,
  **não existe qualquer contador agregado** (por exemplo, `virtualFanoutSkipped`) no instantâneo —
  se um operador comunicar que não consegue determinar com que frequência o controlo de vias ignora destinos de fan-out,
  esse será o motivo para adicionar um.

## Qual deles aparece num painel

- `adaptiveAdmission.laneCount` / `laneTenants` → **vias virtuais adaptativas** (sistema 2).
- `adaptiveAdmission.virtualLanes === true` → as sondagens de distribuição da secção 3
  também estão ativas. Um payload sem `virtualLanes` ou com o valor `false` significa
  que `OMNIROUTE_CHAT_VIRTUAL_LANES` não está definida — as vias ao nível dos bytes
  (sistema 1) continuam ativas, mas nada em `adaptiveAdmission` (nem qualquer controlo
  de distribuição) entra em vigor até ser ativado.

## Porque existem ambos

As vias ao nível dos bytes limitam o percurso de análise/compressão que consome muita
memória; as vias adaptativas limitam o custo de encaminhamento por tenant. O critério 1
do #9654 («o pico de uma sessão não provoca um 503 noutra») é imposto incondicionalmente
pelo sistema 1 e pelo sistema 2 assim que a ativação opcional é efetuada.

## 4. `/v1/responses` longas num único processo (margem saudável)

O [#10437](https://github.com/diegosouzapw/OmniRoute/pull/10437) adicionou
`tryAcquireHealthyHeadroom` para que um segundo pedido estruturalmente pesado seja
admitido quando a heap está abaixo de `OMNIROUTE_CHAT_ADMISSION_HEAP_SHED_RATIO`. O
percurso BYTE utilizado por `admitChatRequest` (corpos ≥
`OMNIROUTE_CHAT_LARGE_BODY_BYTES`, predefinição de 256 KiB, incluindo
`POST /v1/responses`) utiliza a **mesma** exceção.

Esta é a configuração suportada de **um único processo** para mais de duas
`/v1/responses` SSE longas em simultâneo: aumente a capacidade principal + a margem
saudável apenas até onde a heap e o orçamento de bytes em curso para todo o processo
(`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` / #10110) permitirem. Dezenas de clientes SSE
de longa duração (40–50) são uma questão desse orçamento de memória, não um limite
rígido do produto de «máx. 2». Uma heap sob pressão continua a rejeitar pedidos com
um `503` repetível, para que o #7849 não regresse.

Para **multiplicar heaps**, execute N `DATA_DIR`s independentes (#11024). Nunca utilize
`replicas > 1` num único ficheiro SQLite (#10350). Esta secção não reabre a
configuração de expansão horizontal através de DATA_DIR.
