# Admission lanes (#9654) — two lane systems, what gates each, where each reports (Português (Brasil))

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/admission-lanes.md) · 🇪🇹 [am](../../../am/docs/architecture/admission-lanes.md) · 🇸🇦 [ar](../../../ar/docs/architecture/admission-lanes.md) · 🇦🇿 [az](../../../az/docs/architecture/admission-lanes.md) · 🇧🇬 [bg](../../../bg/docs/architecture/admission-lanes.md) · 🇧🇩 [bn](../../../bn/docs/architecture/admission-lanes.md) · 🇧🇦 [bs](../../../bs/docs/architecture/admission-lanes.md) · 🇨🇿 [cs](../../../cs/docs/architecture/admission-lanes.md) · 🇩🇰 [da](../../../da/docs/architecture/admission-lanes.md) · 🇩🇪 [de](../../../de/docs/architecture/admission-lanes.md) · 🇬🇷 [el](../../../el/docs/architecture/admission-lanes.md) · 🇪🇸 [es](../../../es/docs/architecture/admission-lanes.md) · 🇪🇪 [et](../../../et/docs/architecture/admission-lanes.md) · 🇮🇷 [fa](../../../fa/docs/architecture/admission-lanes.md) · 🇫🇮 [fi](../../../fi/docs/architecture/admission-lanes.md) · 🇫🇷 [fr](../../../fr/docs/architecture/admission-lanes.md) · 🇮🇪 [ga](../../../ga/docs/architecture/admission-lanes.md) · 🇮🇳 [gu](../../../gu/docs/architecture/admission-lanes.md) · 🇳🇬 [ha](../../../ha/docs/architecture/admission-lanes.md) · 🇮🇱 [he](../../../he/docs/architecture/admission-lanes.md) · 🇮🇳 [hi](../../../hi/docs/architecture/admission-lanes.md) · 🇭🇷 [hr](../../../hr/docs/architecture/admission-lanes.md) · 🇭🇺 [hu](../../../hu/docs/architecture/admission-lanes.md) · 🇦🇲 [hy](../../../hy/docs/architecture/admission-lanes.md) · 🇮🇩 [id](../../../id/docs/architecture/admission-lanes.md) · 🇳🇬 [ig](../../../ig/docs/architecture/admission-lanes.md) · 🇮🇹 [it](../../../it/docs/architecture/admission-lanes.md) · 🇯🇵 [ja](../../../ja/docs/architecture/admission-lanes.md) · 🇬🇪 [ka](../../../ka/docs/architecture/admission-lanes.md) · 🇰🇭 [km](../../../km/docs/architecture/admission-lanes.md) · 🇮🇳 [kn](../../../kn/docs/architecture/admission-lanes.md) · 🇰🇷 [ko](../../../ko/docs/architecture/admission-lanes.md) · 🇱🇹 [lt](../../../lt/docs/architecture/admission-lanes.md) · 🇱🇻 [lv](../../../lv/docs/architecture/admission-lanes.md) · 🇮🇳 [ml](../../../ml/docs/architecture/admission-lanes.md) · 🇮🇳 [mr](../../../mr/docs/architecture/admission-lanes.md) · 🇲🇾 [ms](../../../ms/docs/architecture/admission-lanes.md) · 🇲🇹 [mt](../../../mt/docs/architecture/admission-lanes.md) · 🇲🇲 [my](../../../my/docs/architecture/admission-lanes.md) · 🇳🇵 [ne](../../../ne/docs/architecture/admission-lanes.md) · 🇳🇱 [nl](../../../nl/docs/architecture/admission-lanes.md) · 🇳🇴 [no](../../../no/docs/architecture/admission-lanes.md) · 🇮🇳 [or](../../../or/docs/architecture/admission-lanes.md) · 🇮🇳 [pa](../../../pa/docs/architecture/admission-lanes.md) · 🇵🇭 [phi](../../../phi/docs/architecture/admission-lanes.md) · 🇵🇱 [pl](../../../pl/docs/architecture/admission-lanes.md) · 🇵🇹 [pt](../../../pt/docs/architecture/admission-lanes.md) · 🇷🇴 [ro](../../../ro/docs/architecture/admission-lanes.md) · 🇷🇺 [ru](../../../ru/docs/architecture/admission-lanes.md) · 🇱🇰 [si](../../../si/docs/architecture/admission-lanes.md) · 🇸🇰 [sk](../../../sk/docs/architecture/admission-lanes.md) · 🇸🇮 [sl](../../../sl/docs/architecture/admission-lanes.md) · 🇷🇸 [sr](../../../sr/docs/architecture/admission-lanes.md) · 🇸🇪 [sv](../../../sv/docs/architecture/admission-lanes.md) · 🇰🇪 [sw](../../../sw/docs/architecture/admission-lanes.md) · 🇮🇳 [ta](../../../ta/docs/architecture/admission-lanes.md) · 🇮🇳 [te](../../../te/docs/architecture/admission-lanes.md) · 🇹🇭 [th](../../../th/docs/architecture/admission-lanes.md) · 🇹🇷 [tr](../../../tr/docs/architecture/admission-lanes.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/admission-lanes.md) · 🇵🇰 [ur](../../../ur/docs/architecture/admission-lanes.md) · 🇺🇿 [uz](../../../uz/docs/architecture/admission-lanes.md) · 🇻🇳 [vi](../../../vi/docs/architecture/admission-lanes.md) · 🇳🇬 [yo](../../../yo/docs/architecture/admission-lanes.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/admission-lanes.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/admission-lanes.md)

---

OmniRoute tem **dois** sistemas de faixas locais ao processo, com escopos diferentes. Eles são
complementares; os operadores devem saber qual deles estão observando.

## 1. Admissão em nível de bytes para todo o processo (`chatBodyAdmission.ts`)

- **Escopo:** o caminho de corpo em buffer/heap para `POST /v1/chat/completions`,
  `/v1/messages`, `/v1/responses` e as outras rotas no formato de chat. Protege
  contra a amplificação do heap causada por corpos grandes de agentes de programação (#4380).
- **Um controlador global por processo, não faixas por chave (#10110).** Cada chave de API
  (com hash) ou sessão `anonymous` é admitida com base no **mesmo** orçamento compartilhado —
  o ID da sessão com hash é usado SOMENTE como uma chave de escalonamento justo (distribuição
  round-robin entre requisições em espera), nunca como uma partição de capacidade. Uma versão
  anterior deste documento descrevia faixas por chave com capacidades independentes; esse modelo
  foi removido em #10110 porque permitia que credenciais falsas não autenticadas multiplicassem
  o limite para todo o processo.
- **Controle (#503-fanout): um orçamento de ingestão em BYTES derivado automaticamente, não uma
  contagem fixa de requisições.** O limite legado de contagem de requisições
  `CHAT_MAX_HEAVY_IN_FLIGHT` (padrão `1` antes desta correção) reduzia o fan-out de agentes de
  programação (vários subagentes/CLIs, com corpos rotineiramente > 256 KB) a uma concorrência
  efetiva de ~1, o que retornava 503 sob carga completamente normal. Agora, ele somente impõe
  um limite quando um operador define explicitamente `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT`.
  Quando não definido, a admissão é controlada por `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` — um
  orçamento derivado automaticamente do limite real de memória do processo
  (`src/shared/middleware/admissionBudget.ts`): 25% do menor valor entre o limite de heap do V8
  e qualquer limite de cgroup/contêiner, dividido por um fator de amplificação transitória de 8x
  e restrito ao intervalo entre 8 MiB e 2 GiB. Substituições explícitas usam os mesmos limites.
  Isso se dimensiona automaticamente de um contêiner de 512 MB até um desktop de 32 GB, sem
  ajustes de variáveis de ambiente. Um corpo que não caiba no orçamento efetivo falha
  imediatamente com `413 body_exceeds_budget`; somente a contenção entre corpos que podem ser
  atendidos individualmente entra na fila limitada com escalonamento justo. Um monitor ativo
  e multissinal de pressão de recursos (proporção do heap do V8, cgroup, PSI, eventos de OOM —
  `open-sse/utils/resourcePressurePolicy.ts`) reduz o tempo de espera limitado sob pressão
  `high` e rejeita imediatamente com `503 resource_pressure` sob pressão `critical`, antes
  mesmo que qualquer byte seja ingerido.
- **Ajuste:**
  - `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` — substituição do orçamento de bytes derivado automaticamente
  - `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT` — limite legado de contagem de requisições, somente por adesão explícita
  - `OMNIROUTE_CHAT_ADMISSION_QUEUE_MS` — espera na fila antes do 503 (padrão 2000)
  - `OMNIROUTE_CHAT_ADMISSION_MAX_QUEUED_BYTES` — válvula de heap para bytes enfileirados (padrão 4 MB)
  - `OMNIROUTE_CHAT_VIRTUAL_TTL_MS` / `OMNIROUTE_CHAT_VIRTUAL_MAX_SESSIONS` — obsoletos
    e sem efeito desde #10110 (aceitos para compatibilidade de configuração, mas ignorados)
- **Relatórios:** `GET /api/monitoring/health` → `chatAdmission` (#11244) — incluindo
  as adições de #503-fanout `inflightBytes`, `maxInflightBytes`, `budgetSource`
  (`v8_heap` | `cgroup` | `override`), `pressureSeverity` e `countCapEnabled`
  (false em uma implantação padrão — confirma que o orçamento de bytes, e não o limite
  legado de contagem, é o que efetivamente está impondo o limite).

## 2. Faixas virtuais adaptativas em tempo de execução (`open-sse/services/admission`)

- **Escopo:** admissão por chave de locatário para despacho ao provedor — custo da fila, adaptação de limites orientada por latência, enfileiramento por faixa e métricas das faixas.
- **Ativação:** **opt-in.** Desabilitado, a menos que `OMNIROUTE_CHAT_VIRTUAL_LANES=true`. Sem essa configuração, o controlador adaptativo mantém o comportamento de fila compartilhada (o critério 1 de #9654 só é atendido quando um operador habilita as faixas).
- **Ajuste:** `OMNIROUTE_CHAT_VIRTUAL_LANES` + configuração adaptativa (`maxQueueCount`, `maxQueueCost`, `defaultMaxWaitMs`, …).
- **Relatórios:** `GET /api/monitoring/health` → `adaptiveAdmission` → `laneCount`, `laneQueuedCount`, `laneQueuedCost`, `laneTenants` (IDs opacos de faixa, nunca chaves brutas) e `virtualLanes` — o indicador oficial no snapshot de que "as faixas estão ativadas".

## 3. Sondas de fan-out — admissão por destino para combo/fusion (#9654 Onda 2)

Combo (prioridade / round-robin) e fusion distribuem N destinos de modelo em fan-out sob uma única solicitação pai. Desde a Onda 2 de #9654, **cada destino do fan-out é submetido ao controle de admissão antes do despacho** por uma sonda por destino (`PerTargetAdmissionHook`, criada por `createPerTargetAdmissionHook`) na faixa de locatário da solicitação **pai**.

- **Escopo:** todos os destinos do fan-out despachados por combo, fusion e pelo mecanismo de caos. O Sistema 1 (nível de bytes) não é afetado — ele nunca sonda destinos de fan-out.
- **Ativação:** **opt-in com o sistema 2.** Não realiza nenhuma operação quando `OMNIROUTE_CHAT_VIRTUAL_LANES` não está definido — nesse modo, a solicitação pai já mantém a concessão da fila compartilhada; portanto, a sondagem faria uma contagem duplicada e rejeitaria destinos de combo.
- **Semântica:**
  - **Estritamente não bloqueante — ignorar, nunca enfileirar.** `maxWaitMs 0`: uma faixa cheia faz com que o destino seja ignorado, e o mecanismo de fallback do combo (ou o painel de sobreviventes do fusion) atende em seu lugar. Isso é intencional: um destino de fan-out é trabalho redundante, e enfileirá-lo adiciona mais carga exatamente ao congestionamento que as faixas existem para impedir. Portanto, `defaultMaxWaitMs` aplica-se **somente à solicitação pai**; as sondas de fan-out nunca aguardam, e intencionalmente **não há nenhuma configuração** para fazê-las aguardar (o histórico da issue mostra que configurações de espera produziram a classe de erros 502/504 em massa que #9654 evita — reavaliar apenas se um operador relatar que destinos de fan-out ignorados estão prejudicando a qualidade das respostas).
  - **Liberação após admissão.** Uma sonda admitida libera sua concessão imediatamente: ela é um controle de capacidade, não uma retenção. A concessão da solicitação pai cobre o fan-out; manter outras N concessões inflaria o custo ativo compartilhado e rejeitaria outros locatários. É uma verificação de melhor esforço, não uma reserva: a faixa pode voltar a ficar cheia entre a sondagem e o despacho; portanto, sob alta contenção, o controle pode admitir um destino em uma faixa que estará novamente cheia quando o destino for despachado.
  - **Precificação com base no corpo real do fan-out.** A sonda estima o custo a partir do corpo real do destino — incluindo a classe da solicitação derivada de seu indicador `stream`, exatamente como no caminho da solicitação pai — de modo que os membros do painel de fusion (`stream: false`) sejam precificados de acordo com a classe sem streaming que realmente ocuparão, e os destinos de prioridade/RR de acordo com o que o usuário solicitou.
- **Relatórios:** quando uma sonda ignora um destino após o primeiro, ela incrementa o `fallbackCount` por solicitação do combo (refletindo a semântica de fallback existente; visível nos logs do combo); fusion retorna 503 quando todos os membros do painel são ignorados. Atualmente, **não há nenhum contador agregado** (por exemplo, `virtualFanoutSkipped`) no snapshot — se um operador relatar que não consegue determinar com que frequência o controle de faixa ignora destinos de fan-out, esse será o gatilho para adicionar um.

## Qual deles está sendo exibido em um dashboard

- `adaptiveAdmission.laneCount` / `laneTenants` → **faixas virtuais adaptativas** (sistema 2).
- `adaptiveAdmission.virtualLanes === true` → as sondagens em fan-out da seção 3 também estão
  ativas. Um payload sem `virtualLanes` ou com `false` significa que
  `OMNIROUTE_CHAT_VIRTUAL_LANES` não está definida — as faixas em nível de byte (sistema 1)
  continuam ativas, mas nada sob `adaptiveAdmission` (nem qualquer bloqueio de fan-out)
  entra em vigor até que isso seja habilitado.

## Por que ambos existem

As faixas em nível de byte limitam o caminho de análise/compressão que consome muita memória; as faixas adaptativas
limitam o custo de despacho por tenant. O critério 1 do #9654 ("a rajada de uma sessão não faz
outra receber 503") é imposto incondicionalmente pelo sistema 1 e pelo sistema 2 assim que a adesão opcional é habilitada.

## 4. `/v1/responses` longas em um único processo (folga saudável)

O [#10437](https://github.com/diegosouzapw/OmniRoute/pull/10437) adicionou
`tryAcquireHealthyHeadroom` para que uma segunda solicitação estruturalmente pesada seja admitida
quando o heap estiver abaixo de `OMNIROUTE_CHAT_ADMISSION_HEAP_SHED_RATIO`. O caminho BYTE
usado por `admitChatRequest` (corpos ≥ `OMNIROUTE_CHAT_LARGE_BODY_BYTES`,
padrão de 256 KiB, incluindo `POST /v1/responses`) usa a **mesma** exceção.

Esta é a receita com suporte para **um único processo** para mais de duas conexões SSE
`/v1/responses` longas simultâneas: aumente a capacidade primária + a folga saudável apenas até onde o heap
e o orçamento de bytes em trânsito de todo o processo (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES`
/ #10110) permitirem. Dezenas de clientes SSE de longa duração (40–50) são uma questão desse orçamento
de memória, não um limite rígido de produto de “no máximo 2”. Um heap sob pressão ainda rejeita solicitações
com um `503` passível de nova tentativa, para que o #7849 não retorne.

Para **multiplicar os heaps**, execute N `DATA_DIR`s independentes (#11024). Nunca use
`replicas > 1` em um único arquivo SQLite (#10350). Esta seção não reabre
a receita de expansão horizontal com DATA_DIR.
